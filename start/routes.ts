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
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.on('/').render('index')
Route.get('/login', 'LoginController.showLogin')
Route.post('/login', 'LoginController.login');
Route.get('/', 'HomeController.index')

Route.group(() => {
    // Route.post('/store', 'HomeController.store')
    Route.get('/logout', 'LoginController.logout')
    Route.get('/profile', 'ProfilesController.addProfile')
    Route.group(() => {
        Route.get('/', 'AdminsController.dashboard');
        Route.get('phim', 'FilmsController.create')
        Route.post('phim', 'FilmsController.store')
        Route.post('phim/:id/m3u8', 'FilmsController.addM3u8').as('admin.phim.m3u8')
        // Route.get('m3u8', 'FilmsController.m3u8')
    }).prefix('admin')
}).middleware(['auth']);

Route.get('detail/:id', 'WatchesController.detail')
Route.get('watch/:id', 'WatchesController.watch')

