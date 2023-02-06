const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
      headers: {
        Pragma: 'no-cache'
      },
      onProxyReq: function(proxyReq, req, res) {
         // Add custom headers
         //proxyReq.setHeader('apikey', 'somekey');
         console.log("My Headers: " + JSON.stringify(proxyReq.getHeaders()));
      }
    })
  );
};