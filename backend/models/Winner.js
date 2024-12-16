const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const winnerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  prize: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: true
  },
  congratulation: {
    type: String,
    required: true
  },
});

const Winner = mongoose.model('Winner', winnerSchema);

module.exports = Winner;
