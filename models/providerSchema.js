const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    name: String,
    averageRating: {type: Number, default: 0}
});
  
module.exports = mongoose.model('Provider', providerSchema);