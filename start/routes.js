'use strict'

const Route = use('Route')

Route.post('/upload', 'MainController.upload')
Route.post('/dropout', 'MainController.dropout')
Route.post('/signup', 'MainController.signup')
Route.post('/login', 'MainController.login')
Route.post('/logout', 'MainController.logout')
Route.post('/reset', 'MainController.reset')
Route.get('/state', 'MainController.state')
Route.get('/find', 'MainController.find')
Route.get('*', 'MainController.alive')