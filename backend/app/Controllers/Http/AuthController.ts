import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {

   public async login({ auth, request, response }: HttpContextContract) {
      await request.validate({
         schema: schema.create({
            email: schema.string({}, [
               rules.email()
            ]),
            password: schema.string({}, [
               rules.minLength(6)
            ])
         }),
         messages: {
            'email.required': 'Email tidak boleh kosong',
            'email.email': 'Email tidak valid',
            'password.required': 'Password tidak boleh kosong',
            'password.minLength': 'Password minimal 6 karakter'
         }
      })

      const { email, password } = request.all()
      await auth.use('api').attempt(email, password, {
         expiresIn: '30 mins'
      }).then((result) => {
         return response.ok({
            message: 'success',
            data: result
         })
      }).catch(() => {
         return response.unauthorized({
            error: 'Invalid credentials'
         })
      })
   }

   public async logout({ auth, response }: HttpContextContract) {
      await auth.use('api').authenticate()
      await auth.use('api').revoke()
      return response.ok({
         message: 'success'
      })
   }

   public async register({ auth, request, response }: HttpContextContract) {
      const req = request.all()
      await request.validate({
         schema: schema.create({
            // name: schema.string({}, [
            //    rules.required()
            // ]),
            email: schema.string({}, [
               rules.email(),
               rules.required(),
               rules.unique({ table: 'users', column: 'email' })
            ]),
            password: schema.string({}, [
               rules.minLength(6),
               rules.required()
            ]),
            confirm: schema.string({}, [
               rules.required(),
               rules.confirmed('password')
            ])
         }),
         messages: {
            // 'name.required': 'Nama tidak boleh kosong',
            'email.required': 'Email tidak boleh kosong',
            'email.email': 'Email tidak valid',
            'email.unique': 'Email sudah terdaftar',
            'password.required': 'Password tidak boleh kosong',
            'password.minLength': 'Password minimal 6 karakter',
            'password.confirmed': 'Password tidak sama',
            'confirm.required': 'Konfirmasi password tidak boleh kosong',
         }
      })

      await User.create({
         email: req.email,
         password: req.password,
      }).then(async (user) => {
         await auth.use('api').attempt(req.email, req.password, {
            expiresIn: '30 mins'
         }).then((token) => {
            return response.created({
               message: 'success',
               data: user,
               token
            })
         }).catch(() => {
            return response.unauthorized({
               error: 'Invalid credentials'
            })
         })
      }).catch(() => {
         return response.badRequest({
            error: 'Failed to create user'
         })
      })

   }
}
