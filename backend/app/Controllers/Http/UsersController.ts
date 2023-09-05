import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
   public async profile({ auth, request, response }: HttpContextContract) {
      const user = await auth.use('api').authenticate()
      response.ok({
         message: 'success',
         data: user
      })
   }
}
