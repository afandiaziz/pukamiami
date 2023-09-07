import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AddressesController {
   public async all({ auth, response }: HttpContextContract) {
      const user = auth.user
      if (!user) {
         return response.status(401).json({ message: 'Unauthorized' })
      }
      const addresses = await user.related('addresses').query()
      return response.status(200).json({
         message: 'success',
         data: addresses
      })
   }

   public async show({ auth, response, params }: HttpContextContract) {
      const user = auth.user
      if (!user) {
         return response.status(401).json({ message: 'Unauthorized' })
      }
      await user.related('addresses').query().where('id', params.id).firstOrFail().then((data) => {
         return response.status(200).json({
            message: 'success',
            data: data
         })
      }).catch(() => {
         return response.status(404).json({
            message: 'failed'
         })
      })
   }

   public async store({ auth, request, response }: HttpContextContract) {
      const user = auth.user
      if (!user) {
         return response.status(401).json({ message: 'Unauthorized' })
      }
      await request.validate({
         schema: schema.create({
            recipient: schema.string(),
            phone: schema.string({}, [
               rules.mobile()
            ]),
            address: schema.string(),
            note: schema.string.optional()
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

   public async update({ auth, request, response, params }: HttpContextContract) {
      const user = auth.user
      if (!user) {
         return response.status(401).json({ message: 'Unauthorized' })
      }
      await request.validate({
         schema: schema.create({
            recipient: schema.string(),
            phone: schema.string({}, [
               rules.mobile()
            ]),
            address: schema.string(),
            note: schema.string.optional()
         }),
         messages: {
            'recipient.required': 'Penerima tidak boleh kosong',
            'phone.required': 'Nomor HP penerima tidak boleh kosong',
            'phone.mobile': 'Nomor HP penerima tidak valid',
            'address.required': 'Alamat tidak boleh kosong',
         }
      })

      await user.related('addresses').query().where('id', params.id).firstOrFail().then(async (address) => {
         address.recipient = request.input('recipient', address.recipient)
         address.phone = request.input('phone', address.phone)
         address.address = request.input('address', address.address)
         address.note = request.input('note', address.note)

         await address.save().then(() => {
            return response.status(200).json({
               message: 'success',
               data: address
            })
         }).catch(() => {
            return response.status(500).json({
               message: 'failed'
            })
         })
      }).catch(() => {
         return response.status(404).json({
            message: 'failed'
         })
      })
   }

   public async destroy({ auth, request, response, params }: HttpContextContract) {
      const user = auth.user
      if (!user) {
         return response.status(401).json({ message: 'Unauthorized' })
      }
      await user.related('addresses').query().where('id', params.id).firstOrFail().then(async (address) => {
         await address.delete().then(() => {
            return response.status(200).json({
               message: 'success'
            })
         }).catch(() => {
            return response.status(500).json({
               message: 'failed'
            })
         })
      }).catch(() => {
         return response.status(404).json({
            message: 'failed'
         })
      })
   }
}
