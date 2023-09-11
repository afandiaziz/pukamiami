import ProductCategory from 'App/Models/ProductCategory'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductCategoriesController {
   public async all({ response, request }: HttpContextContract) {
      const { parent_id } = request.all()
      const categories = await ProductCategory.query().where((query) => {
         if (parent_id) {
            query.where('parent_id', parent_id)
         } else {
            query.whereNull('parent_id')
         }
      }).preload('parent').preload('children').orderBy('created_at', 'desc')

      //
      // .if(parent_id, (query) => {
      //    query.where('parent_id', parent_id)
      // }).unless(parent_id, (query) => {
      //    query.whereNull('parent_id')
      // })

      return response.status(200).json({
         message: 'success',
         data: categories
      })
   }

   public async show({ response, params }: HttpContextContract) {
      await ProductCategory.query().preload('parent').preload('children').where('id', params.id).firstOrFail().then((data) => {
         return response.status(200).json({
            message: 'success',
            data
         })
      }).catch(() => {
         return response.status(404).json({
            message: 'failed'
         })
      })
   }

   public async store({ request, response }: HttpContextContract) {
      const { name, parent_id } = request.all()
      await request.validate({
         schema: schema.create({
            name: schema.string({}, [
               rules.unique({ table: 'product_categories', column: 'name' })
            ]),
            parent_id: schema.string.optional(),
         }),
         messages: {
            'name.required': 'Nama kategori tidak boleh kosong',
            'name.unique': 'Nama kategori sudah ada',
         }
      })

      if (parent_id) {
         await ProductCategory.query().where('id', parent_id).firstOrFail().then(async () => {
            await ProductCategory.create({ name, parent_id }).then(data => {
               return response.status(201).json({
                  message: 'success',
                  data
               })
            }).catch(err => {
               return response.status(500).json({
                  message: 'failed: ' + err
               })
            })
         }).catch(() => {
            return response.status(404).json({
               message: 'failed: parent id not found'
            })
         })
      } else {
         await ProductCategory.create({ name }).then(data => {
            return response.status(201).json({
               message: 'success',
               data
            })
         }).catch(err => {
            return response.status(500).json({
               message: 'failed: ' + err
            })
         })
      }
   }

   public async update({ request, response, params }: HttpContextContract) {
      const { name, parent_id } = request.all()
      await request.validate({
         schema: schema.create({
            name: schema.string({}, [
               rules.unique({ table: 'product_categories', column: 'name' })
            ]),
            parent_id: schema.string.optional(),
         }),
         messages: {
            'name.required': 'Nama kategori tidak boleh kosong',
            'name.unique': 'Nama kategori sudah ada',
         }
      })
      if (parent_id) {
         await ProductCategory.query().where('id', parent_id).firstOrFail().then(async () => {
            await ProductCategory.query().where('id', params.id).firstOrFail().then(async (data) => {
               data.name = name
               data.parent_id = parent_id
               await data.save().then(data => {
                  return response.status(200).json({
                     message: 'success',
                     data
                  })
               }).catch(err => {
                  return response.status(500).json({
                     message: 'failed: ' + err
                  })
               })
            }).catch(() => {
               return response.status(404).json({
                  message: 'failed'
               })
            })
         }).catch(() => {
            return response.status(404).json({
               message: 'failed: parent id not found'
            })
         })
      } else {
         await ProductCategory.query().where('id', params.id).firstOrFail().then(async (data) => {
            data.name = name
            data.parent_id = null

            await data.save().then(data => {
               return response.status(200).json({
                  message: 'success',
                  data
               })
            }).catch(err => {
               return response.status(500).json({
                  message: 'failed: ' + err
               })
            })
         }).catch(() => {
            return response.status(404).json({
               message: 'failed'
            })
         })
      }
   }

   public async destroy({ response, params }: HttpContextContract) {
      await ProductCategory.query().where('id', params.id).firstOrFail().then(async (data) => {
         await data.delete().then(() => {
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
