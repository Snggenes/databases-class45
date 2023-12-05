const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const accountSchema = new mongoose.Schema({
  account_number: { type: Number, required: true, unique: true },
  balance: { type: Number, required: true },
});

const Accounts = mongoose.model("Account", accountSchema);

const accountChangesSchema = new mongoose.Schema({
  change_number: { type: Number, required: true, unique: true },
  account_number: { type: Number, required: true },
  amount: { type: Number, required: true },
  changed_date: { type: String, required: true },
  remark: { type: String, required: true },
});

const AccountChanges = mongoose.model("AccountChanges", accountChangesSchema);

module.exports = { Accounts, AccountChanges };
