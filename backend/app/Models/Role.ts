import { DateTime } from 'luxon'
import User from 'App/Models/User';
import { BaseModel, beforeCreate, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

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
   public static unixTime(role: Role) {
      role.createdAt = DateTime.now().toMillis().toString()
      role.updatedAt = DateTime.now().toMillis().toString()
   }

   @hasMany(() => User)
   public users: HasMany<typeof User>

}
