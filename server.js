require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
import router from './routes/index';
import connectDB from './utils/db';

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
connectDB();
app.use(router);

const port = process.env.PORT || 3000;


const http = require('http').Server(app);
const io = require('socket.io')(http);
import handleConnection from "./controllers/Chat";

// app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', handleConnection);

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});