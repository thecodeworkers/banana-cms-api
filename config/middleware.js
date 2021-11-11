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
      origin: ['http://localhost:3000', 'http://localhost', env('URL', 'http://localhost:1337')]
    },
  }
})
