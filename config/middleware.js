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
      origin: [ 'http://localhost', 'https://banana-dev-web.thecodeworkers.com/', env('URL', 'http://localhost:1337') ],
      headers: ['*']
    },
  }
})

