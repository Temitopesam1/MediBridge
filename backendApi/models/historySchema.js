import mongoose from "mongoose";
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipient',
  },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  notes: { type: String, required: true },
  prescriptions: { type: String, required: true }
}, { timestamps: true });

const Appointment = mongoose.model('Appointments', appointmentSchema);
export default Appointment;