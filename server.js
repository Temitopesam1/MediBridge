// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create an instance of Express
const app = express();

// Set up MongoDB connection
mongoose.connect('mongodb://localhost:27017/Reviews', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the User and Doctor models
const userSchema = new mongoose.Schema({
  name: String,
  ratings: [{
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    score: {type: Number, default: 0}
  }],
});

const doctorSchema = new mongoose.Schema({
  name: String,
  averageRating: {type: Number, default: 0}
});

const User = mongoose.model('User', userSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);

// API endpoints

// Submit a review
app.post('/reviews', async (req, res) => {
  try {
    const { userId, doctorId, score } = req.body;

    // Check if the user has already rated the doctor
    const user = await User.findById(userId);
    const existingRating = user.ratings.find(rating => rating.doctor.toString() === doctorId);
    if (existingRating) {
      return res.status(400).json({ message: 'User has already rated this doctor.' });
    }

    // Save the rating in the User model
    user.ratings.push({ doctor: doctorId, score });
    await user.save();

    // Update the doctor's average rating
    const doctor = await Doctor.findById(doctorId);
    const ratings = user.ratings.map(rating => rating.score);
    doctor.averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    await doctor.save();

    return res.status(201).json({ message: 'Review submitted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while submitting the review.' });
  }
});

// Get reviews for a doctor
app.get('/reviews/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    const users = await User.find({ 'ratings.doctor': doctorId });
    const reviews = users.map(user => ({
      userId: user._id,
      name: user.name,
      score: user.ratings.find(rating => rating.doctor.toString() === doctorId).score,
    }));

    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching the reviews.' });
  }
});

// Get average rating for a doctor
app.get('/average-rating/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    return res.status(200).json({ averageRating: doctor.averageRating });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching the average rating.' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
