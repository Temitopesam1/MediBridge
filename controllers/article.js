import { Router } from "express";

const router = Router();

router.get('/articles', (req, res){

    res.status(200).json({ 'articles': });
})
