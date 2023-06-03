import { Router } from "express";
const Article = require('../models/articleSchema')

const router = Router();

router.post('/', async (req, res) =>{
    const article = await Article.create(req.body);
    res.status(200).json({ article });
});

router.get('/', async (req, res) =>{
    const articles = await Article.find({isPublic: true});
    res.status(200).json({ articles });
});

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    const article = await Article.findById(id);
    res.status(200).json({ article });
})

router.put('/:id', async (req, res) =>{
    const { id } = req.params;
    const article = await Article.findOneAndUpdate(
        {
            _id: id,
        },
        req.body,
        {
        new: true,
        runValidators: true,
    });
    res.status(200).json({article});
})

router.delete('/:id', async (req, res) =>{
    Article.remove({_id: req.params.id});
    res.status(200).send('deleted');
})

module.exports = router;
