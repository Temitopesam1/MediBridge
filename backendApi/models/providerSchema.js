import mongoose from "mongoose";
const { Schema } = mongoose;

const providerSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  image: {type: String, required: true },
  charges: {type: String, required: true },
  phoneNumber: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  specialization: { type: String, required: true },
  department: { type: String, required: true },
  practiceAddress: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  appointments: [{
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipient',
      required: true
    },
    summary: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    startTime: {type: String, required: true},
    endTime: {type: String, required: true},
    attendees: {type: String, required: true},
    createdAt: { type: Date, default: Date.now }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Provider', providerSchema);

