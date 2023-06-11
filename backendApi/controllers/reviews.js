import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';
class Reviews{
    async createReview(req, res) {
        try {
          const { userId, doctorId, score } = req.body;
      
          // Save the rating in the Recipient model
          const user = await Recipient.findById(userId);
          user.ratings.push({ doctor: doctorId, score });
          await user.save();
      
          // Update the doctor's average rating
          const doctor = await Provider.findById(doctorId);
          const ratings = user.ratings.find(rating => rating.doctor.toString() === doctorId);
          doctor.averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
          await doctor.save();
      
          return res.status(201).json({ message: 'Review submitted successfully.' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'An error occurred while submitting the review.' });
        }
    };
      
    // Get reviews for a doctor
    async getReview(req, res) {
        try {
          const { doctorId } = req.params;
      
          const doctor = await Provider.findById(doctorId);
          if (!doctor) {
            return res.status(404).json({ message: 'Provider not found.' });
          }
      
          const users = await Recipient.find({ 'ratings.doctor': doctorId });
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
    };
      
      // Get average rating for a doctor
    async getAverageRating(req, res) {
        try {
          const { doctorId } = req.params;
      
          const doctor = await Provider.findById(doctorId);
          if (!doctor) {
            return res.status(404).json({ message: 'Provider not found.' });
          }
      
          return res.status(200).json({ averageRating: doctor.averageRating });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'An error occurred while fetching the average rating.' });
        }
    };
      
}

const reviews = new Reviews();
export default reviews;