import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  providerId: {type: mongoose.Types.ObjectId, required: true},
  recipientsId: {type: mongoose.Types.ObjectId, required: true},
  time: {type: Date, required: true},
  isConcluded: {type: Boolean, default: false},
  mode: { type: String, required: true}
}, { timestamps: true });

const Appointment = mongoose.model('Appointments', appointmentSchema);
export default Appointment;