const db = require("mysql2");

const connection = db.createConnection({
  host: "localhost",
  user: "root",
  password: "Amritesh@01",
  database: "Express_trial",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("MySQL database connected successfully");
});

module.exports = connection;
