require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const { auth, requiresAuth } = require('express-openid-connect');

// const app = express();

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:3000',
//   clientID: 'QsyA1QqqdPlJpABQUvUMI62nnF6fPwkR',
//   issuerBaseURL: 'https://dev-bw4lp6xgs8xgjx02.us.auth0.com'
// };

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// // The /profile route will show the user profile as JSON
// app.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user));
// });





app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({extended: false}))

const messageSchema = new mongoose.Schema({
  name: String,
  message: String
});
const Message = mongoose.model('Message', messageSchema);

const dbUrl = process.env.URL;

app.get('/messages', (req, res) =>{
  Message.find();
})

app.post('/messages', (req, res) =>{
  const message = new Message(req.body);
  message.save();
  io.emit('message', req.body);
  res.sendStatus(200);
})

io.on('connection', () =>{
  console.log('a user is connected');
});

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});