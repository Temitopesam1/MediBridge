import mongoose from "mongoose";
const { Schema } = mongoose;

const providerSchema = new Schema({
    'name': {type: String, required: true},
    'phone number': {Number, required: true, unique: true},
    'email': {type: String, required: true, unique: true},
    'gender': {type: String, required: true},
    'home address': {type: String, required: true},
    'license number': {type: String, required: true, unique: true},
    'specialization': {type: String, required: true},
    'practice address': {type: String, required},
}, { timestamps: true });

const provider = mongoose.model('provider', providerSchema);
export default provider;