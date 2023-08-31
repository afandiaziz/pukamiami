import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'users'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id', { primaryKey: true })
            table.uuid('role_id').notNullable().references('id').inTable('roles').onDelete('CASCADE')
            table.string('email').notNullable().unique()
            table.string('password').notNullable()
            table.string('remember_me_token').nullable()
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
