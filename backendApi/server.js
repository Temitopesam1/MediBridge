require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
import router from './routes/index';
import connectDB from './utils/db';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
connectDB();
app.use('/', router);

const port = process.env.PORT || 3000;

const http = require('http').Server(app);
const io = require('socket.io')(http);
import handleConnection from "./controllers/chat";

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', handleConnection);

http.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});