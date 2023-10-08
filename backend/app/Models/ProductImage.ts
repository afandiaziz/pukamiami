import Product from './Product'
import { DateTime } from 'luxon'
import { afterCreate, afterFetch, afterFind, afterUpdate, BaseModel, beforeCreate, beforeFetch, beforeUpdate, BelongsTo, belongsTo, column, HasMany, hasMany, hasManyThrough, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

export default class ProductImage extends BaseModel {
    @column({ isPrimary: true })
    public id: string

    @column({ serializeAs: null })
    public product_id: any

    @column()
    public image: string

    @column()
    public createdAt: string

    @column()
    public updatedAt: string


    @beforeCreate()
    public static beforeCreating(column: ProductImage) {
        column.createdAt = DateTime.now().toMillis().toString()
        column.updatedAt = DateTime.now().toMillis().toString()
    }

    @beforeUpdate()
    public static async beforeUpdating(column: ProductImage) {
        column.createdAt = DateTime.fromFormat(column.createdAt, 'yyyy-LL-dd HH:mm:ss').toMillis().toFixed()
        column.updatedAt = DateTime.now().toMillis().toFixed()
    }

    @afterFetch()
    public static async afterFetched(rows: ProductImage[]) {
        await Promise.all(rows.map((column) => {
            column.image = `/uploads/${column.image}`
            column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
            column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
        }))
    }

    @afterCreate()
    public static async afterCreating(column: ProductImage) {
        column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
        column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
    }

    @afterUpdate()
    public static async afterUpdating(column: ProductImage) {
        column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
        column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
    }

    @afterFind()
    public static async afterFinding(column: ProductImage) {
        column.image = `/uploads/${column.image}`
        column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
        column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
    }

    @belongsTo(() => Product, { foreignKey: 'product_id' })
    public product: BelongsTo<typeof Product>
}
