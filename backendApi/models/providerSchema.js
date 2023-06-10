import mongoose from "mongoose";
const { Schema } = mongoose;

const providerSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, unique: true },
  phoneNumber: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  specializationDepartment: { type: String, required: true },
  practiceAddress: { type: String, required: true }
}, { timestamps: true });

const Provider = mongoose.model('Provider', providerSchema);
export default Provider;

// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const providerSchema = new Schema({
//     name: {type: String, required: true},
//     phone_number: {type: Number, required: true, unique: true},
//     email: {type: String, required: true, unique: true},
//     gender: {type: String, required: true},
//     home_address: {type: String, required: true},
//     license_number: {type: String, required: true, unique: true},
//     specialization: {type: String, required: true},
//     practice_address: {type: String, required: true},
//     averageRating: {type: Number, default: 0}
// });
  
// module.exports = mongoose.model('Provider', providerSchema);
