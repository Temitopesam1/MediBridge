const Article = require('../models/articleSchema')

class ArticleController {
    async uploadArticle(req, res){
        try{
            const article = await Article.create(req.body);
            return res.status(201).json({ article });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ 'An error occurred while submitting article': error });
        }
    }
    
    async getArticles(req, res){
        try{
            const articles = await Article.find({isPublic: true});
            if(articles.length){
                return res.status(200).json({ articles });
            } else {
                return res.status(200).json({ message: 'No Article Pusblished Yet!'})
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ 'An error occurred while fetching Articles': error });
        }
    }
    
    async getArticle(req, res){
        try{
            const { id } = req.params;
            const article = await Article.findById(id);
            return res.status(200).json({ article });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ 'An error occurred while fetching Article': error });
        }
    }
    
    async editArticle(req, res){
        try{
            const { id } = req.params;
            const article = await Article.findOneAndUpdate(
                {
                    _id: id,
                },
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );
            return res.status(200).json({ message: 'Article Updated successfully!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ 'An error occurred while updating article': error });
        }
    }
    
    async deleteArticle(req, res){
        try{
            await Article.deleteOne({_id: req.params.id});
            return res.status(200).send('deleted');
        } catch (error) {
            console.error(error);
            return res.status(500).json({ 'An error occurred while deleting article': error });
        }
    }
}

const articleController = new ArticleController();
module.exports = articleController;
