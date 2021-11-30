'use strict'

module.exports = {
  csp: {
    enabled: true,

    directives: {
      imgSrc: ['http:', 'data:']
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
      sameSite: false,
      path: '/',
      maxAge: 7200
    }
  }
}
