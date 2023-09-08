import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
   protected tableName = 'addresses'

   public async up() {
      this.schema.createTable(this.tableName, (table) => {
         table.uuid('id', { primaryKey: true }).defaultTo(this.raw('uuid_generate_v4()'))
         table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
         table.string('recipient').notNullable()
         table.string('phone').notNullable()
         table.text('address').notNullable()
         table.text('note').nullable()
         table.string('created_at', 255).notNullable()
         table.string('updated_at', 255).notNullable()
      })
   }

   public async down() {
      this.schema.dropTable(this.tableName)
   }
}
