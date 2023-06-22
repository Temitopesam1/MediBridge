import { Router } from 'express';
import usersController from '../controllers/usersControllers';
import articleController from '../controllers/article';
import appointment from '../controllers/appointment';
import reviews from '../controllers/reviews';
import authController from '../controllers/auth';
import historyContoller from '../controllers/historyControllers';
import goalsController from '../controllers/goalControllers';


const router = Router();

router.post('/article', articleController.uploadArticle);
router.get('/article/:id', articleController.getArticle);
router.get('/article', articleController.getArticles);
router.put('/article/:id', articleController.editArticle);
router.delete('/article/:id', articleController.deleteArticle);

router.get('/appointment', appointment.bookAppointment);
router.post('/appointment', appointment.getAppointments);

router.post('/review', reviews.createReview);
router.get('/review/:id', reviews.getAverageRating);

router.post('/history/:id', historyContoller.postHistory);
router.get('/histories/:id', historyContoller.getHistory);

router.post('/user/', usersController.addUser);
router.put('/user/', usersController.editUser);
router.get('/user/', usersController.getUser);
router.delete('/user/', usersController.deleteUser);

router.get('/login/', authController.login),
router.get('/logout/', authController.logout);

router.post('/user/healthgoals', goalsController.addGoal);
router.put('/user/healthgoals/:id', goalsController.editGoals);
router.delete('/user/healthgoals/:id', goalsController.deleteGoals);

module.exports = router;
