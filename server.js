const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
import Appointment from './db';


const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
const port = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost/appointments', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a new appointment
app.post('/appointments', async(req, res) => {
    const appointment = await Appointment.create(req.body);
    if(appointment){
        return res.status(201).json({ message: 'Appointment created successfully' });
    }
    return res.status(500).json({ error: 'An error occurred while creating the appointment' });
});
  
// Retrieve all appointments
app.get('/appointments', async(req, res) => {
    const appointment = await Appointment.find()
    if(appointment){
        return res.status(200).json(appointment);
    }
    return res.status(500).json({ error: 'An error occurred while retrieving appointments' });
});
  
// Cancel an appointment
app.delete('/appointments/:id', (req, res) => {
    const appointmentId = req.params;
    const appointment = Appointment.findByIdAndRemove({_id: appointmentId});
    if(appointment){
        return res.status(200).json({ message: 'Appointment cancelled successfully' });
    }
    return res.status(500).json({ error: 'An error occurred while cancelling appointment' });
});
  

app.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});