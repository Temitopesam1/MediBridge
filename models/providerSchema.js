import mongoose from "mongoose";
const { Schema } = mongoose;

const providerSchema = new Schema({
  name: {type: String, required: true},
  phoneNumber: {type: Number, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  gender: {type: String, required: true},
  homeAddress: {type: String, required: true},
  licenseNumber: {type: String, required: true, unique: true},
  specialization: {type: String, required: true},
  practiceAddress: {type: String, required: true},
}, { timestamps: true });

const Provider = mongoose.model('Provider', providerSchema);
export default Provider;