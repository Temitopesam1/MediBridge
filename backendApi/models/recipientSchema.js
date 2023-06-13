import mongoose from "mongoose";
const { Schema } = mongoose;

const recipientSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  isSmoking: { type: Boolean, required: true},
  isHypertensive: { type: Boolean, required: true},
  isDiabetic: { type: Boolean, required: true },
  history: [{
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
    },
    symptoms: String,
    diagnosis: String,
    notes: String,
    prescriptions: String,
    createdAt: { type: Date, default: Date.now }
  }],
  ratings: [{
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
    },
    score: {type: Number, default: 0}
  }],

}, { timestamps: true });

module.exports = mongoose.model('Recipient', recipientSchema);