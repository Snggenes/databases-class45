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
    console.log(results);
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

// Query 1: All research papers and the number of authors that wrote that paper
executeQuery(
  `
    SELECT research_papers.paper_title, COUNT(relation.author_id) AS author_numbers
    FROM research_papers
    LEFT JOIN relation ON research_papers.paper_id = relation.paper_id
    GROUP BY research_papers.paper_title;
  `
);

// Query 2: Average of the h-index of all authors per university
executeQuery(
  `
    SELECT authors.university, AVG(h_index) AS average_index
    FROM authors
    GROUP BY authors.university;
  `
);

// Query 3: Minimum and maximum of the h-index of all authors per university
executeQuery(
  `
    SELECT authors.university, MIN(h_index) AS min_index, MAX(h_index) AS max_index
    FROM authors
    GROUP BY authors.university;
  `
);

// Query 4: Sum of the research papers of the authors per university
executeQuery(
  `
    SELECT authors.university, COUNT(relation.paper_id) AS total_papers
    FROM authors
    JOIN relation ON authors.author_id = relation.author_id
    JOIN research_Papers ON relation.paper_id = research_Papers.paper_id
    GROUP BY authors.university;
  `
);

// Query 5: Sum of the research papers published by all female authors
executeQuery(
  `
    SELECT COUNT(DISTINCT relation.paper_id) AS total_papers_by_female_authors
    FROM authors
    JOIN relation ON authors.author_id = relation.author_id
    JOIN research_Papers ON relation.paper_id = research_Papers.paper_id
    WHERE authors.gender = 'female';
  `
);

connection.end((err) => {
  if (err) {
    console.error("Error closing database connection:", err);
    return;
  }
  console.log("Connection closed");
});
