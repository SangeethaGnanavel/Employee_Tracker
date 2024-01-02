const mysql = require("mysql2/promise");

class DBConnection {
  constructor() {}
  async main() {
    // Connect to database using Promise API
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "employees_db",
      password: "Sangeetha@1982",
    });

    return connection;
  }
}
module.exports = DBConnection;
