import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
   protected tableName = 'products'

   public async up() {
      this.schema.createTable(this.tableName, (table) => {
         table.uuid('id', { primaryKey: true }).defaultTo(this.raw('uuid_generate_v4()'))
         table.uuid('product_category_id').nullable().references('id').inTable('product_categories').onDelete('CASCADE')
         table.string('name').notNullable()
         table.string('slug').notNullable()
         table.bigInteger('price').notNullable()
         table.smallint('discount').notNullable().defaultTo(0)
         table.smallint('min_order').notNullable().defaultTo(1)
         table.smallint('weight').notNullable()
         table.enum('condition', ['baru', 'bekas']).notNullable().defaultTo('baru')
         table.boolean('status').notNullable().defaultTo(true)
         table.text('description').notNullable()
         table.string('created_at', 255).notNullable()
         table.string('updated_at', 255).notNullable()
      })
   }

   public async down() {
      this.schema.dropTable(this.tableName)
   }
}
