'use strict'

module.exports = {
  csp: {
    enabled: true,
    
    directives: {
      defaultSrc: ['self']
    },

    reportOnly: false,

    setAllHeaders: false,

    disableAndroid: true
  },

  xss: {
    enabled: true,
    enableOnOldIE: false
  },

  xframe: 'DENY',

  nosniff: true,

  noopen: true,

  csrf: {
    enable: true,
    methods: ['POST', 'PUT', 'DELETE'],
    filterUris: [],
    cookieOptions: {
      httpOnly: false,
      sameSite: true,
      path: '/',
      maxAge: 7200
    }
  }
}
