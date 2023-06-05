import { Router } from 'express';
import recipientController from '../controllers/usersControllers';

const indexRoute = Router();
indexRoute.use(recipientController);

export default indexRoute;
