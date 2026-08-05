require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Alphabet = require("../models/Alphabet");
const NumberItem = require("../models/NumberItem");
const Word = require("../models/Word");
const { alphabets, numbers, words } = require("./seedData");

const run = async () => {
  await connectDB();

  await Alphabet.deleteMany();
  await NumberItem.deleteMany();
  await Word.deleteMany();

  await Alphabet.insertMany(alphabets);
  await NumberItem.insertMany(numbers);
  await Word.insertMany(words);

  console.log("Seed data inserted successfully!");
  mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
