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
  insert into authors (author_name, university, date_of_birth, h_index, gender, mentor)
  values ('a1', 'u1', '2000-1-1', 95, 'male', null),
          ('a2', 'u2', '2001-1-2', 90, 'female', 1),
          ('a3', 'u3', '2002-1-3', 85, 'male', 2),
          ('a4', 'u4', '2003-1-4', 80, 'female', 3),
          ('a5', 'u5', '2004-1-5', 75, 'male', 4),
          ('a6', 'u1', '2005-1-6', 70, 'female', 5),
          ('a7', 'u2', '2006-1-7', 65, 'male', 1),
          ('a8', 'u3', '2007-1-8', 60, 'female', 2),
          ('a9', 'u4', '2008-1-9', 55, 'male', 3),
          ('a10', 'u5', '1999-1-10', 50, 'female', 4),
          ('a11', 'u1', '1998-1-11', 45, 'male', 5),
          ('a12', 'u2', '1997-1-12', 40, 'female', 1),
          ('a13', 'u3', '1996-1-13', 35, 'male', 2),
          ('a14', 'u4', '1995-1-14', 30, 'female', 3),
          ('a15', 'u5', '1994-1-15', 25, 'male', 4);
    `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  `
    insert into research_Papers (paper_title, conference, publish_date)
    values ('paper1', 'conf', '2017-1-10'),
            ('paper2', 'conf', '2018-1-9'),
            ('paper3', 'conf', '2019-1-8'),
            ('paper4', 'conf', '2020-1-7'),
            ('paper5', 'conf', '2021-1-6'),
            ('paper6', 'conf', '2022-1-5'),
            ('paper7', 'conf', '2023-1-4'),
            ('paper8', 'conf', '2017-1-3'),
            ('paper9', 'conf', '2018-1-2'),
            ('paper10', 'conf', '2019-1-1'),
            ('paper11', 'conf', '2020-1-10'),
            ('paper12', 'conf', '2021-1-1'),
            ('paper13', 'conf', '2022-1-2'),
            ('paper14', 'conf', '2023-1-3'),
            ('paper15', 'conf', '2017-1-4'),
            ('paper16', 'conf', '2018-1-5'),
            ('paper17', 'conf', '2019-1-1'),
            ('paper18', 'conf', '2020-1-2'),
            ('paper19', 'conf', '2021-1-3'),
            ('paper20', 'conf', '2022-1-4'),
            ('paper21', 'conf', '2023-2-5'),
            ('paper22', 'conf', '2017-1-2'),
            ('paper23', 'conf', '2018-1-3'),
            ('paper24', 'conf', '2019-1-4'),
            ('paper25', 'conf', '2020-1-5'),
            ('paper26', 'conf', '2021-1-1'),
            ('paper27', 'conf', '2022-1-2'),
            ('paper28', 'conf', '2023-1-3'),
            ('paper29', 'conf', '2017-1-4'),
            ('paper30', 'conf', '2018-1-5');
            
      `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.query(
  `
    insert into relation (paper_id, author_id)
    values (1,1),(1,2),(1,3),
            (2,4),(2,5),(2,6),(2,7),
            (3,8),(3,9),(3,10),(3,11),(3,12),(3,13),
            (4,14),(4,15),
            (5,1),(5,3),(5,5),(5,7),(5,9),
            (6,11),(6,13),(6,15),(6,2),
            (7,4),(7,6),
            (8,8),(8,10),(8,12),(8,14),(8,2),
            (9,1),(9,2),
            (10,3),(10,4),(10,5),
            (11,6),(11,7),(11,8),
            (12,9),(12,10),(12,11),(12,12),
            (13,13),(13,14),(13,15),(13,5),
            (14,2),(14,4),(14,6),(14,8),(14,10),
            (15,12),(15,14),(15,10),
            (16,1),(16,3),(16,5),(16,7),
            (17,9),(17,11),(17,15),
            (18,13),(18,11),(18,9),
            (19,10),(19,2),(19,4),(19,6),(19,8),
            (20,10),(20,8),(20,14),(20,2),(20,4),
            (21,1),(21,2),
            (22,3),(22,4),(22,5),(22,6),(22,7),
            (23,8),(23,9),(23,10),
            (24,11),
            (25,12),(25,13),(25,14),(25,15),
            (26,1),(26,2),(26,3),
            (27,4),(27,5),(27,6),(27,7),
            (28,8),(28,9),(28,10),
            (29,11),(29,12),(29,13),
            (30,14),(30,15);
            
              
        `,
  (error, results, fields) => {
    if (error) throw error;
    console.log(results);
  }
);

connection.end();
