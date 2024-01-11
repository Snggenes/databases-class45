const mongoose = require("mongoose");

const accountChangeSchema = new mongoose.Schema({
  change_number: { type: Number, required: true },
  amount: { type: Number, required: true },
  changed_date: { type: Date, default: Date.now },
  remark: { type: String },
});

const accountSchema = new mongoose.Schema({
  account_number: { type: Number, required: true, unique: true },
  balance: { type: Number, required: true },
  latest_change_number: { type: Number, default: 0 },
  account_changes: { type: [accountChangeSchema], default: [] },
});

const Accounts = mongoose.model("Account", accountSchema);

module.exports = { Accounts };
