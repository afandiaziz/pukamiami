import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
   public async run() {
      User.truncate(true)
      await User.createMany([
         {
            role_id: (await Role.findByOrFail('name', 'admin')).id,
            email: 'admin@pukamiami.com',
            name: 'Puk Ami Ami',
            phone: '085777571810',
            password: '123456',
         },
         {
            role_id: (await Role.findByOrFail('name', 'user')).id,
            email: 'user@mail.com',
            name: 'User 1',
            phone: '08123456789012',
            password: '123456',
         },
      ])
   }
}
