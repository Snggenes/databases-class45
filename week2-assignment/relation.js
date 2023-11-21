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
    create table if not exists relation(
        paper_id int,
        author_id int
    )
    `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  `
        alter table relation
        add constraint fk_paper
        foreign key (paper_id) references research_Papers(paper_id)
      `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);
connection.query(
  `
        alter table relation
        add constraint fk_author
        foreign key (author_id) references authors(author_id)
      `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.end();
