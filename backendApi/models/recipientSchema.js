import mongoose from "mongoose";
const bcrypt = require('bcryptjs');
const validator = require('validator')

const { Schema } = mongoose;

const recipientSchema = new Schema({
  fullName: { type: String, required: true },
  age: { 
    type: Number, required: true,
    validate(value){
      if(value < 0){
        throw new Error('Age must be a positive number')
      }
    }
  },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true, minlength: 11 },
  email:{
    type: String,
    required: true,
    unique:true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Email is invalid!')
      }
    }
  },
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
  address: { type: String, required: true },
  job: { type: String, required: true },
  surgeries: { type: Array, default: "None" },
  allergies: { type: String, default: "None" },
  familyHistory: { type: String, default: "None" },
  insuranceProvider: { type: String, default: "None" },
  policyNumber: { type: String, default: "None" },
  medicalCondition: { type: Array, default: "None" },
  image: { type: String, default: "None" },
  emergencyContact : [{
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phoneNumber: { type: String, required: true }
  }],
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

recipientSchema.pre('save', async function(next){
  const user = this
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})

module.exports = mongoose.model('Recipient', recipientSchema);

