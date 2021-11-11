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
      enabled: false,
      headers: '*',
      origin: env('CORS_ORIGIN', 'http://localhost:1337,http://localhost:3000,http://localhost:1337,http://localhost:8000').split(',')
    },
  }
})
