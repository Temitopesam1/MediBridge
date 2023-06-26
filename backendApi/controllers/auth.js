import Recipient from '../models/recipientSchema';
import Provider from '../models/providerSchema';
import njwt from 'njwt';
require('dotenv').config();
const bcrypt = require('bcryptjs');


const { APP_SECRET } = process.env;
let user;

function encodeToken(tokenData) {
    return njwt.create(tokenData, APP_SECRET).compact();
}

function decodeToken(token) {
    return njwt.verify(token, APP_SECRET).body;
}

class AuthController {

    // This express middleware attaches `userId` to the `req` object if a user is
    // authenticated. This middleware expects a JWT token to be stored in the
    // `Access-Token` header.
    async jwtAuthenticationMiddleware(req, res, next){
        const token = req.header('Access-Token');
        if (!token || token.split(' ')[0] !== 'Bearer') {
            return next();
        }
        try {
            const decoded = decodeToken(token.split(' ')[1]);
            const { userId } = decoded;
  
            let user = await Provider.findById(userId);
            if (!user){
                user = await Recipient.findById(userId);
                if (!user){
                    req.userId = null;
                }
            }
            req.userId = userId;
        } catch (e) {
            return next();
        }
        next();
    };

    // This middleware stops the request if a user is not authenticated.
    async isAuthenticatedMiddleware(req, res, next) {
        if (req.userId) {
            return next();
        }
        return res.status(401).json({ error: 'User not authenticated' });
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

    // These endpoints generates and returns a JWT access token given authentication data.
    async addUser(req, res){
        if (req.body.provider){
            try {
                user = new Provider(req.body);
                await user.save();
            } catch(error){
                console.log(error.message);
                return res.status(400).json({ 'Error saving user': error })
            }
        } else {
            try{
                user = new Recipient(req.body);
                await user.save();
                console.log(user);
            } catch(error){
                console.log(error);
                return res.status(400).json({ 'Error saving user': error })
            }
        }
        try{
            const accessToken = encodeToken({ userId: user.id });
            return res.status(201).json({ message:"User Created!", accessToken });
        } catch(error){
            console.log(error);
            return res.status(500).send("Not connected!");
        }
    }

    
    async login(req, res) {
        const encodedBase64 = JSON.stringify(req.headers.authorization);
        if(encodedBase64.split(' ')[0] !== '"Basic'){
          return res.status(500).json({ error: "server couldn't process authentication" })
        }
        const base64 = encodedBase64.split(' ')[1];
        const decodedBase64 = Buffer.from(base64, 'base64').toString('utf-8');
        const [email, password] = decodedBase64.split(':');

        let user = await Provider.findOne({ email });
        if (!user) {
            user = await Recipient.findOne({ email });
            if (!user){
                return res.status(401).json({ error: 'Invalid Email or Password' });
            }
        }
        const isMatch = await bcrypt.compare(password.split('\n')[0], user.password);
        if(!isMatch){
            return res.status(401).json({ error: 'Invalid Email or Password' });
        }
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
        return res.status(200).json({ userId: req.userId });
    }
}
const authController = new AuthController();
module.exports = authController;
