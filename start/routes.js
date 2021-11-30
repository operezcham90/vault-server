'use strict'

const Route = use('Route')

Route.get('*', 'MainController.alive')
Route.get('favicon.ico', 'MainController.icon')