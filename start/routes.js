'use strict'

const Route = use('Route')

Route.get('favicon.ico', 'MainController.icon')
Route.get('*', 'MainController.alive')