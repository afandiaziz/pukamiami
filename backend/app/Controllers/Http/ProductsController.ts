import Product from 'App/Models/Product'
import Drive from '@ioc:Adonis/Core/Drive'
import Application from '@ioc:Adonis/Core/Application'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductImage from 'App/Models/ProductImage'

export default class Products {
    public async all({ response, request }: HttpContextContract) {
        const { product_category_id, status } = request.all()
        const data = await Product.query().where((query) => {
            if (product_category_id) {
                query.where('product_category_id', product_category_id)
            } else {
                query.whereNotNull('product_category_id')
            }
        }).where((query) => {
            if (status) {
                query.where('status', status)
            }
        }).preload('category').preload('images').orderBy('created_at', 'desc')

        return response.status(200).json({
            message: 'success',
            data
        })
    }

    public async show({ response, params }: HttpContextContract) {
        await Product.query().preload('category').preload('images').where(query => {
            if (params.id) {
                query.where('id', params.id)
            } else if (params.slug) {
                query.where('slug', params.slug)
            }
        }).firstOrFail().then((data) => {
            // data.images.map(async (image) => {
            //     await image.image = Drive.getUrl(image.image)
            // }
            // console.log(data.images)
            return response.status(200).json({
                message: 'success',
                data
            })
        }).catch(() => {
            return response.status(404).json({
                message: 'failed'
            })
        })
    }

    public async store({ request, response }: HttpContextContract) {
        await request.validate({
            schema: schema.create({
                name: schema.string({}, [
                    rules.unique({ table: 'products', column: 'name' })
                ]),
                product_category_id: schema.string({}, [
                    rules.exists({ table: 'product_categories', column: 'id' })
                ]),
                price: schema.number(),
                discount: schema.number.optional(),
                min_order: schema.number([
                    rules.gte(1)
                ]),
                weight: schema.number([
                    rules.gte(1)
                ]),
                condition: schema.enum(['baru', 'bekas'] as const),
                description: schema.string(),
                images: schema.array().members(schema.file({
                    size: '2mb',
                    extnames: ['jpg', 'jpeg', 'png', 'jfif', 'webp', 'pjp', 'pjpeg'],
                })),
            }),
            messages: {
                'name.required': 'Nama produk tidak boleh kosong',
                'name.unique': 'Nama produk sudah ada',
                'product_category_id.required': 'Kategori produk tidak boleh kosong',
                'product_category_id.exists': 'Kategori produk tidak ditemukan',
                'price.required': 'Harga produk tidak boleh kosong',
                'discount.required': 'Diskon produk tidak boleh kosong',
                'min_order.required': 'Minimal order produk tidak boleh kosong',
                'weight.required': 'Berat produk tidak boleh kosong',
                'condition.required': 'Kondisi produk tidak boleh kosong',
                'condition.enum': 'Kondisi produk tidak valid',
                'description.required': 'Deskripsi produk tidak boleh kosong',
                'images.required': 'Gambar produk tidak boleh kosong',
                'file.size': 'Ukuran gambar produk tidak boleh lebih dari 2MB',
                'file.extname': 'Ekstensi gambar produk tidak valid',
                'min_order.gte': 'Minimal order produk tidak boleh kurang dari 1',
                'weight.gte': 'Berat produk tidak boleh kurang dari 1',
            }
        })

        await Product.create(request.body()).then(async (data) => {
            let fileNames: Object[] = []
            for (let image of request.files('images')) {
                const fileName: string = `${Date.now()}.${image.extname}`
                fileNames.push({
                    image: `products/${fileName}`
                })

                await image.move(Application.tmpPath('uploads/products'), {
                    name: fileName,
                }).catch(async () => {
                    return response.status(500).json({
                        message: 'failed'
                    })
                })
                // const url = await Drive.getSignedUrl('filePath', {
                //    contentType: 'application/json',
                //    contentDisposition: 'attachment',
                // })
            }

            await data.related('images').createMany(fileNames).then(images => {
                const result = data.toJSON()
                result.images = images

                return response.status(201).json({
                    message: 'success',
                    data: result
                })
            }).catch(async (err) => {
                for (let fileName of fileNames) {
                    await Drive.delete(fileName.image)
                }
                await data.delete()
                return response.status(500).json({
                    message: 'failed: ' + err
                })
            })

        }).catch(err => {
            return response.status(500).json({
                message: 'failed: ' + err
            })
        })
    }

