const mongoose = require("mongoose");
const { Accounts, AccountChanges } = require("./models");

async function clearCollections() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Accounts.deleteMany({});
    await AccountChanges.deleteMany({});

    console.log("Deleted");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

clearCollections();