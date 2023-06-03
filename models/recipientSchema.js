import mongoose from "mongoose";
const { Schema } = mongoose;

const recipientSchema = new Schema({
    'name': {type: String, required: true},
    'age': {Number, required: true, unique: true},
    'gender': {type: String, required: true},
    'home address': {type: String, required},
    'phone number': {Number, required: true, unique: true},
    'email': {type: String, required: true, unique: true}
})

module.exports = mongoose.model('recipient', recipientSchema);