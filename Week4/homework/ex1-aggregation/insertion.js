const LandModel = require("./model.js");
const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function dataInsertion() {
  const csvFile = fs.createReadcsvFile("population_pyramid_1950-2022.csv").pipe(csv());
  const insertionPromises = [];

  for await (const row of csvFile) {
    row.Year = parseInt(row.Year);
    row.M = parseInt(row.M);
    row.F = parseInt(row.F);

    const document = new LandModel(row);

    insertionPromises.push(document.save());
  }

  try {
    await Promise.all(insertionPromises);
    console.log(
      "Inserted succesfully"
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

dataInsertion();
