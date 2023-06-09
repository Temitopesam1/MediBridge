require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const router = require('./routes/index');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));


app.use(router);



app.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});