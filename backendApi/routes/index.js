import { Router } from 'express';
import usersController from '../controllers/usersControllers';
import historyController from '../controllers/historyControllers';
import articleController from '../controllers/article';
import appointment from '../controllers/appointment';
import reviews from '../controllers/reviews';


const router = Router();
router.use(usersController);
router.use(historyController);
router.post('/article', articleController.uploadArticle);
router.get('/article/:id', articleController.getArticle);
router.get('/article', articleController.getArticles);
router.put('/article/:id', articleController.editArticle);
router.delete('/article/:id', articleController.deleteArticle);
router.get('/appointment', appointment.getAppointment);
router.post('/appointment', appointment.createAppointment);
router.post('/review', reviews.createReview);
router.get('/review/:id', reviews.getReview);
router.get('/review/average-rating', reviews.getAverageRating);

module.exports = router;
