const mongoose = require("mongoose");
const { Accounts } = require("./models");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function transfer(fromAccountNumber, toAccountNumber, amount, remark) {
  try {
    const fromAccount = await Accounts.findOne({
      account_number: fromAccountNumber,
    });
    const toAccount = await Accounts.findOne({
      account_number: toAccountNumber,
    });

    if (fromAccount.balance < amount) {
      throw new Error("Insufficient funds in the 'from' account.");
    }

    const fromChangeNumber = fromAccount.latest_change_number + 1;
    const toChangeNumber = toAccount.latest_change_number + 1;

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    fromAccount.account_changes.push({
      change_number: fromChangeNumber,
      amount: -amount,
      changed_date: new Date(),
      remark,
    });

    toAccount.account_changes.push({
      change_number: toChangeNumber,
      amount,
      changed_date: new Date(),
      remark,
    });

    fromAccount.latest_change_number = fromChangeNumber;
    toAccount.latest_change_number = toChangeNumber;

    await fromAccount.save();
    await toAccount.save();

    console.log(
      `Transfer successful: ${amount} from account ${fromAccountNumber} to ${toAccountNumber}`
    );
  } catch (error) {
    console.error("Transfer failed:", error.message);
  }
}

async function testTransfer() {
  await transfer(101, 102, 1000, "Transfer from account 101 to 102");
}

async function run() {
  try {
    await testTransfer();
  } catch (error) {
    console.error("Error during test:", error);
  } finally {
    mongoose.connection.close();
  }
}

run();
