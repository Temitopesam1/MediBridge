const Article = require('../models/articleSchema')

class ArticleController {
    async uploadArticle(req, res){
        const article = await Article.create(req.body);
        res.status(200).json({ article });
    }
    
    async getArticles(req, res){
        const articles = await Article.find({isPublic: true});
        res.status(200).json({ articles });
    }
    
    async getArticle(req, res){
        const { id } = req.params;
        const article = await Article.findById(id);
        res.status(200).json({ article });
    }
    
    async editArticle(req, res){
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
    }
    
    async deleteArticle(req, res){
        Article.remove({_id: req.params.id});
        res.status(200).send('deleted');
    }
}

const articleController = new ArticleController();
module.exports = articleController;
