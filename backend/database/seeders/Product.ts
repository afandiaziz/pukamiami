import { faker } from '@faker-js/faker';
import Product from 'App/Models/Product';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ProductImage from 'App/Models/ProductImage';
import ProductCategory from 'App/Models/ProductCategory'
import ProductFactory from 'Database/factories/ProductFactory'
import ProductImageFactory from 'Database/factories/ProductImageFactory';

export default class extends BaseSeeder {
    public async run() {
        let productData: Product[] = [];
        (await ProductCategory.all()).forEach(async (category) => {
            for (let index = 1; index <= faker.number.int({ min: 4, max: 10 }); index++) {
                await ProductFactory.make().then((product: Product) => {
                    product.product_category_id = category.id
                    productData.push(product)
                });
            }
        });

        const ids: string[] = []
        await Product.createMany(productData).then(async (products: Product[]) => {
            await products.map(async (product: Product) => {
                ids.push(product.id)
            })
        })

        let productImagesData: ProductImage[] = [];
        ids.forEach(async (id) => {
            await Product.query().where('id', id).firstOrFail().then(async (product: Product) => {
                for (let index = 1; index <= faker.number.int({ min: 1, max: 5 }); index++) {
                    await ProductImageFactory.make().then(async (productImage: ProductImage) => {
                        productImage.product_id = product.id
                        productImagesData.push(productImage)
                    })
                }
            })
        });
        await ProductImage.createMany(productImagesData)

        // await Product.query().whereIn('id', ids).delete()
    }
}
