const mongoose = require("mongoose");
const { Accounts, AccountChanges } = require("./models");


async function insertData() {
  const accounts = await Accounts.insertMany([
    { account_number: 101, balance: 2000 },
    { account_number: 102, balance: 2500 },
    { account_number: 103, balance: 3000 },
    { account_number: 104, balance: 3500 },
    { account_number: 105, balance: 4000 },
  ]);

  console.log("Inserted accounts:", accounts);
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
