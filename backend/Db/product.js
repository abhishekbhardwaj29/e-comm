const mongoose = require('mongoose');

const prdouctSch = new mongoose.Schema({
  name: String,
  price : String,
  category: String,
  userId: String,
  company: String
})

module.exports = mongoose.model("Products",prdouctSch,"Products")