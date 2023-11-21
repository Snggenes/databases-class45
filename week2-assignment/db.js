const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "hyfpassword",
});
connection.connect();

connection.query(
  "create database if not exists trial",
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.end();
