import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'roles'

    public async up() {
        this.schema.raw('DROP TYPE IF EXISTS "enum_roles_name"')
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id', { primaryKey: true }).defaultTo(this.raw('uuid_generate_v4()'))
            table.enu('name', ['admin', 'user'], {
                useNative: true,
                enumName: 'enum_roles_name',
                existingType: false,
                schemaName: 'public'
            }).defaultTo('user')
            // table.timestamps(false, true)
            table.bigInteger('created_at')
            table.bigInteger('updated_at')
            // table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.raw('DROP TYPE IF EXISTS "enum_roles_name"')
        this.schema.dropTable(this.tableName)
    }
}
