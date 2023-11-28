function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}

// This is the code that is given to us.
// Lets say i wrote in the name field "'; DROP TABLE country --"
// Template literals makes the code vulnerable.
// We should use parameterized queries instead and they are helping you escape
// character that could harm your query. (?? - for columns , ? - for values)

// New code
function getPopulation(Country, name, code, cb) {
    const query = 'SELECT Population FROM ?? WHERE Name = ? AND code = ?';
    const values = [Country, name, code]

    conn.query(query, values, cb);
}

// conn.query(queryString, values, function (err, result) {
  // Callback function handling the results or errors
//}); this is the syntax of query function. it has 3 params.

