'use strict'

const Route = use('Route')

Route.get('/user', 'UserController.get')
Route.post('/user', 'UserController.post')
Route.put('/user', 'UserController.put')
Route.delete('/user', 'UserController.delete')

Route.get('/csrf', 'MainController.csrf')
Route.get('*', 'MainController.alive')