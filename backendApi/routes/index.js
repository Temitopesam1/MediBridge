import { Router } from 'express';
import usersController from '../controllers/usersControllers';
import articleController from '../controllers/article';
import appointment from '../controllers/appointment';
import reviews from '../controllers/reviews';
import authController from '../controllers/auth';
import historyContoller from '../controllers/historyControllers';
import goalsController from '../controllers/goalControllers';
import imageController from '../controllers/image';


const router = Router();

router.delete('/article/:id', articleController.deleteArticle);
router.get('/article/:id', articleController.getArticle);
router.put('/article/:id', articleController.editArticle);
router.get('/article', articleController.getArticles);
router.post('/article', articleController.uploadArticle);

router.get('/appointment', appointment.bookAppointment);
router.post('/appointment', appointment.getAppointments);
router.delete('/appointment', appointment.deleteAppointment);

router.get('/review/:id', reviews.getAverageRating);
router.post('/review', reviews.createReview);
router.post('/review', reviews.createReview);

router.post('/history/:id', historyContoller.postHistory);
router.get('/histories/:id', historyContoller.getHistory);

router.post('/user/', usersController.addUser);
router.put('/user/', usersController.editUser);
router.get('/user/', usersController.getUser);
router.delete('/user/', usersController.deleteUser);

router.post('/history/', historyContoller.postHistory);
router.post('/user/', usersController.addUser);
router.put('/user/', usersController.editUser);
router.get('/user/', usersController.getUser);
router.get('/login/', authController.login),
router.get('/logout/', authController.logout);

router.post('/user/image', imageController.postImage);
router.put('/user/image', imageController.editImage);
router.get('/user/image/', imageController.getImage);

router.get('/login/', authController.login),
router.get('/logout/', authController.logout);

router.post('/user/healthgoals', goalsController.addGoal);
router.put('/user/healthgoals/:id', goalsController.editGoals);
router.delete('/user/healthgoals/:id', goalsController.deleteGoals);

module.exports = router;
