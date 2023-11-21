const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "hyfpassword",
  database: "trial",
});
connection.connect();

//All research papers and the number of authors that wrote that paper.
connection.query(
  `
    SELECT
        research_papers.paper_title,
        count(relation.author_id) as author_numbers
    FROM research_papers
    left JOIN relation on research_Papers.paper_id = relation.paper_id
    group by research_papers.paper_title;
    `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

//Average of the h-index of all authors per university.
connection.query(
  `
    SELECT
        authors.university,
        avg(h_index) as average_index
    FROM authors
    group by authors.university;
      `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

//Minimum and maximum of the h-index of all authors per university.
connection.query(
  `
    SELECT
        authors.university,
        min(h_index) as min_index,
        max(h_index) as max_index
    FROM authors
    group by authors.university;

        `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

//Sum of the research papers of the authors per university.
connection.query(
  `
    SELECT authors.university, COUNT(relation.paper_id) AS total_papers
        FROM authors
    JOIN relation ON authors.author_id = relation.author_id
    JOIN research_Papers ON relation.paper_id = research_Papers.paper_id
    GROUP BY authors.university;
          `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

//Sum of the research papers published by all female authors.
connection.query(
  `
    SELECT COUNT(DISTINCT relation.paper_id) AS total_papers_by_female_authors
        FROM authors
    JOIN relation ON authors.author_id = relation.author_id
    JOIN research_Papers ON relation.paper_id = research_Papers.paper_id
    WHERE authors.gender = 'female';
  
            `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.end();
