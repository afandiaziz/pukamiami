import ProductImage from 'App/Models/ProductImage'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductImagesController {
    public async all({ response, request }: HttpContextContract) {
        const { product_id } = request.all()
        const data = await ProductImage.query().where((query) => {
            if (product_id) {
                query.where('product_id', product_id)
            } else {
                query.whereNull('product_id')
            }
        }).preload('product').orderBy('created_at', 'desc')

        return response.status(200).json({
            message: 'success',
            data: data
        })
    }

    public async show({ response, params }: HttpContextContract) {
        await ProductImage.query().preload('product').where('id', params.id).firstOrFail().then((data) => {
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
        const { image, product_id } = request.all()
        await request.validate({
            schema: schema.create({
                image: schema.file({
                    size: '2mb',
                    extnames: ['jpg', 'png', 'jpeg']
                }, [
                ]),
                product_id: schema.string.optional(),
            }),
            messages: {
            }
        })

        if (product_id) {
            await ProductImage.query().where('id', product_id).firstOrFail().then(async () => {
                await ProductImage.create({ image, product_id }).then(data => {
                    return response.status(201).json({
                        message: 'success',
                        data
                    })
                }).catch(err => {
                    return response.status(500).json({
                        message: 'failed: ' + err
                    })
                })
            }).catch(() => {
                return response.status(404).json({
                    message: 'failed: parent id not found'
                })
            })
        } else {
            await ProductImage.create({ image }).then(data => {
                return response.status(201).json({
                    message: 'success',
                    data
                })
            }).catch(err => {
                return response.status(500).json({
                    message: 'failed: ' + err
                })
            })
        }
    }

    public async update({ request, response, params }: HttpContextContract) {
        const { image, product_id } = request.all()
        await request.validate({
            schema: schema.create({
                image: schema.string({}, [
                    rules.unique({ table: 'product_categories', column: 'image' })
                ]),
                product_id: schema.string.optional(),
            }),
            messages: {
                'image.required': 'Nama kategori tidak boleh kosong',
                'image.unique': 'Nama kategori sudah ada',
            }
        })
        if (product_id) {
            await ProductImage.query().where('id', product_id).firstOrFail().then(async () => {
                await ProductImage.query().where('id', params.id).firstOrFail().then(async (data) => {
                    data.image = image
                    data.product_id = product_id
                    await data.save().then(data => {
                        return response.status(200).json({
                            message: 'success',
                            data
                        })
                    }).catch(err => {
                        return response.status(500).json({
                            message: 'failed: ' + err
                        })
                    })
                }).catch(() => {
                    return response.status(404).json({
                        message: 'failed'
                    })
                })
            }).catch(() => {
                return response.status(404).json({
                    message: 'failed: parent id not found'
                })
            })
        } else {
            await ProductImage.query().where('id', params.id).firstOrFail().then(async (data) => {
                data.image = image
                data.product_id = null

                await data.save().then(data => {
                    return response.status(200).json({
                        message: 'success',
                        data
                    })
                }).catch(err => {
                    return response.status(500).json({
                        message: 'failed: ' + err
                    })
                })
            }).catch(() => {
                return response.status(404).json({
                    message: 'failed'
                })
            })
        }
    }

    public async destroy({ response, params }: HttpContextContract) {
        await ProductImage.query().where('id', params.id).firstOrFail().then(async (data) => {
            await data.delete().then(() => {
                return response.status(200).json({
                    message: 'success'
                })
            }).catch(() => {
                return response.status(500).json({
                    message: 'failed'
                })
            })
        }).catch(() => {
            return response.status(404).json({
                message: 'failed'
            })
        })
    }
}
