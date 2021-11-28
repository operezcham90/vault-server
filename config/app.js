'use strict'

const Env = use('Env')

module.exports = {
  name: Env.get('APP_NAME', 'vault-server'),

  appKey: Env.getOrFail('APP_KEY'),

  http: {
    allowMethodSpoofing: true,
    trustProxy: false,
    subdomainOffset: 2,
    jsonpCallback: 'callback',
    etag: false
  },

  views: {
    cache: Env.get('CACHE_VIEWS', true)
  },

  static: {
    dotfiles: 'ignore',
    etag: true,
    extensions: false
  },

  locales: {
    loader: 'file',
    locale: 'en'
  },

  logger: {
    transport: 'console',
    console: {
      driver: 'console',
      name: 'vault-server',
      level: 'info'
    },

    file: {
      driver: 'file',
      name: 'vault-server',
      filename: 'vault.log',
      level: 'info'
    }
  },

  cookie: {
    httpOnly: true,
    sameSite: false,
    path: '/',
    maxAge: 7200
  }
}
