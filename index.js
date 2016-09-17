var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var fs = require('fs');
var app = express();

app.use(require('morgan')('dev'));

// configure app to use ejs for templates
app.set('view engine', 'ejs');

// tell our server where our static files live.
var staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/links', function(req, res) {
  var LongUrl = {
                url: req.body.URL};
    console.log(LongUrl);
    res.send(LongUrl);
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
