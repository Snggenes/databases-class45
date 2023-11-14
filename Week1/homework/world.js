const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});
connection.connect();

connection.query(
  "select Name from country where Population > 8000000;",
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
connection.query(
  "select Name from country where name like '%land%'",
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
connection.query(
  "select Name from city where population between 500000 and 1000000",
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
connection.query(
  "select Name from country where Continent = 'Europe'",
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
connection.query(
  "select Name, SurfaceArea from country order by Surfacearea desc",
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
connection.query(
  "select name from city where CountryCode = 'NLD'",
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
connection.query(
  "select Population from city where Name = 'Rotterdam'",
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
connection.query(
  "select Name, SurfaceArea from country order by SurfaceArea desc limit 10",
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
connection.query(
  "select Name, Population from city order by Population desc limit 10",
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
connection.query("select sum(Population) from country", (error, result) => {
  if (error) throw error;
  console.log(result);
});

connection.end();
