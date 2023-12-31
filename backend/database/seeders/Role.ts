import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class extends BaseSeeder {
   public async run() {
      Role.truncate(true)
      await Role.createMany([
         {
            name: 'admin',
         },
         {
            name: 'user',
         }
      ])
   }
}
