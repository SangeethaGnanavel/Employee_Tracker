const mysql = require("mysql2/promise");
const DBConnection = require("./dbconnection");
const dbconnection = new DBConnection();
class Role {
  constructor() {}

  async addrole(title, salary, department) {
    const params = [title, salary, department];
    const sql = "insert into role (title,salary,department_id) values (?,?,?)";
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
    const sql = "SELECT id, title FROM role";
    const db = dbconnection.main();
    return (await db).query(sql);
  }
  async viewBudgetofDepartment(department_id) {
    const params = [department_id];
    const sql =
      "select sum(role.salary) as Total_Utilized_Budget from role Inner join employee on role.id=employee.role_id and role.department_id=? group by department_id";
    const db = dbconnection.main();
    return (await db).query(sql, params);
  }
}
module.exports = Role;
