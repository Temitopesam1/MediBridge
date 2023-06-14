import { Router } from 'express';
import usersController from '../controllers/usersControllers';
import articleController from '../controllers/article';
import appointment from '../controllers/appointment';
import reviews from '../controllers/reviews';
import historyContoller from '../controllers/historyControllers';


const router = Router();

router.post('/article', articleController.uploadArticle);
router.get('/article/:id', articleController.getArticle);
router.get('/article', articleController.getArticles);
router.put('/article/:id', articleController.editArticle);
router.delete('/article/:id', articleController.deleteArticle);
router.get('/appointment', appointment.getAppointment);
router.post('/appointment', appointment.createAppointment);
router.post('/review', reviews.createReview);
router.get('/review/:id', reviews.getAverageRating);
router.post('/history/:id', historyContoller.postHistory);
router.get('/histories/:id', historyContoller.getHistory);
router.post('/users/recipients', usersController.postRecipient);
router.post('/users/providers', usersController.postProvider);
router.get('/users/recipients', usersController.getRecipients);
router.get('/users/providers', usersController.getProviders);
router.get('/users/recipients/:id', usersController.getRecipient);
router.get('/users/providers/:id', usersController.getProvider);
router.put('/users/recipients/:id', usersController.editRecipient);
router.put('/users/providers/:id', usersController.editProvider);
router.delete('/users/recipients/:id', usersController.deleteRecipient);
router.delete('/users/providers/:id', usersController.deleteProvider);

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
