var express = require('express');
var morgan = require('morgan');
var app = express();
var swig = require('swig');
var routes = require('./routes/');


app.use('/', routes);

app.use(morgan('dev'));

//tell express what templating system we're using. engine method takes two arguments, the view engine, html usually,
// and the rendering function of the templating engine. the html lets express know the file extension, so we don't have to include it below
app.engine('html', swig.renderFile);

//you also have to set the view engine for express and the templating engine
app.set('view engine', 'html');

app.set('views', __dirname + "/views");

app.use(express.static(__dirname + '/public'));

swig.setDefaults({ cache: false });

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('server listening', host, port);

});