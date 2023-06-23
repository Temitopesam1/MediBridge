import mongoose from "mongoose";
const { Schema } = mongoose;

const recipientSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: {type: String, required: true },
  isSmoking: { type: Boolean, required: true},
  isHypertensive: { type: Boolean, required: true},
  isDiabetic: { type: Boolean, required: true },
  image: { type: String },
  history: [{
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
    },
    symptoms: {type: String, required: true},
    diagnosis: {type: String, required: true},
    notes: {type: String, required: true},
    prescriptions: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
  }],
  ratings: [{
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
    },
    score: {type: Number, default: 0}
  }],
  appointments: [{
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
    },
    summary: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    attendees: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  healthGoals: [{
    goal: { type: String, required: true },
    days: { type: Number, default: 0 }
  }],

}, { timestamps: true });

module.exports = mongoose.model('Recipient', recipientSchema);

