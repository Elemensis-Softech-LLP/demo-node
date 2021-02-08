const express = require('express');
// var cors = require('cors');
var bodyParser = require('body-parser');
const app = express();


app.use(function (req, res, next) {
  // console.log("req = ",req);
  var allowedDomains = ['http://localhost:4200','http://localhost:8100'];
  var origin = req.headers.origin;
  if(allowedDomains.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept,*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json())
require('./routes')(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
require('./database');
module.exports = app;