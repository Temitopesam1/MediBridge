import { Router } from 'express';
import reviews from '../controllers/Reviews';

const router = Router();

router.post('/review', reviews.createReview);
router.get('/review/:id', reviews.getReview);
router.get('/review/average-rating', reviews.getAverageRating);

module.exports = router;