import { Router } from 'express';
import usersController from '../controllers/usersControllers';
import articleController from '../controllers/article';
import appointment from '../controllers/appointment';
import reviews from '../controllers/reviews';
import authController from '../controllers/auth';
import historyContoller from '../controllers/historyControllers';
import imageController from '../controllers/image';


const router = Router();

router.post('/article', articleController.uploadArticle);
router.get('/article/:id', articleController.getArticle);
router.get('/article', articleController.getArticles);
router.put('/article/:id', articleController.editArticle);
router.delete('/article/:id', articleController.deleteArticle);
router.get('/appointment', appointment.bookAppointment);
router.post('/appointment', appointment.getAppointments);
router.post('/review', reviews.createReview);
router.post('/history/:id', historyContoller.postHistory);
router.get('/histories/:id', historyContoller.getHistory);
router.post('/user/', usersController.addUser);
router.put('/user/', usersController.editUser);
router.get('/user/', usersController.getUser);
router.get('/login/', authController.login),
router.get('/logout/', authController.logout);
router.post('/user/image', imageController.postImage);
router.put('/user/image', imageController.editImage);
router.get('/user/image/', imageController.getImage);
router.delete('/user/', usersController.deleteUser);

// req.oidc.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//     res.send(
//       req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
//     )
//   });
  
//   // The /profile route will show the user profile as JSON
//   app.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user, null, 2));
//});

module.exports = router;
