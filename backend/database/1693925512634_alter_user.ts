import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
   protected tableName = 'users'

   public async up() {
      this.schema.alterTable(this.tableName, (table) => {
      })
   }

   public async down() {
      this.schema.table(this.tableName, (table) => {
         table.dropColumn('name')
         table.dropColumn('phone')
      })
   }
}
