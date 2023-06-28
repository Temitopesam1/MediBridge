import mongoose from "mongoose";
const validator = require('validator')
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const providerSchema = new Schema({
  fullName: { type: String, required: true },
  age: { 
    type: Number, required: true,
    validate(value){
      if(value < 0){
        throw new Error('Age must be a positive number')
      }
    }
  },
  image: { type: String, default: "None" },
  charges: {type: String, required: true },
  phoneNumber: { type: String, required: true, minlength: 11},
  email: { type: String, required: true, unique: true },
  password: {
    type: String, required: true, trim: true, minlength: 7,
    validate(value){
      if(validator.isEmpty(value)){
        throw new Error('Please enter your password!')
      }else if(validator.equals(value.toLowerCase(),"password")){
        throw new Error('Password is invalid!')
      }else if(validator.contains(value.toLowerCase(), "password")){
        throw new Error('Password should not contain password!')
      }
    }
  },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  affiliation: { type: String, default: "None" },
  education: { type: String, required: true },
  experience: { type: String, default: "None" },
  biography: { type: String, default: "None" },
  availability: { type: String, required: true },
  acceptedInsurance: { type: String, default: "None" },
  languages: { type: Array, required: true },
  professionalMembership: { type: String, default: "None" },
  researchPublication: { type: String, default: "None" },
  specialty: { type: String, required: true },
  department: { type: String, required: true },
  officeAddress: { type: String, required: true },
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

providerSchema.pre('save', async function(next){
  const user = this
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})

module.exports = mongoose.model('Provider', providerSchema);

