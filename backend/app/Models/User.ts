import { DateTime } from 'luxon'
import Role from 'App/Models/Role'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, BelongsTo, HasMany, afterCreate, afterFetch, afterFind, afterUpdate, beforeCreate, beforeUpdate, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'

export default class User extends BaseModel {
   @column({ isPrimary: true })
   public id: string

   @column({ serializeAs: null })
   public role_id: string

   @column()
   public name: string

   @column()
   public phone: string

   @column()
   public email: string

   @column({ serializeAs: null })
   public password: string

   @column()
   public createdAt: string

   @column()
   public updatedAt: string

   @beforeCreate()
   public static async beforeCreating(user: User) {
      if (user.$dirty.password) {
         user.password = await Hash.make(user.password)
      }
      user.createdAt = DateTime.now().toMillis().toString()
      user.updatedAt = DateTime.now().toMillis().toString()
      if (!user.role_id) {
         user.role_id = await Role.findByOrFail('name', 'user').then((role) => role.id)
      }
   }

   @beforeUpdate()
   public static async beforeUpdating(user: User) {
      user.createdAt = DateTime.fromFormat(user.createdAt, 'yyyy-LL-dd HH:mm:ss').toMillis().toFixed()
      user.updatedAt = DateTime.now().toMillis().toFixed()
   }

   @afterFetch()
   public static async afterFetched(users: User[]) {
      await Promise.all(users.map((user) => {
         user.createdAt = DateTime.fromMillis(parseInt(user.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
         user.updatedAt = DateTime.fromMillis(parseInt(user.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      }))
   }

   @afterCreate()
   public static async afterCreating(user: User) {
      user.createdAt = DateTime.fromMillis(parseInt(user.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      user.updatedAt = DateTime.fromMillis(parseInt(user.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @afterUpdate()
   public static async afterUpdating(user: User) {
      user.createdAt = DateTime.fromMillis(parseInt(user.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      user.updatedAt = DateTime.fromMillis(parseInt(user.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @afterFind()
   public static async afterFinding(user: User) {
      user.createdAt = DateTime.fromMillis(parseInt(user.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      user.updatedAt = DateTime.fromMillis(parseInt(user.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
   }

   @belongsTo(() => Role, { foreignKey: 'role_id', localKey: 'id' })
   public role: BelongsTo<typeof Role>

   @hasMany(() => Address, { foreignKey: 'user_id', localKey: 'id' })
   public addresses: HasMany<typeof Address>
}
