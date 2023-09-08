import { DateTime } from 'luxon'
import { afterCreate, afterFetch, afterFind, afterUpdate, BaseModel, beforeCreate, beforeUpdate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Address extends BaseModel {
   @column({ isPrimary: true })
   public id: string

   @column({ serializeAs: null })
   public user_id: string

   @column()
   public recipient: string

   @column()
   public phone: string

   @column()
   public address: string

   @column()
   public note: string

   @column()
   public createdAt: string

   @column()
   public updatedAt: string

   @beforeCreate()
   public static beforeCreating(column: Address) {
      column.createdAt = DateTime.now().toMillis().toString()
      column.updatedAt = DateTime.now().toMillis().toString()
   }

   @beforeUpdate()
   public static async beforeUpdating(column: Address) {
      column.createdAt = DateTime.fromFormat(column.createdAt, 'yyyy-LL-dd HH:mm:ss').toMillis().toFixed()
      column.updatedAt = DateTime.now().toMillis().toFixed()
   }

   @afterFetch()
   public static async afterFetched(rows: Address[]) {
      await Promise.all(rows.map((column) => {
         column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
         column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      }))
   }

   @afterCreate()
   public static async afterCreating(column: Address) {
      column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @afterUpdate()
   public static async afterUpdating(column: Address) {
      column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @afterFind()
   public static async afterFinding(column: Address) {
      column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @belongsTo(() => User, { foreignKey: 'user_id', localKey: 'id' })
   public user: BelongsTo<typeof User>

}
