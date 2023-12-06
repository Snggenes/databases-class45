const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "hyfpassword",
  database: "trial",
});

function executeQuery(query) {
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(`Error executing query: ${query}`, error);
      connection.end();
      return;
    }

    console.log("Query executed successfully");
  });
}

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    connection.end();
    return;
  }
  console.log("Connected to database");
});

executeQuery("use trial");
executeQuery(`
  CREATE TABLE IF NOT EXISTS authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    author_name VARCHAR(255),
    university VARCHAR(255),
    date_of_birth DATE,
    h_index INT,
    gender VARCHAR(255)
  )
`);
executeQuery(`
  ALTER TABLE authors
  ADD COLUMN mentor INT
`);
executeQuery(`
  ALTER TABLE authors
  ADD CONSTRAINT fk_mentor
  FOREIGN KEY (mentor) REFERENCES authors(author_id)
`);

connection.end((err) => {
  if (err) {
    console.error("Error closing database connection:", err);
    return;
  }
  console.log("Connection closed");
});
