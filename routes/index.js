import { Router } from 'express';
import articleController from '../controllers/article';
import {isAlive} from '../utils/db';

const router = Router();

router.post('/article', articleController.uploadArticle);
router.get('/article/:id', articleController.getArticle);
router.get('/article', articleController.getArticles);
router.put('/article/:id', articleController.editArticle);
router.delete('/article/:id', articleController.deleteArticle);
router.get('/status', (req, res)=>{
    if(isAlive){
        res.status(200).send('database connected');
    }
    res.status(400).send('error connecting');
});


module.exports = router;