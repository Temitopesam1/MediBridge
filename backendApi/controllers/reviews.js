import Provider from '../models/providerSchema';

class Reviews{
  
    async createReview(req, res) {
      const user = authController.authenticate(req);
      if (user){
        try {
          const { doctorId, score } = req.body;
      
          // Save the rating in the Recipient model
          user.ratings.push({ doctor: doctorId, score });
          await user.save();
      
          // Update the doctor's average rating
          const doctor = await Provider.findById(doctorId);

          // Check if the user has already rated the doctor
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
      }
      return res.status(401).json({ error: 'Unauthorized' });
    }; 
}

const reviews = new Reviews();
export default reviews;