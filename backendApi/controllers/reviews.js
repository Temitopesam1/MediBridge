import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';

class Reviews{
    async createReview(req, res) {
        try {
          const { userId, doctorId, score } = req.body;
      
          // Save the rating in the Recipient model
          let user = await Recipient.findById(userId);
          user.ratings.push({ doctor: doctorId, score });
          await user.save();
      
          // Update the doctor's average rating
          const doctor = await Provider.findById(doctorId);

          // Check if the user has already rated the doctor
          user = await Recipient.findById(userId);
          const existingRatings = user.ratings.filter(rating => rating.doctor.toString() === doctorId);
          if (existingRatings.length > 1) {
            const ratings = existingRatings.map(rating => rating.score);
            doctor.averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
            await doctor.save();
            return res.status(200).json({ message: 'Review updated for this doctor.' });
          }
          doctor.averageRating = score;
          await doctor.save();
      
          return res.status(201).json({ message: 'Review submitted successfully.' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'An error occurred while submitting the review.' });
        }
    };
      
  
    // Get average rating for a doctor
    async getAverageRating(req, res) {
        try {
          const { id } = req.params;
      
          const doctor = await Provider.findById(id);
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