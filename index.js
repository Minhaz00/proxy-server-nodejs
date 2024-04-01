
var httpProxy = require('http-proxy');
const http = require('http');
const url = require('url');
var proxy1 = new httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 9015
  }
});
var proxy2 = new httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 9016
  }
});


var proxyServer = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const namespace = parsedUrl.pathname.split('/')[1];
    // const targetUrl = `${targetServer}${parsedUrl.pathname.replace(`/${namespace}`, '')}${parsedUrl.search}`;
    switch(namespace) {
        case 'node':
            proxy1.web(req, res);
            break;
        default:
            proxy2.web(req, res);
            break;
    }
    
});

proxyServer.on('upgrade', function (req, socket, head) {
  proxy1.ws(req, socket, head);
});
proxyServer.on('upgrade', function (req, socket, head) {
  proxy2.ws(req, socket, head);
});

proxyServer.listen(8015, ()=> {
    console.log('proxy server listening on port 8015');
});