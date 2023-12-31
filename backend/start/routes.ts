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
        Route.post('/login', 'AuthController.login').as('login')
        Route.post('/register', 'AuthController.register').as('register')
    })

    Route.group(() => {
        Route.get('/logout', 'AuthController.logout').as('logout')
        Route.get('/profile', 'UsersController.profile').as('getProfile')
        Route.put('/profile', 'UsersController.updateProfile').as('updateProfile')

        Route.group(() => {
            Route.group(() => {
                Route.group(() => {
                    Route.get('/', 'AddressesController.all').as('index')
                    Route.post('/', 'AddressesController.store').as('store')
                    Route.get('/:id', 'AddressesController.show').as('show')
                    Route.put('/:id', 'AddressesController.update').as('update')
                    Route.delete('/:id', 'AddressesController.destroy').as('destroy')
                }).prefix('/address').as('address')

                Route.put('/password', 'UsersController.updatePassword').as('updatePassword')
            }).prefix('/user').as('user')

        }).middleware('isUser')

        Route.group(() => {
            Route.group(() => {
                Route.group(() => {
                    Route.post('/', 'ProductCategoriesController.store').as('store')
                    Route.get('/:id', 'ProductCategoriesController.show').as('show')
                    Route.put('/:id', 'ProductCategoriesController.update').as('update')
                    Route.delete('/:id', 'ProductCategoriesController.destroy').as('destroy')
                }).prefix('/categories').as('categories')

                Route.group(() => {
                    Route.get('/', 'ProductImagesController.all').as('index')
                    Route.post('/', 'ProductImagesController.store').as('store')
                    Route.get('/:id', 'ProductImagesController.show').as('show')
                    Route.put('/:id', 'ProductImagesController.update').as('update')
                    Route.delete('/:id', 'ProductImagesController.destroy').as('destroy')
                }).prefix('/images').as('images')

                Route.post('/', 'ProductsController.store').as('store')
                Route.get('/:id', 'ProductsController.show').as('show')
                Route.put('/:id', 'ProductsController.update').as('update')
                Route.delete('/:id', 'ProductsController.destroy').as('destroy')
            }).prefix('/products').as('products')
        }).middleware('isAdmin')

        // Route.group(async ({ auth }) => {
        //    const user = await auth.user
        // }).prefix('/products').as('products')

    }).middleware('auth')

    Route.group(() => {
        Route.get('/', 'ProductsController.all').as('index')
        Route.get('/slug/:slug', 'ProductsController.show').as('show.bySlug')
    }).prefix('/products').as('products')

    Route.group(() => {
        Route.get('/', 'ProductCategoriesController.all').as('index')
    }).prefix('/categories').as('categories')

}).prefix('/api').as('api')
