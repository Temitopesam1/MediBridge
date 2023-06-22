import authController from './auth';
const fs = require('fs');


const path = './Images/';


class ImageController{

    async postImage(req, res){
        const user = authController.authenticate(req);
        if (user){
            try{
                const localPath = `${path}/${uuidv4()}`;
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path, { recursive: true });
                }
                fs.writeFileSync(localPath, req.body);
                user.image = localPath;
                await user.save();
                return res.status(200).send('photo uploaded successfully');
            } catch(error){
                return res.status(500).send("Error in uploading image", error);
            }
        }
        return res.status(401).json({ error: 'Unauthorized' });
    }

    async getImage(req, res){
        const user = authController.authenticate(req);
        if (user){
            try{
                return res.status(200).send(fs.readFileSync(user.image));
            } catch(error){
                return res.status(500).send("Error in getting image", error);
            }
        }
        return res.status(401).json({ error: 'Unauthorized' });
    }

    async editImage(res, req){
        const user = authController.authenticate(req);
        if (user){
            try{
                fs.rmSync(user.image);
                const localPath = `${path}/${uuidv4()}`;
                fs.writeFileSync(localPath, req.body);
                user.image = localPath;
                await user.save();
                return res.status(200).send('photo uploaded successfully');
            } catch(error){
                return res.status(500).send("Error in updating image", error);
            }
        }
        return res.status(401).json({ error: 'Unauthorized' });
    }
}

const imageController = new ImageController();
export default imageController;