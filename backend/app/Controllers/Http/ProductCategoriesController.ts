import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'

export default class ProductCategoriesController {
   public async all({ response }: HttpContextContract) {
      const categories = await ProductCategory.query().whereNull('parent_id')
      return response.status(200).json({
         message: 'success',
         data: categories
      })
   }

   public async store({ }: HttpContextContract) {
   }
}
