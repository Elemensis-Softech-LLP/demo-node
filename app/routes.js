const basic = require('./controllers/basic');
const emp = require('./controllers/emp');
const common = require('./util/common');
const upload = require('./controllers/upload-image');



module.exports = function (app) {

  app.post("/login", basic.login);// 1
  app.post("/registration", basic.registration);// 2
  app.get("/getEmployeeList", common.verifyToken, emp.getEmployeeList);// 3
  app.get("/getEmployeeDetails/:userName", common.verifyToken, emp.getEmployeeDetails);// 4
  app.put("/updateEmployee", common.verifyToken, emp.updateEmployee);// 5
  app.post("/addEmployee", common.verifyToken, emp.addEmployee);// 6
  app.delete("/deleteEmployee/:id", emp.deleteEmployee);// 7
  app.get("/verifyToken", common.verifyToken);//8  
  app.post("/upload", upload.upload); 
  
  
}
