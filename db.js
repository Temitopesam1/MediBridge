const mDF = require("mongoose-date-format");
const { Schema, model } = require('mongoose');

const appointmentSchema = new Schema({

  appointmentDate: {type: Date, default: new Date()},
  startTime: {type: Date, default: new Date()},
  endTime: {type: Date, default: new Date()},
  patientName: String,
  doctorName: String
});
appointmentSchema.plugin(mDF);
module.exports = model('Appointment', appointmentSchema);