var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var db = require("./models");

// require and create a new Hashids object
var Hashids = require("hashids");
var hashids = new Hashids("saltandpepper");

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

// Render home page
app.get('/', function(req, res){
  res.render('index');
});

//Collect data from home page form
app.post('/links', function(req,res) {
  console.log(req.body.URL);
  db.link.create({
    url: req.body.URL
  }).then(function(data){
    console.log("Data URL is:",data.dataValues.url);
    console.log("Data ID is:",data.id);
    var encode = hashids.encode(data.id);
    console.log(encode);
    res.send(encode);
    // res.json({encode: encode});
  });
});

//Show link
app.get ('/links/:id',function(req,res){


})

// Redirect to the entered link
app.get ('/:hash',function(req,res){

});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
