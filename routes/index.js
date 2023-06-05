import { Router } from 'express';
import usersController from '../controllers/usersControllers';

const indexRoute = Router();
indexRoute.use(usersController);

export default indexRoute;
