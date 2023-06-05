import mongoose from "mongoose";
const { Schema } = mongoose;

const recipientSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true,  unique: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  isSmoking: { type: Boolean, required: true},
  isHypertensive: { type: Boolean, required: true},
  isDiabetic: { type: Boolean, required: true }
}, { timestamps: true });

const Recipient = mongoose.model('Recipient', recipientSchema);
export default Recipient;
