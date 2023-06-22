import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';
import redisClient from '../utils/redis';

class AuthController {
    async login(req, res) {
        const encodedBase64 = JSON.stringify(req.headers.authorization);
        const base64 = encodedBase64.split(' ')[1];
        const decodedBase64 = Buffer.from(base64, 'base64').toString('utf-8');
        const email = decodedBase64.split(':')[0];
        const password = decodedBase64.split(':')[1];
        let user = await Provider.findOne({ email, password: sha1(password) });
        if (!user) {
            user = await Recipient.findOne({ email, password: sha1(password) });
            if (!user){
                return res.status(401).json({ error: 'Unauthorized' });
            }
        }
        const token = uuidv4();
        const key = `auth_${token}`;
        await redisClient.set(key, user._id.toString(), 86400);
        return res.status(200).json({ token });
    }
    
    async logout(req, res) {
        const token = req.headers['x-token'];
        const key = `auth_${token}`;
        const userId = await redisClient.get(key);
        if (userId) {
            redisClient.del(key);
            return res.status(204).end();
        }
        return res.status(401).json({ error: 'Unauthorized' });
    }

    async authenticate(req) {
        const token = req.headers['x-token'];
        if (token) {
            const key = `auth_${token}`;
            let userId = await redisClient.get(key);
            if (userId) {
                let user = await Provider.findById(userId);
                if (!user){
                    user = await Recipient.findById(userId);
                    if (!user){
                        return null;
                    }
                }
                return user;
            }
        }
        return null;
    }
}
const authController = new AuthController();
export default authController;
