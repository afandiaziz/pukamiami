import { DateTime } from 'luxon'
import User from 'App/Models/User';
import { BaseModel, beforeCreate, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Role extends BaseModel {
    @column({ isPrimary: true })
    public id: string

    @column()
    public name: string

    @column()
    public createdAt: number

    @column()
    public updatedAt: number

    @beforeCreate()
    public static unixTime(role: Role) {
        role.createdAt = DateTime.now().toMillis()
        role.updatedAt = DateTime.now().toMillis()
    }

    @hasMany(() => User)
    public users: HasMany<typeof User>

}
