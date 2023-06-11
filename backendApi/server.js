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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', handleConnection);

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
