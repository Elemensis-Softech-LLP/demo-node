const express = require('express');
// var cors = require('cors');
var bodyParser = require('body-parser');
const app = express();
// app.use(cors());
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

app.use(function (req, res, next) {
  console.log("req = ",req);
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept,*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// var enableCORS = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
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
require('./routes')(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
require('./database');
module.exports = app;