module.exports = ({ env }) => ({
  load: {
    before: ['responseTime', 'boom', 'logger', 'cors', 'responses', 'gzip'],
    after: ['parser', 'router'],
  },
  settings: {
    gzip: {
      enabled: true,
      options: {
        br: false
      }
    },
    cors: {
      enabled: true,
      origin: ['http://localhost:3000', 'http://localhost', env('URL', 'http://localhost:1337')],
      expose: ['WWW-Authenticate', 'Server-Authorization', 'Access-Control-Expose-Headers'],
      maxAge: 31536000,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      headers: [
        'Content-Type',
        'Authorization',
        'X-Frame-Options',
        'Origin',
        'Access-Control-Allow-Headers',
        'access-control-allow-origin',
      ],
    },
  }
})

  // cors: {
    //   enabled: false,
    //   headers: '*',
    //   origin: ['http://localhost:3000', 'http://localhost', env('URL', 'http://localhost:1337')],
    // },
