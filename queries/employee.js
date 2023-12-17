const mysql = require("mysql2/promise");
const DBConnection = require("./dbconnection");
const dbconnection = new DBConnection();
class Employee {
  constructor() {}

  async viewemployee() {
    const sql = "SELECT id,first_name,last_name FROM employee";
    const db = dbconnection.main();
    return (await db).query(sql);
  }
}
module.exports = Employee;
