const mongoose = require("mongoose");
const LandModel = require("./model.js");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function fetchPopulationByYear(country) {
  try {
    const result = await LandModel.aggregate([
      { $match: { Country: country } },
      {
        $group: {
          _id: "$Year",
          countPopulation: { $sum: { $add: ["$M", "$F"] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const mapResult = result.map(({ _id, countPopulation }) => ({
      Year: _id,
      countPopulation,
    }));
    console.log(mapResult);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function fetchContinentInfoByYearAge(year, age) {
  try {
    const continents = [
      'AFRICA',
      'ASIA',
      'EUROPE',
      'LATIN AMERICA AND THE CARIBBEAN',
      'NORTHERN AMERICA',
      'OCEANIA',
    ];

    const query = [
      {
        $match: {
          $and: [
            { Country: { $in: continents } },
            { Age: age },
            { Year: year },
          ],
        },
      },
      {
        $addFields: {
          TotalPopulation: {
            $add: ['$M', '$F'],
          },
        },
      },
      { $sort: { Country: 1 } },
    ];

    const result = await LandModel.aggregate(query);
    console.log(result);
  } catch (error) {
    console.error('Error retrieving continent info');
    throw error;
  }
};

async function main() {
  try {
    await fetchPopulationByYear("Netherlands");
    await fetchContinentInfoByYearAge(2020, "100+");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

main();
