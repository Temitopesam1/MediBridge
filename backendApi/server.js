require('dotenv').config();
const cookieParser = require("cookie-parser");
const express = require('express');
const bodyparser = require('body-parser');
import router from './routes/index';
import connectDB from './utils/db';
import cors from 'cors';
import authController from './controllers/auth';
import sessionMiddleware from './utils/session';

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true }));

//serving public file
app.use(express.static(__dirname));

connectDB();
// middleware
app.use(sessionMiddleware);
app.use(authController.jwtAuthenticationMiddleware);
app.use(cookieParser());


app.post('/register/', authController.addUser);
app.get('/login', authController.login);
app.use('/', authController.isAuthenticatedMiddleware, router);
const port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
  return res.status(200).send("Hello World");
})

const http = require('http').Server(app);
const io = require('socket.io')(http);
import handleConnection from "./controllers/chat";

app.get('/chat', (_req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', handleConnection);




http.listen(port, () => { console.log(`Server running at http://localhost:${port}/`);});

