import mongoose from "mongoose";
const { Schema } = mongoose;

const providerSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: Number, required: true},
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  specialization: { type: String, required: true },
  department: { type: String, required: true },
  practiceAddress: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
  history: [{
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipient',
    },
    symptoms: { type: String, required: true },
    diagnosis: { type: String, required: true },
    notes: { type: String, required: true },
    prescriptions: { type: String, required: true }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Provider', providerSchema);
