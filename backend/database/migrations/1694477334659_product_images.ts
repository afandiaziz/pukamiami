import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
   protected tableName = 'product_images'

   public async up() {
      this.schema.createTable(this.tableName, (table) => {
         table.uuid('id', { primaryKey: true }).defaultTo(this.raw('uuid_generate_v4()'))
         table.uuid('product_id').nullable().references('id').inTable('products').onDelete('CASCADE')
         table.string('image', 255).notNullable().unique()
         table.string('created_at', 255).notNullable()
         table.string('updated_at', 255).notNullable()
      })
   }

   public async down() {
      this.schema.dropTable(this.tableName)
   }
}
