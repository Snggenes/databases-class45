const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "hyfpassword",
});
connection.connect();

const query1 = "CREATE DATABASE IF NOT EXISTS abcbank";
const query2 = "USE abcbank";

const query3 = `
  CREATE TABLE IF NOT EXISTS account (
    account_number INT NOT NULL,
    balance INT NOT NULL,
    PRIMARY KEY (account_number)
  );
`;

const query4 = `
  INSERT INTO account (account_number, balance)
  VALUES
    (101, 2000),
    (102, 2500),
    (103, 3000),
    (104, 3500),
    (105, 4000);
`;

const query5 = `
  CREATE TABLE IF NOT EXISTS account_changes (
    change_number INT NOT NULL,
    account_number INT NOT NULL,
    amount INT NOT NULL,
    changed_date VARCHAR(255) NOT NULL,
    remark TEXT NOT NULL,
    PRIMARY KEY (change_number)
  );
`;

const transactionQuery = `
  START TRANSACTION;
  
  UPDATE account
  SET balance = balance - 1000
  WHERE account_number = 101;

  UPDATE account
  SET balance = balance + 1000
  WHERE account_number = 102;

  INSERT INTO account_changes (change_number, account_number, amount, changed_date, remark)
  VALUES
    (1, 101, -1000, '2023-11-27', 'to account 102'),
    (2, 102, 1000, '2023-11-27', 'from account 101');
  
  COMMIT;
`;

function executeQuery(query) {
  connection.query(query, (error, result) => {
    if (error) {
      console.error(`Error: ${query}`);
      throw error;
    }
    console.log(result);
  });
}

executeQuery(query1);
executeQuery(query2);
executeQuery(query3);
executeQuery(query4);
executeQuery(query5);
executeQuery(transactionQuery);

connection.end();
