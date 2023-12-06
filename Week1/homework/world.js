const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});
connection.connect();

function executeQuery(query) {
  connection.query(query, (error, result) => {
    if (error) {
      console.error(`Error: ${query}`);
      throw error;
    }
    console.log(result);
  });
}

const query1 = "select Name from country where Population > 8000000";
const query2 = "select Name from country where name like '%land%'";
const query3 =
  "select Name from city where population between 500000 and 1000000";
const query4 = "select Name from country where Continent = 'Europe'";
const query5 =
  "select Name, SurfaceArea from country order by Surfacearea desc";
const query6 = "select name from city where CountryCode = 'NLD'";
const query7 = "select Population from city where Name = 'Rotterdam'";
const query8 =
  "select Name, SurfaceArea from country order by SurfaceArea desc limit 10";
const query9 =
  "select Name, Population from city order by Population desc limit 10";
const query10 = "select sum(Population) from country";

executeQuery(query1);
executeQuery(query2);
executeQuery(query3);
executeQuery(query4);
executeQuery(query5);
executeQuery(query6);
executeQuery(query7);
executeQuery(query8);
executeQuery(query9);
executeQuery(query10);

connection.end();
