const mysql = require("mysql2/promise");
const DBConnection = require("./dbconnection");
const dbconnection = new DBConnection();
class Department {
  constructor() {}

  async adddepartment(department_name) {
    const sql = "insert into department (name) values (?)";
    const db = dbconnection.main();
    return (await db).query(sql, department_name);
  }
  async viewdepartment() {
    const sql =
      "SELECT id as Department_ID,name as Department_Name FROM department";
    const db = dbconnection.main();
    return (await db).query(sql);
  }
  async listdepartment() {
    const sql = "SELECT id,name FROM department";
    const db = dbconnection.main();
    return (await db).query(sql);
  }
}
module.exports = Department;
