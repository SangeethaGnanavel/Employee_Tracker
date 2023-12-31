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
  async addemployee(first_name, last_name, role, managerid) {
    const params = [first_name, last_name, role, managerid];
    const sql =
      "insert into employee (first_name,last_name,role_id,manager_id) values (?,?,?,?)";
    const db = dbconnection.main();
    return (await db).query(sql, params);
  }
  async updateemployeerole(role_id, employee_id) {
    const params = [role_id, employee_id];
    const sql = `update employee set role_id=? where id=?`;
    const db = dbconnection.main();
    return (await db).query(sql, params);
  }
  async viewemployeebymanager(manager_id) {
    const params = [manager_id];
    const sql =
      "SELECT id as Employee_ID,first_name as First_Name,last_name as Last_Name FROM employee where manager_id=?";
    const db = dbconnection.main();
    return (await db).query(sql, params);
  }
  async viewemployeebydepartment(department_id) {
    const params = [department_id];
    const sql =
      "select * from employee where role_id in (select id from role where department_id=?);";
    const db = dbconnection.main();
    return (await db).query(sql, params);
  }
}
module.exports = Employee;
