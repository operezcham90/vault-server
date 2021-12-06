'use strict'

const Route = use('Route')

Route.post('/dropout', 'MainController.dropout')
Route.post('/signup', 'MainController.signup')
Route.post('/login', 'MainController.login')
Route.post('/logout', 'MainController.logout')
Route.get('/user', 'MainController.user')
Route.get('/csrf', 'MainController.csrf')
Route.get('*', 'MainController.alive')