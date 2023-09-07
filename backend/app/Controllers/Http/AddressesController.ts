import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressesController {
   public async all({ auth, response }: HttpContextContract) {
      const user = auth.user
      if (user) {
         const addresses = await user.related('addresses').query()
         return response.status(200).json({
            message: 'success',
            data: addresses
         })
      }
      return response.status(401).json({ message: 'Unauthorized' })
   }

   public async store({ auth, request, response }: HttpContextContract) {
      const user = auth.user
      if (user) {
         await request.validate({
            schema: schema.create({
               recipient: schema.string({}, [
                  rules.required()
               ]),
               phone: schema.string({}, [
                  rules.required(),
                  rules.mobile()
               ]),
               address: schema.string({}, [
                  rules.required(),
               ])
            }),
            messages: {
               'recipient.required': 'Penerima tidak boleh kosong',
               'phone.required': 'Nomor HP penerima tidak boleh kosong',
               'phone.mobile': 'Nomor HP penerima tidak valid',
               'address.required': 'Alamat tidak boleh kosong',
            }
         })
         const address = await user.related('addresses').create(request.body())
         return response.status(201).json({
            message: 'success',
            data: address
         })
      }
      return response.status(401).json({ message: 'Unauthorized' })
   }
}
