const util = require('util');
let mysql = require('mysql');

global.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Binali@123',
    database: 'Employees',
    charset: 'utf8mb4'
});
connection.connect();
global.query = util.promisify(connection.query).bind(connection);
