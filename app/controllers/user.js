let md5 = require('md5');
console.log(md5('message'));
module.exports = {
    getEmployeeList,
    getEmployeeDetails,
    updateEmployee,
    addEmployee,
    deleteEmployee
}

/*
    Purpose: Get all registered  employee details // 3
*/
async function getEmployeeList(req, res) {
    try {
        let newUser = req.body;
        let recordExist = await query(`SELECT * FROM EMPLOYEE `);
        res.send({
            'success': true,
            'msg': 'EmployeeList recieved',
            Userdata: recordExist
        });

    } catch (error) {
        res.status(500).send({
            'success': false,
            'msg': 'Error! getting EmployeeList',
            'error': error
        });
    }
}

/*
    Purpose: Get particular employee details  // 4
*/
async function getEmployeeDetails(req, res) {
    try {
        let newUser = req.body;
        let recordExist = await query(`SELECT * FROM EMPLOYEE WHERE username='${newUser.username}' OR contact='${newUser.contact}' `);
        res.send({
            'success': true,
            'msg': 'Employee Details recieved',
            Userdata: recordExist
        });

    } catch (error) {
        res.status(500).send({
            'success': false,
            'msg': 'Error! getting Employee Details',
            'error': error
        });
    }
}

/*
    Purpose: Update employee details  // 5
*/

async function updateEmployee(req, res) {
    try {
        let newUser = req.body;
        let recordExist = await query(`UPDATE EMPLOYEE SET firstname='${newUser.firstname}',lastname='${newUser.lastname}',username='${newUser.username}',contact='${newUser.contact}' WHERE EmployeeID='${newUser.EmployeeID}'`);
        res.send({
            'success': true,
            'msg': 'Employee Update',
            Userdata: recordExist
        });

    } catch (error) {
        res.status(500).send({
            'success': false,
            'msg': 'Error! updatting Employees',
            'error': error
        });
    }
}

/*
    Purpose: Add employee details  // 6
*/
async function addEmployee(req, res) {
    try {
        let newUser = req.body;

        let recordExist = await query(`SELECT username,contact,firstname,lastname FROM EMPLOYEE WHERE username='${newUser.username}' OR contact='${newUser.contact}'`);


        if (recordExist.length) {
            res.send({
                'success': false,
                'message': 'Oops! Already Add!'
            });
        } else {
            newUser.dob = new Date(newUser.dob).getFullYear() + '-' + (new Date(newUser.dob).getMonth() + 1) + '-' + new Date(newUser.dob).getDate();
            let result = await query(`INSERT INTO EMPLOYEE(firstname,lastname,username,contact,password,dob,address) VALUES('${newUser.firstname}','${newUser.lastname}','${newUser.username}','${newUser.contact}','${md5(newUser.password)}','${newUser.dob}','${newUser.address}')`);

            res.send({
                'success': true,
                'message': 'Employee add Successfully',
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
    Purpose: Delete employees  // 7
*/
async function deleteEmployee(req, res) {
    try {
        let newUser = req.body;
        let recordExist = await query(`DELETE FROM EMPLOYEE WHERE EmployeeID='${newUser.EmployeeID}' `);
        res.send({
            'success': true,
            'msg': 'Deleting Employee',
            Userdata: recordExist
        });

    } catch (error) {
        res.status(500).send({
            'success': false,
            'msg': 'Error! deleting Employee',
            'error': error
        });
    }
}