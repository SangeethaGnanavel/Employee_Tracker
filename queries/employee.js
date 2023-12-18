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
}
module.exports = Employee;
