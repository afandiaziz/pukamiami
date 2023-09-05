import { DateTime } from 'luxon'
import Role from 'App/Models/Role'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, BelongsTo, afterFetch, beforeCreate, beforeFetch, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

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

   @afterFetch()
   public static async afterFetched(users: User[]) {
      await Promise.all(users.map((user) => {
         user.createdAt = DateTime.fromMillis(parseInt(user.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
         user.updatedAt = DateTime.fromMillis(parseInt(user.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
      }))
   }

   @belongsTo(() => Role)
   public role: BelongsTo<typeof Role>
}
