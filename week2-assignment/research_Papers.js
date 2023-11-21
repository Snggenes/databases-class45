const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "hyfpassword",
  database: "trial",
});
connection.connect();

connection.query(
  `
        create table research_Papers(
            paper_id int auto_increment primary key,
            paper_title varchar(255),
            conference varchar(255),
            publish_date varchar(255)
        )
    `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.end();
