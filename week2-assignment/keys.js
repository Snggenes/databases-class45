const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "hyfpassword",
  database: "trial",
});
connection.connect();

connection.query("use trial", (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});
connection.query(
  `
        create table if not exists authors(
            author_id int auto_increment primary key,
            author_name varchar(255),
            university varchar(255),
            date_of_birth varchar(255),
            h_index int,
            gender varchar(255)
        )
    `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);
connection.query(
  `
        alter table authors
        add column mentor int
    `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);
connection.query(
  `
        alter table authors
        add constraint fk_mentor
        foreign key (mentor) references authors(author_id)             
    `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.end();
