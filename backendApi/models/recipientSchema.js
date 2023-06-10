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

// import mongoose from "mongoose";
// const { Schema } = mongoose;

// const recipientSchema = new Schema({
//     name: {type: String, required: true},
//     age: {type: Number, required: true, unique: true},
//     gender: {type: String, required: true},
//     home_address: {type: String, required: true},
//     phone_number: {type: Number, required: true, unique: true},
//     email: {type: String, required: true, unique: true},
//     ratings: [{
//         doctor: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Provider',
//           required: true,
//         },
//         score: {type: Number, default: 0}
//     }],
// });

// module.exports = mongoose.model('Recipient', recipientSchema);
