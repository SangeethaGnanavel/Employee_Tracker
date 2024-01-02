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
      "View employees by manager",
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
      case "viewemployeesbymanager":
        viewemployeesbymanager();
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
async function viewemployeesbymanager() {
  const [managers] = await employee.listemployee();
  const managersList = managers.map((item) => item.Manager_Name);
  inquirer
    .prompt([
      {
        type: "list",
        name: "manager_name",
        message: "Choose Manager",
        choices: managersList,
      },
    ])
    .then((answers) => {
      const managerId = managers.find(
        (manager) => manager.Manager_Name === answers.manager_name
      ).id;
      const employeebyManager = employee.viewemployeebymanager(managerId);
      employeebyManager.then(
        function (value) {
          console.table(value[0]);
          run();
        },
        function (error) {
          console.log(error);
        }
      );
    });
}
async function updateEmployeeRole() {
  const [employees] = await employee.listemployee();
  const employeesList = employees.map((item) => item.Manager_Name);
  const [roles] = await role.listrole();
  const roletitle = roles.map((item) => item.title);
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_name",
        message: "Choose Employee to Update",
        choices: employeesList,
      },
      {
        type: "list",
        name: "role_title",
        message: "Choose Role",
        choices: roletitle,
      },
    ])
    .then((answers) => {
      const employeeId = employees.find(
        (employee) => employee.Manager_Name === answers.employee_name
      ).id;
      const roleId = roles.find((role) => role.title === answers.role_title).id;
      const updateEmployee = employee.updateemployeerole(roleId, employeeId);
      updateEmployee.then(
        function () {
          console.log(`Employee Updated Successfully`);
          run();
        },
        function (error) {
          console.log(error);
        }
      );
    });
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
async function addRole() {
  const [departments] = await department.listdepartment();
  const departmentName = departments.map((item) => item.name);
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
        name: "department_name",
        message: "Choose Department for the new Role",
        choices: departmentName,
      },
    ])
    .then((answers) => {
      const departmentId = departments.find(
        (department) => department.name === answers.department_name
      ).id;
      const newRole = role.addrole(
        answers.newrole,
        answers.salary,
        departmentId
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
        name: "role_title",
        message: "Choose  Role",
        choices: roletitle,
      },
      {
        type: "list",
        name: "manager_name",
        message: "Choose Manager",
        choices: managersList,
      },
    ])
    .then((answers) => {
      const managerId = managers.find(
        (manager) => manager.Manager_Name === answers.manager_name
      ).id;
      const roleId = roles.find((role) => role.title === answers.role_title).id;
      const newEmployee = employee.addemployee(
        answers.first_name,
        answers.last_name,
        roleId,
        managerId
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
