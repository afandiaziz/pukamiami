import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ProductCategory from 'App/Models/ProductCategory'

export default class extends BaseSeeder {
    public async run() {
        ProductCategory.truncate(true)
        await ProductCategory.createMany([
            {
                name: 'Fashion Anak & Bayi',
            },
            {
                name: 'Mainan Anak & Bayi',
            },
            {
                name: 'Aktivitas Bayi',
            },
            {
                name: 'Makanan & Susu Bayi',
            },
            {
                name: 'Makanan & Susu Ibu Hamil',
            },
            {
                name: 'Peralatan Perlengkapan Menyusui',
            },
            {
                name: 'Perlengkapan & Perawatan Menyusui',
            },
            {
                name: 'Perawatan Bayi',
            },
            {
                name: 'Perlengkapan Makan Bayi',
            },
            {
                name: 'Perlengkapan Mandi Bayi',
            },
            {
                name: 'Perlengkapan Tidur Bayi',
            },
            {
                name: 'Popok Bayi',
            },
        ])
    }
}
