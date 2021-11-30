'use strict'

const Env = use('Env')

module.exports = {
  driver: Env.get('SESSION_DRIVER', 'cookie'),

  cookieName: 'vault-session',

  clearWithBrowser: true,

  age: '2h',

  cookie: {
    httpOnly: true,
    sameSite: true,
    path: '/'
  },

  file: {
    location: 'sessions'
  },

  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: null,
    db: 0,
    keyPrefix: ''
  }
}
