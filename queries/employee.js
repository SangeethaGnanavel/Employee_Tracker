const mysql = require("mysql2/promise");
const DBConnection = require("./dbconnection");
const dbconnection = new DBConnection();
class Employee {
  constructor() {}

  async viewemployee() {
    const sql =
      "SELECT id as Employee_ID,first_name as First_Name,last_name as Last_Name FROM employee";
    const db = dbconnection.main();
    return (await db).query(sql);
  }
  async listemployee() {
    const sql =
      "SELECT id,CONCAT(first_name,last_name) as Manager_Name  FROM employee";
    const db = dbconnection.main();
    return (await db).query(sql);
  }
  async addemployee(first_name, last_name, role, manager) {
    const params = [first_name, last_name, role, manager];
    const sql =
      "insert into employee (first_name,last_name,role_id,manager_id) values (?,?,(select id from role where title=?),(select EMP.id from employee as EMP where CONCAT(EMP.first_name,EMP.last_name)=?))";
    const db = dbconnection.main();
    return (await db).query(sql, params);
  }
}
module.exports = Employee;
