import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class extends BaseSeeder {
   public async run() {
      User.truncate(true)
      await User.createMany([
         {
            role_id: await Database
               .from('roles')
               .where('name', 'admin').first().then((role) => role.id),
            email: 'admin@pukamiami.com',
            password: '123',
         },
         {
            role_id: await Database
               .from('roles')
               .where('name', 'user').first().then((role) => role.id),
            email: 'user@mail.com',
            password: '123',
         },
      ])
   }
}
