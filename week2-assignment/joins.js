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
    select
        authors.author_name as author,
        mentors.author_name as mentor
    from authors
    left join
        authors as mentors on authors.mentor = mentors.author_id;
    `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  `
    select 
        authors.*,
        research_papers.paper_title
    from authors
    left join relation on authors.author_id = relation.author_id
    left join research_papers on relation.paper_id = research_papers.paper_id;

      `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.end();
