require("dotenv").config();
const db = require("mysql2");

const connection = db.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD, // Update with your MySQL password
  database: process.env.DB_NAME, // Update with your database name
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("MySQL database connected successfully");
});

module.exports = connection;
