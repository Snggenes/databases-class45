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

executeQuery(`
  INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
  VALUES
    ('a1', 'u1', '2000-01-01', 95, 'male', null),
    ('a2', 'u2', '2001-01-02', 90, 'female', 1),
    ('a3', 'u3', '2002-01-03', 85, 'male', 2),
    ('a4', 'u4', '2003-01-04', 80, 'female', 3),
    ('a5', 'u5', '2004-01-05', 75, 'male', 4),
    ('a6', 'u1', '2005-01-06', 70, 'female', 5),
    ('a7', 'u2', '2006-01-07', 65, 'male', 1),
    ('a8', 'u3', '2007-01-08', 60, 'female', 2),
    ('a9', 'u4', '2008-01-09', 55, 'male', 3),
    ('a10', 'u5', '1999-01-10', 50, 'female', 4),
    ('a11', 'u1', '1998-01-11', 45, 'male', 5),
    ('a12', 'u2', '1997-01-12', 40, 'female', 1),
    ('a13', 'u3', '1996-01-13', 35, 'male', 2),
    ('a14', 'u4', '1995-01-14', 30, 'female', 3),
    ('a15', 'u5', '1994-01-15', 25, 'male', 4);
`);

executeQuery(`
  INSERT INTO research_Papers (paper_title, conference, publish_date)
  VALUES
    ('paper1', 'conf', '2017-01-10'),
    ('paper2', 'conf', '2018-01-09'),
    ('paper3', 'conf', '2019-01-08'),
    ('paper4', 'conf', '2020-01-07'),
    ('paper5', 'conf', '2021-01-06'),
    ('paper6', 'conf', '2022-01-05'),
    ('paper7', 'conf', '2023-01-04'),
    ('paper8', 'conf', '2017-01-03'),
    ('paper9', 'conf', '2018-01-02'),
    ('paper10', 'conf', '2019-01-01'),
    ('paper11', 'conf', '2020-01-10'),
    ('paper12', 'conf', '2021-01-01'),
    ('paper13', 'conf', '2022-01-02'),
    ('paper14', 'conf', '2023-01-03'),
    ('paper15', 'conf', '2017-01-04'),
    ('paper16', 'conf', '2018-01-05'),
    ('paper17', 'conf', '2019-01-01'),
    ('paper18', 'conf', '2020-01-02'),
    ('paper19', 'conf', '2021-01-03'),
    ('paper20', 'conf', '2022-01-04'),
    ('paper21', 'conf', '2023-02-05'),
    ('paper22', 'conf', '2017-01-02'),
    ('paper23', 'conf', '2018-01-03'),
    ('paper24', 'conf', '2019-01-04'),
    ('paper25', 'conf', '2020-01-05'),
    ('paper26', 'conf', '2021-01-01'),
    ('paper27', 'conf', '2022-01-02'),
    ('paper28', 'conf', '2023-01-03'),
    ('paper29', 'conf', '2018-01-05'),
    ('paper30', 'conf', '2019-01-06');
`);

executeQuery(`
  INSERT INTO relation (paper_id, author_id)
  VALUES
    (1, 1), (1, 2), (1, 3),
    (2, 4), (2, 5), (2, 6), (2, 7),
    (3, 8), (3, 9), (3, 10), (3, 11), (3, 12), (3, 13),
    (4, 14), (4, 15),
    (5, 1), (5, 3), (5, 5), (5, 7), (5, 9),
    (6, 11), (6, 13), (6, 15), (6, 2),
    (7, 4), (7, 6),
    (8, 8), (8, 10), (8, 12), (8, 14), (8, 2),
    (9, 1), (9, 2),
    (10, 3), (10, 4), (10, 5),
    (11, 6), (11, 7), (11, 8),
    (12, 9), (12, 10), (12, 11), (12, 12),
    (13, 13), (13, 14), (13, 15), (13, 5),
    (14, 2), (14, 4), (14, 6), (14, 8), (14, 10),
    (15, 12), (15, 14), (15, 10),
    (16, 1), (16, 3), (16, 5), (16, 7),
    (17, 9), (17, 11), (17, 15),
    (18, 13), (18, 11), (18, 9),
    (19, 10), (19, 2), (19, 4), (19, 6), (19, 8),
    (20, 10), (20, 8), (20, 14), (20, 2), (20, 4),
    (21, 1), (21, 2),
    (22, 3), (22, 4), (22, 5), (22, 6), (22, 7),
    (23, 8), (23, 9), (23, 10),
    (24, 11),
    (25, 12), (25, 13), (25, 14), (25, 15),
    (26, 1), (26, 2), (26, 3),
    (27, 4), (27, 5), (27, 6), (27, 7),
    (28, 8), (28, 9), (28, 10),
    (29, 11),
    (30, 14);
`);

connection.end((err) => {
  if (err) {
    console.error("Error closing database connection:", err);
    return;
  }
  console.log("Connection closed");
});
