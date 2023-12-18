const mysql = require("mysql2/promise");
const DBConnection = require("./dbconnection");
const dbconnection = new DBConnection();
class Role {
  constructor() {}

  //   async addrole(role_name) {
  //     const sql = "insert into department (name) values (?)";
  //     const db = dbconnection.main();
  //     return (await db).query(sql, department_name);
  //   }
  async viewrole() {
    const sql =
      "SELECT role.id as Role_Id,role.title as Title,role.salary Salary,department.name as Department_Name FROM role INNER JOIN department on role.department_id=department.id";
    const db = dbconnection.main();
    return (await db).query(sql);
  }
}
module.exports = Role;
