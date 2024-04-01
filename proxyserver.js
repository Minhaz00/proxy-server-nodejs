var http = require('http'),
    httpProxy = require('http-proxy'),
    express = require('express');

// create a server
var app = express();
var proxy = httpProxy.createProxyServer({ target: 'http://localhost:8001', ws: true });
var server = require('http').createServer(app);

// proxy HTTP GET / POST
app.get('/node/*', function(req, res) {
  console.log("proxying GET request", req.url);
  proxy.web(req, res, {});
});
app.post('/chat/*', function(req, res) {
  console.log("proxying POST request", req.url);
  proxy.web(req, res, {});
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Proxy websockets
server.on('upgrade', function (req, socket, head) {
  console.log("proxying upgrade request", req.url);
  proxy.ws(req, socket, head);
});

// serve static content
app.use('/', express.static(__dirname + "/public"));

server.listen(9000);