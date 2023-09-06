import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
   protected tableName = 'users'

   public async up() {
      this.schema.createTable(this.tableName, (table) => {
         table.uuid('id', { primaryKey: true }).defaultTo(this.raw('uuid_generate_v4()'))
         table.uuid('role_id').notNullable().references('id').inTable('roles').onDelete('CASCADE')
         table.string('name').notNullable()
         table.string('phone').notNullable()
         table.string('email').notNullable().unique()
         table.string('password').notNullable()
         table.string('remember_me_token').nullable()
         table.string('created_at', 255).notNullable()
         table.string('updated_at', 255).notNullable()
      })
   }

   public async down() {
      this.schema.dropTable(this.tableName)
   }
}