    public async update({ request, response, params }: HttpContextContract) {
        const currentData: Product = await Product.query().where('id', params.id).firstOrFail().then(currentData => currentData).catch(() => {
            return response.status(404).json({
                message: 'failed'
            })
        })

        await request.validate({
            schema: schema.create({
                name: schema.string.optional({}, [
                    rules.unique({ table: 'products', column: 'name', whereNot: { name: currentData.name } })
                ]),
                product_category_id: schema.string.optional({}, [
                    rules.exists({ table: 'product_categories', column: 'id' })
                ]),
                price: schema.number.optional(),
                discount: schema.number.optional(),
                min_order: schema.number.optional([
                    rules.gte(1)
                ]),
                weight: schema.number.optional([
                    rules.gte(1)
                ]),
                condition: schema.enum.optional(['baru', 'bekas'] as const),
                description: schema.string.optional(),
                images: schema.array.optional().members(schema.file({
                    size: '2mb',
                    extnames: ['jpg', 'jpeg', 'png', 'jfif', 'webp', 'pjp', 'pjpeg'],
                }))
            }),
            messages: {
                'name.unique': 'Nama produk sudah ada',
                'product_category_id.exists': 'Kategori produk tidak ditemukan',
                'condition.enum': 'Kondisi produk tidak valid',
                'file.size': 'Ukuran gambar produk tidak boleh lebih dari 2MB',
                'file.extname': 'Ekstensi gambar produk tidak valid',
                'min_order.gte': 'Minimal order produk tidak boleh kurang dari 1',
                'weight.gte': 'Berat produk tidak boleh kurang dari 1',
            }
        })

        if (Object.keys(request.body()).length > 0) {
            await Product.query().where('id', params.id).firstOrFail().then(async (data) => {
                data.name = request.input('name', data.name)
                data.product_category_id = request.input('product_category_id', data.product_category_id)
                data.price = request.input('price', data.price)
                data.discount = request.input('discount', data.discount)
                data.min_order = request.input('min_order', data.min_order)
                data.weight = request.input('weight', data.weight)
                data.condition = request.input('condition', data.condition)
                data.description = request.input('description', data.description)
                data.status = request.input('status', data.status)

                await data.save().catch(() => {
                    return response.status(500).json({
                        message: 'failed: update product'
                    })
                })
            }).catch(err => {
                return response.status(500).json({
                    message: 'failed: ' + err
                })
            })
        }

        if (request.files('images').length > 0) {
            await currentData.related('images').query().delete().then(async () => {
            }).catch(async (err) => {
                // for (let fileName of fileNames) {
                //    await Drive.delete(fileName.image)
                // }
                // return response.status(500).json({
                //    message: 'failed: ' + err
                // })
            })
        }

        await Product.query().where('id', params.id).preload('category').preload('images').firstOrFail().then(async (data) => {
            return response.status(200).json({
                message: 'success',
                data
            })
        })

    }

    public async destroy({ response, params }: HttpContextContract) {
        await Product.query().where('id', params.id).firstOrFail().then(async (data) => {
            const images: ProductImage[] = await data.related('images').query()
            for (let { image } of images) {
                await Drive.delete(image)
            }

            await data.delete().then(() => {
                return response.status(200).json({
                    message: 'success'
                })
            }).catch(() => {
                return response.status(500).json({
                    message: 'failed delete product'
                })
            })
        }).catch(() => {
            return response.status(404).json({
                message: 'failed'
            })
        })
    }
}
