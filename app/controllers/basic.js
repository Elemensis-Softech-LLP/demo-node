const md5 = require('md5');
const jwt = require('jsonwebtoken');
const tokenConfig = require("../config/appConfig").token;
const dbConfig = require("../config/appConfig").db;
module.exports = {
    registration, // 1
    login, // 2
}

/*
1 Purpose: To register user details
*/
async function registration(req, res) {
    try {
        let newUser = req.body;

        let recordExist = await query(`SELECT username,contact,firstname,lastname FROM EMPLOYEE WHERE username='${newUser.username}' OR contact='${newUser.contact}'`);
       

        if (recordExist.length) {
            res.send({
                'success': false,
                'message': 'Oops! Already Registered!'
            });
        } else {
            newUser.dob = new Date(newUser.dob).getFullYear() + '-' + (new Date(newUser.dob).getMonth() + 1) + '-' + new Date(newUser.dob).getDate();
            newUser.dateOfJoin = new Date(newUser.dateOfJoin).getFullYear() + '-' + (new Date(newUser.dateOfJoin).getMonth() + 1) + '-' + new Date(newUser.dateOfJoin).getDate();
            let result = await query(`INSERT INTO EMPLOYEE(firstname,lastname,username,contact,password,dob,address,isActive,dateOfJoin) VALUES('${newUser.firstname}','${newUser.lastname}','${newUser.username}','${newUser.contact}','${md5(newUser.password)}','${newUser.dob}','${newUser.address}','${newUser.isActive}','${newUser.dateOfJoin}')`);
            console.log("employee...",result);
            res.send({
                'success': true,
                'message': 'Registration Successful',
                value: result
            });
        }

    } catch (error) {
        
        res.status(500).send({
            'success': false,
            'message': 'Error! invalid',
            'error': error
        });
    }
}

/*
2 Purpose: login user details
*/

async function login(req, res) {
    try {
        let user = req.body;        
        let recordExist = await query(`SELECT username, password, role FROM EMPLOYEE WHERE username='${user.username}' `);       
        if (recordExist.length) {
            if (recordExist[0].password === md5(user.password)) {                               
                const userName = user.username;
                const role = recordExist[0].role;             
                
                const token = jwt.sign(JSON.parse(JSON.stringify(recordExist[0])), tokenConfig.secret);
          
                res.send({
                    'success': true,
                    token,
                    username: userName,
                    role:role,
                    'message': 'Login Successful!'
                });
            } else {
                res.send({
                    'success': false,
                    'message': 'Invalid Credentials'
                });
            }
        } else {
            res.send({
                'success': false,
                'message': 'employee is not Registered'
            }); 
        }

    } catch (error) {        
        res.sendStatus(500).send({
            'success': false,
            'message': 'Error! invalid',
            'error': error
        });
    }
}