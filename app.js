var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('server listening', host, port);

});

app.get('/', function (req, res) {
  res.send('Hi!');
});