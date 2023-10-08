import ProductImage from 'App/Models/ProductImage'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(ProductImage, ({ faker }) => {
    return {
        image: faker.image.url({
            width: 200,
            height: 200,
        }),
    }
}).build()
