'use strict'

const Route = use('Route')

Route.post('/login', 'UserController.login')
Route.post('/signup', 'UserController.signup')
Route.get('/users', 'UserController.list')
Route.get('/csrf', 'MainController.csrf')
Route.get('*', 'MainController.alive')