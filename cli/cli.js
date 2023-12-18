const inquirer = require("inquirer");
const Employee = require("../queries/employee");
const Department = require("../queries/department");
const Role = require("../queries/role");
const employee = new Employee();
const department = new Department();
const role = new Role();
const questions = [
  {
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "Quit",
    ],
    filter(value) {
      return value.toLowerCase();
    },
  },
];
// class CLI {
//   constructor() {}
function run() {
  inquirer.prompt(questions).then((answers) => {
    answers.option = answers.option.replace(/\s/g, "");
    switch (answers.option) {
      case "viewalldepartments":
        const departmentlist = department.viewdepartment();
        departmentlist.then(
          function (value) {
            console.table(value[0]);
          },
          function (error) {
            console.log(error);
          }
        );
        break;
      case "viewallroles":
        const rolelist = role.viewrole();
        rolelist.then(
          function (value) {
            console.table(value[0]);
          },

          function (error) {
            console.log(error);
          }
        );
      case "viewallemployees":
        const employeelist = employee.viewemployee();
        employeelist.then(
          function (value) {
            console.table(value[0]);
          },
          function (error) {
            console.log(error);
          }
        );
    }
    if (answers.option != "quit") {
      setTimeout(() => {
        run();
      }, 1000);
    } else {
      return;
    }
  });
}
// }

module.exports = { run };
