import User from './User'
import { DateTime } from 'luxon'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { afterCreate, afterFetch, afterFind, afterUpdate, BaseModel, beforeCreate, beforeFetch, beforeUpdate, BelongsTo, belongsTo, column, HasMany, hasMany, hasManyThrough, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

export default class ProductCategory extends BaseModel {
   @column({ isPrimary: true })
   public id: string

   @column({ serializeAs: null })
   public parent_id: any

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
   public image: string

   @column()
   public icon: string

   @column()
   public createdAt: string

   @column()
   public updatedAt: string

   @beforeCreate()
   public static beforeCreating(column: ProductCategory) {
      column.createdAt = DateTime.now().toMillis().toString()
      column.updatedAt = DateTime.now().toMillis().toString()
   }

   @beforeUpdate()
   public static async beforeUpdating(column: ProductCategory) {
      column.createdAt = DateTime.fromFormat(column.createdAt, 'yyyy-LL-dd HH:mm:ss').toMillis().toFixed()
      column.updatedAt = DateTime.now().toMillis().toFixed()
   }

   @afterFetch()
   public static async afterFetched(rows: ProductCategory[]) {
      await Promise.all(rows.map((column) => {
         column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
         column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      }))
   }

   @afterCreate()
   public static async afterCreating(column: ProductCategory) {
      column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @afterUpdate()
   public static async afterUpdating(column: ProductCategory) {
      column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @afterFind()
   public static async afterFinding(column: ProductCategory) {
      column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @belongsTo(() => User, { foreignKey: 'user_id', localKey: 'id' })
   public user: BelongsTo<typeof User>

   @hasMany(() => ProductCategory, { foreignKey: 'parent_id', localKey: 'id' })
   public children: HasMany<typeof ProductCategory>

   @belongsTo(() => ProductCategory, { foreignKey: 'parent_id', localKey: 'id' })
   public parent: BelongsTo<typeof ProductCategory>
}
