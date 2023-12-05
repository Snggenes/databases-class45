const mongoose = require("mongoose");
const { Accounts, AccountChanges } = require("./models");

async function transferSession() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      await Accounts.updateOne(
        { account_number: 101 },
        { $inc: { balance: -1000 } }
      );

      await Accounts.updateOne(
        { account_number: 102 },
        { $inc: { balance: 1000 } }
      );

      const changes = await AccountChanges.insertMany([
        {
          change_number: 1,
          account_number: 101,
          amount: -1000,
          changed_date: "2023-11-27",
          remark: "to account 102",
        },
        {
          change_number: 2,
          account_number: 102,
          amount: 1000,
          changed_date: "2023-11-27",
          remark: "from account 101",
        },
      ]);

      console.log("Inserted changes:", changes);
    });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

transferSession();