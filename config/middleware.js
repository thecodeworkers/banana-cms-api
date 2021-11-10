module.exports = {
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
      headers: '*',
      origin: ['http://localhost:3000', 'http://192.168.1.53:3000', 'http://localhost']
    },
  }
}

