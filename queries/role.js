const mysql = require("mysql2/promise");
const DBConnection = require("./dbconnection");
const dbconnection = new DBConnection();
class Role {
  constructor() {}

  async addrole(title, salary, department) {
    const params = [title, salary, department];
    const sql =
      "insert into role (title,salary,department_id) values (?,?,(select id from department where name=?))";
    const db = dbconnection.main();
    return (await db).query(sql, params);
  }
  async viewrole() {
    const sql =
      "SELECT role.id as Role_Id,role.title as Role_Name,role.salary Salary,department.name as Department_Name FROM role INNER JOIN department on role.department_id=department.id";
    const db = dbconnection.main();
    return (await db).query(sql);
  }
  async listrole() {
    const sql = "SELECT role.title FROM role";
    const db = dbconnection.main();
    return (await db).query(sql);
  }
}
module.exports = Role;
