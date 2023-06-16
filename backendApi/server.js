require('dotenv').config();
const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const bodyparser = require('body-parser');
import router from './routes/index';
import connectDB from './utils/db';
import cors from 'cors';

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://172.23.224.1:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
connectDB();
app.use('/medibridge/', router);

const port = process.env.PORT || 3000;
const ipAddress = '0.0.0.0'


const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER,
  secret: process.env.SECRET
};

// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));




// app.get('/', (req, res) => {
//   console.log('Getting home page');
//   res.status(200).json({ message: 'Welcome to MediBridge, Your Trusted Health companion\'s API' });
// })
// app.use((req, res, next) => {
//   console.log('Redirecting to homepage!')
//   res.redirect('/');
//   // res.status(404).json({ error: 'Not Found' });
// });



const http = require('http').Server(app);
const io = require('socket.io')(http);
import handleConnection from "./controllers/chat";

// app.use(express.static(__dirname + '/public'));

app.get('/medibridge/chat', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', handleConnection);

http.listen(port, ipAddress, () => {
  console.log(`Socket.IO server running at http://${ipAddress}:${port}/`);
});
