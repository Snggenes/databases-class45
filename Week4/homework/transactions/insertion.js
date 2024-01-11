const mongoose = require("mongoose");
const { Accounts } = require("./models");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function insertData() {
  try {
    await Accounts.deleteMany({});

    const sampleAccounts = [
      { account_number: 101, balance: 10000, account_changes: [] },
      { account_number: 102, balance: 2000, account_changes: [] },
      { account_number: 103, balance: 1500, account_changes: [] },
      { account_number: 104, balance: 3000, account_changes: [] },
    ];

    const accounts = await Accounts.insertMany(sampleAccounts);
    console.log("Inserted accounts:", accounts);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

async function run() {
  try {
    await insertData();
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
}

run();
