const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    name: String,
    ratings: [{
      doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
      },
      score: {type: Number, default: 0}
    }],
});

module.exports = mongoose.model('Recipient', recipientSchema);