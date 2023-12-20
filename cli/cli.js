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
        break;
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
        break;
      case "addadepartment":
        addDepartment();
        break;
      case "addarole":
        addRole();
        break;
      case "addanemployee":
        addEmployee();
        break;
      case "updateanemployeerole":
        updateEmployeeRole();
        break;
    }
    if (
      answers.option == "viewalldepartments" ||
      answers.option == "viewallroles" ||
      answers.option == "viewallemployees"
    ) {
      setTimeout(() => {
        run();
      }, 1000);
    } else if (answers.option == "quit") {
      return;
    }
  });
}
function updateEmployeeRole() {
  return;
  //How to map ID of chosen employee to update
}

function addDepartment() {
  const questions = [
    {
      type: "input",
      name: "newdepartment",
      message: "Enter Name of the Deparment",
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    const newdepartment = department.adddepartment(answers.newdepartment);
    newdepartment.then(
      function () {
        console.log(`Department ${answers.newdepartment} Added Successfully`);
        run();
      },
      function (error) {
        console.log(error);
      }
    );
  });
}
function addRole() {
  const departmentlist = department.listdepartment();
  departmentlist.then((value) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "newrole",
          message: "Enter new Role Name",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter salary for the Role",
        },
        {
          type: "list",
          name: "department_id",
          message: "Choose Department for the new Role",
          choices: value[0],
        },
      ])
      .then((answers) => {
        const newRole = role.addrole(
          answers.newrole,
          answers.salary,
          answers.department_id
        );
        newRole.then(
          function () {
            console.log(`Role ${answers.newrole} Added Successfully`);
            run();
          },
          function (error) {
            console.log(error);
          }
        );
      });
  });
}
async function addEmployee() {
  const [managers] = await employee.listemployee();
  const managersList = managers.map((item) => item.Manager_Name);
  const [roles] = await role.listrole();
  const roletitle = roles.map((item) => item.title);

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter First Name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter Last Name",
      },
      {
        type: "list",
        name: "role_id",
        message: "Choose  Role",
        choices: roletitle,
      },
      {
        type: "list",
        name: "manager_id",
        message: "Choose Manager",
        choices: managersList,
      },
    ])
    .then((answers) => {
      const newEmployee = employee.addemployee(
        answers.first_name,
        answers.last_name,
        answers.role_id,
        answers.manager_id
      );
      newEmployee.then(
        function () {
          console.log(`Employee Added Successfully`);
          run();
        },
        function (error) {
          console.log(error);
        }
      );
    });
}
module.exports = { run };
