require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
import handleConnection from './chat/connect';

// app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', handleConnection);

const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});