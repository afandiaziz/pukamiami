import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
   public async profile({ auth, response }: HttpContextContract) {
      const userId = await auth.use('api').authenticate().then((user) => user.id)
      const user = await User.query().where('id', userId).preload('role').firstOrFail()

      response.ok({
         message: 'success',
         data: user
      })
   }

   public async updateProfile({ auth, request, response }: HttpContextContract) {
      await request.validate({
         schema: schema.create({
            name: schema.string(),
            phone: schema.string({}, [
               rules.mobile()
            ])
         }),
         messages: {
            'name.required': 'Nama tidak boleh kosong',
            'phone.required': 'Nomor HP tidak boleh kosong',
            'phone.mobile': 'Nomor HP tidak valid'
         }
      })

      const { name, phone } = request.all()
      const user = await auth.use('api').authenticate()

      user.name = name
      user.phone = phone
      await user.save()

      const userUpdated = await User.query().where('id', user.id).preload('role').firstOrFail()

      response.ok({
         message: 'success',
         data: userUpdated
      })
   }

   public async updatePassword({ auth, request, response }: HttpContextContract) {
      await request.validate({
         schema: schema.create({
            old_password: schema.string({}, [
               rules.minLength(6)
            ]),
            new_password: schema.string({}, [
               rules.minLength(6),
            ])
         }),
         messages: {
            'old_password.minLength': 'Password lama minimal 6 karakter',
            'old_password.required': 'Password lama tidak boleh kosong',
            'new_password.required': 'Password baru tidak boleh kosong',
            'new_password.minLength': 'Password baru minimal 6 karakter',
         }
      })

      const { old_password, new_password } = request.all()
      const user = await auth.use('api').authenticate()

      await auth.use('api').attempt(user.email, old_password)
      user.password = await Hash.make(new_password)
      await user.save()

      response.ok({
         message: 'success',
      })
   }
}
