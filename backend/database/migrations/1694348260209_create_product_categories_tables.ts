import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
   protected tableName = 'product_categories'

   public async up() {
      this.schema.createTable(this.tableName, (table) => {
         table.uuid('id', { primaryKey: true }).defaultTo(this.raw('uuid_generate_v4()'))
         table.uuid('parent_id').nullable().references('id').inTable('product_categories').onDelete('CASCADE')
         table.string('name').notNullable()
         table.string('slug').notNullable()
         table.text('icon').notNullable()
         table.text('image').notNullable()
         table.string('created_at', 255).notNullable()
         table.string('updated_at', 255).notNullable()
      })
   }

   public async down() {
      this.schema.dropTable(this.tableName)
   }
}
