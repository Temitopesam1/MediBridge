import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';
import njwt from 'njwt';
require('dotenv').config();
import bcrypt from 'bcryptjs';

const { APP_SECRET } = process.env;


function encodeToken(tokenData) {
    const jwt = njwt.create(tokenData, APP_SECRET, 'HS512').compact();
    jwt.setExpiration(new Date().getTime() + (60*60*2000));
    console.log(jwt);
    return jwt
}

function decodeToken(token) {
    return njwt.verify(token, APP_SECRET, 'HS512').body;
}

class AuthController {

    // This express middleware attaches `userId` to the `req` object if a user is
    // authenticated. This middleware expects a JWT token to be stored in the
    // `Access-Token` header.
    async jwtAuthenticationMiddleware(req, res, next){
        const token = req.header('Access-Token');
        if (!token) {
            return next();
        }
  
        try {
            const decoded = decodeToken(token);
            const { userId } = decoded;
  
            let user = await Provider.findById(userId);
            if (!user){
                user = await Recipient.findById(userId);
                if (!user){
                    return null;
                }
            }
            req.userId = userId;
        } catch (e) {
            return next();
        }
        next();
    };

    // This middleware stops the request if a user is not authenticated.
    isAuthenticatedMiddleware(req, res, next) {
        if (req.userId) {
            return next();
        }
        return res.status(401).json({ error: 'User not authenticated' });
    }

    // This endpoint generates and returns a JWT access token given authentication
    // data.
    async login(req, res) {
        const encodedBase64 = JSON.stringify(req.headers.authorization);
        const base64 = encodedBase64.split(' ')[1];
        const decodedBase64 = Buffer.from(base64, 'base64').toString('utf-8');
        const email = decodedBase64.split(':')[0];
        const password = decodedBase64.split(':')[1];
        let user = await Provider.findOne({ email });
        if (!user) {
            user = await Recipient.findOne({ email });
            if (!user){
                return res.status(401).json({ error: 'Invalid Email or Password' });
            }
        }
        // const isMatch = await bcrypt.compare(password, user.password);
        // if(!isMatch){
        //     console.log(password, user.password);
        //     return res.status(401).json({ error: 'Invalid Email or Password' });
        // }
        try{
            const accessToken = encodeToken({ userId: user.id });
            return res.status(200).json({ accessToken });
        } catch(error){
            console.log(error);
            return res.status(500).send("Not connected!");
        }        
    }
    
    async logout(req, res) {
        req.userId = false;
        req.session.destroy();
        return res.status(204).end();
    }

    async authenticate(req) {
        if (req.userId){
            let user = await Provider.findById(req.userId);
            if (!user){
                user = await Recipient.findById(req.userId);
                if (!user){
                    return null;
                }
            }
            return user;
        }
        return null;
    }
}
const authController = new AuthController();
export default authController;
