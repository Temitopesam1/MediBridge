import mongoose from "mongoose";
const { Schema } = mongoose;

const recipientSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true, unique: true},
    gender: {type: String, required: true},
    home_address: {type: String, required: true},
    phone_number: {type: Number, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    ratings: [{
        doctor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Provider',
          required: true,
        },
        score: {type: Number, default: 0}
    }],
});

module.exports = mongoose.model('Recipient', recipientSchema);