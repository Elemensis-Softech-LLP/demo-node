const basic = require('./controllers/basic');
const user = require('./controllers/user');
const common = require('./util/common');

module.exports = function(app) {     

    app.post("/login", basic.login);// 1
    app.post("/registration", basic.registration);// 2
    app.get("/getEmployeeList", user.getEmployeeList);// 3
    app.get("/getEmployeeDetails", user.getEmployeeDetails);// 4
    app.put("/updateEmployee", user.updateEmployee);// 5
    app.post("/addEmployee", user.addEmployee);// 6
    app.delete("/deleteEmployee", user.deleteEmployee);// 7
    app.get("/verifyToken",common.verifyToken);// 4

}
