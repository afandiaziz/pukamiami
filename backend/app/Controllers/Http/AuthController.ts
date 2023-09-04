import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

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
         return response.ok(result)
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
}
