import { DateTime } from 'luxon'
import User from 'App/Models/User';
import { afterCreate, afterFetch, afterFind, afterUpdate, BaseModel, beforeCreate, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Role extends BaseModel {
   @column({ isPrimary: true })
   public id: string

   @column()
   public name: string

   @column()
   public createdAt: string

   @column()
   public updatedAt: string

   @beforeCreate()
   public static beforeCreating(role: Role) {
      role.createdAt = DateTime.now().toMillis().toString()
      role.updatedAt = DateTime.now().toMillis().toString()
   }

   @afterFetch()
   public static async afterFetched(roles: Role[]) {
      await Promise.all(roles.map((table) => {
         table.createdAt = DateTime.fromMillis(parseInt(table.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
         table.updatedAt = DateTime.fromMillis(parseInt(table.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      }))
   }

   @afterCreate()
   public static async afterCreating(table: Role) {
      table.createdAt = DateTime.fromMillis(parseInt(table.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      table.updatedAt = DateTime.fromMillis(parseInt(table.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @afterUpdate()
   public static async afterUpdating(table: Role) {
      table.createdAt = DateTime.fromMillis(parseInt(table.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      table.updatedAt = DateTime.fromMillis(parseInt(table.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @afterFind()
   public static async afterFinding(table: Role) {
      table.createdAt = DateTime.fromMillis(parseInt(table.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      table.updatedAt = DateTime.fromMillis(parseInt(table.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @hasMany(() => User, { foreignKey: 'role_id', localKey: 'id' })
   public users: HasMany<typeof User>

}
