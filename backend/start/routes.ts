/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
   return { hello: 'world' }
})

Route.group(() => {
   Route.group(() => {
      Route.post('login', 'AuthController.login')
      Route.post('register', 'AuthController.register')
   })

   Route.group(() => {
      Route.get('logout', 'AuthController.logout')
      Route.group(() => {
         Route.get('profile', 'UsersController.profile')
         Route.put('profile', 'UsersController.updateProfile')
      }).middleware('isUser')

      Route.group(() => {
         Route.get('address', 'AddressesController.all')
         Route.post('address', 'AddressesController.store')
         Route.get('address/:id', 'AddressesController.show')
         Route.put('address/:id', 'AddressesController.update')
         Route.delete('address/:id', 'AddressesController.destroy')
      }).prefix('/user/')
      // Route.put('/password', 'UsersController.updatePassword')
   }).middleware('auth')

}).prefix('/api/')

// Route.get('/users', 'UsersController.index')
