import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsAdmin {
   public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
      const user = auth.user
      if (!user) {
         return response.status(401).json({ message: 'Unauthorized' })
      }
      const { name } = await user.related('role').query().firstOrFail()
      if (name !== 'admin') {
         return response.status(403).json({ message: 'Forbidden' })
      }
      await next()
   }
}
