var app = require('./app/server');
const serverConfig = require("./app/config/appConfig").server;
app.listen(serverConfig.port, function() {
    console.log(serverConfig.name + ' is running @ ' + serverConfig.port);
});