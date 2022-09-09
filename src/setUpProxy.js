const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/*', {
          target: 'http://3.37.88.220:8080/',
          changeOrigin: true
      })
  )
};