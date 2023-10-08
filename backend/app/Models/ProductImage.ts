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

    @afterFetch()
    public static async afterFetched(rows: ProductImage[]) {
        await Promise.all(rows.map((column) => {
            const isValidUrl = urlString => {
                var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
                    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
                return !!urlPattern.test(urlString);
            }
            if (!isValidUrl(column.image))
                column.image = `http://${process.env.HOST}:${process.env.PORT}/uploads/${column.image}`

            column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
            column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
        }))
    }

    @afterFind()
    public static async afterFinding(column: ProductImage) {
        const isValidUrl = urlString => {
            var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
            return !!urlPattern.test(urlString);
        }
        if (!isValidUrl(column.image))
            column.image = `http://${process.env.HOST}:${process.env.PORT}/uploads/${column.image}`

        column.createdAt = DateTime.fromMillis(parseInt(column.createdAt)).toFormat('yyyy-LL-dd HH:mm:ss')
        column.updatedAt = DateTime.fromMillis(parseInt(column.updatedAt)).toFormat('yyyy-LL-dd HH:mm:ss')
    }

    @belongsTo(() => Product, { foreignKey: 'product_id' })
    public product: BelongsTo<typeof Product>
}
