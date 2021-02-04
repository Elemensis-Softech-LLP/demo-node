const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
app.use(cors());
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/../public/views');
// parse application/x-www-form-urlencoded
 
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin','localhost');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept,*');
//   next();
// });
// app.options('*', cors()) // include before other routes\
require('./routes')(app);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4201');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



// app.use(cors());
// app.options('http://localhost:4200', cors());  // enable pre-flight

// var enableCORS = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept,*');

//   if ('OPTIONS' == req.method) {
//     res.sendStatus(200);
//   } else {
//     next();
//   };

//   req.on('information', (info) => {
//      });
// };
// app.use(enableCORS);
// parse application/json
app.use(bodyParser.json())
// app.use('public',express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
require('./database');
module.exports = app;