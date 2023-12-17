const inquirer = require("inquirer");
const Employee = require("../queries/employee");
const employee = new Employee();
class CLI {
  constructor() {}
  run() {
    const questions = [
      {
        type: "list",
        name: "option",
        message: "What would you like to do?",
        choices: ["Add Employee", "View Employee"],
        filter(value) {
          return value.toLowerCase();
        },
      },
    ];

    inquirer.prompt(questions).then((answers) => {
      switch (answers.option) {
        case "add employee":
        case "view employee":
          const result = employee.viewemployee();
          result.then(
            function (value) {
              console.table(value[0]);
            },
            function (error) {
              console.log(error);
            }
          );

        default:
          break;
      }
    });
  }
}

module.exports = CLI;
