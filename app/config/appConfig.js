'use strict'
module.exports = {
    "db": { //Database Configuration
        "port": 27017,
        "dbName": 'meandemo',
        "authDb": 'admin',
        "url": 'mongodb://localhost:27017/meandemo',
        "host": 'localhost',
        "user": "mean",
        "passkey": "$3cRE@t",
        "encryptSecret": "save210"
    },
    "server": { //Server Configuration                                                 
        "name": "Employees Application",
        "port": 3000,
        "considerPort": true
   
    },
    
    "token": {
        secret: "Employee@123"
        }    
}