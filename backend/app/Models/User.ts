import { DateTime } from 'luxon'
import Role from 'App/Models/Role'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: string

    @column()
    public role_id: string

    @column()
    public email: string

    @column({ serializeAs: null })
    public password: string

    @column()
    public createdAt: number

    @column()
    public updatedAt: number

    @beforeCreate()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }
    public static unixTime(user: User) {
        user.createdAt = DateTime.now().toMillis()
        user.updatedAt = DateTime.now().toMillis()
    }

    @belongsTo(() => Role)
    public role: BelongsTo<typeof Role>
}
