import { Router } from 'express';
import usersController from '../controllers/usersControllers';
import historyController from '../controllers/historyControllers';

const indexRoute = Router();

indexRoute.use(usersController);
indexRoute.use(historyController);

export default indexRoute;
