import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  recipientEmail: { type: String, required: true },
  recipientName: { type: String, required: true },
  providerEmail: { type: String, required: true },
  providerName: { type: String, required: true },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  notes: { type: String, required: true },
  prescriptions: { type: String, required: true }
}, { timestamps: true });

const Appointment = mongoose.model('Appointments', appointmentSchema);
export default Appointment;