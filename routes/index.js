import { Router } from 'express';
import router from '../controllers/article';
const router = Router();

router.use(router);

module.exports = router;