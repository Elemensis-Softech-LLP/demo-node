const util = require('util');
let mysql = require('mysql');

global.connection = mysql.createConnection({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'bf26387d579e0a',
    password: '3786e338',
    database: 'heroku_0504f9d559a766f',
    charset: 'utf8mb4'
});
connection.connect();
global.query = util.promisify(connection.query).bind(connection);