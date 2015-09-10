var staticServer = require('node-static');
var http = require('http');

var file = new(staticServer.Server)();

http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(8000);
