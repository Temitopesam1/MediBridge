import { Router } from 'express';
import articleController from '../controllers/article';
import {isAlive} from '../utils/db';

const router = Router();

router.post('/article', articleController.uploadArticle);
router.get('/article/:id', articleController.getArticle);
router.get('/article', articleController.getArticles);
router.put('/article/:id', articleController.editArticle);
router.delete('/article/:id', articleController.deleteArticle);


module.exports = router;