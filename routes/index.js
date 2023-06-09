import { Router } from 'express';
import handleConnection from "../controllers/Chat";

const router = Router();

router.use(handleConnection);

module.exports = router
