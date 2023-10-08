import ProductFactory from 'App/Models/Product'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(ProductFactory, ({ faker }) => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price({
            dec: 0,
            min: 1000,
            max: 100000,
        })),
        condition: faker.helpers.arrayElement(['baru', 'bekas']),
        weight: parseInt(faker.commerce.price({
            dec: 0,
            min: 1000,
            max: 20000,
        })),
        discount: 0,
        min_order: 1,
    }
}).build()
