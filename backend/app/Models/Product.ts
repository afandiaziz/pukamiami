import { DateTime } from 'luxon'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { afterCreate, afterFetch, afterFind, afterUpdate, BaseModel, beforeCreate, beforeFetch, beforeSave, beforeUpdate, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ProductCategory from './ProductCategory'
import ProductImage from './ProductImage'

export default class Product extends BaseModel {
   @column({ isPrimary: true })
   public id: string

   @column({ serializeAs: null })
   public product_category_id: any

   @column()
   public name: string

   @column()
   @slugify({
      strategy: 'simple',
      fields: ['name'],
      allowUpdates: true,
   })
   public slug: string

   @column()
   public price: number

   @column()
   public discount: number

   @column()
   public min_order: number

   @column()
   public weight: number

   @column()
   public condition: string

   @column()
   public status: boolean

   @column()
   public description: string

   @column()
   public createdAt: string

   @column()
   public updatedAt: string

   @beforeCreate()
   public static beforeCreating(column: Product) {
      column.createdAt = DateTime.now().toMillis().toString()
      column.updatedAt = DateTime.now().toMillis().toString()
   }

   @beforeUpdate()
   public static async beforeUpdating(column: Product) {
      column.createdAt = DateTime.fromFormat(column.createdAt, 'yyyy-LL-dd HH:mm:ss').toMillis().toFixed()
      column.updatedAt = DateTime.now().toMillis().toFixed()
   }

   @afterFetch()
   public static async afterFetched(rows: Product[]) {
      await Promise.all(rows.map((column) => {
         column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
         column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      }))
   }

   @afterCreate()
   public static async afterCreating(column: Product) {
      column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @afterUpdate()
   public static async afterUpdating(column: Product) {
      column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @afterFind()
   public static async afterFinding(column: Product) {
      column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @belongsTo(() => ProductCategory, { foreignKey: 'product_category_id', localKey: 'id' })
   public category: BelongsTo<typeof ProductCategory>

   @hasMany(() => ProductImage, { foreignKey: 'product_id', localKey: 'id' })
   public images: HasMany<typeof ProductImage>
}
