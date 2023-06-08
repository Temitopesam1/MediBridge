require('dotenv').config();
import indexRoutes from './routes/index';
import mongoose from "mongoose";

const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.DATABASE_URI || 'mongodb://localhost:27017/medibridge';

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(indexRoutes);

app.get('/', (req, res) => {
  console.log('Getting home page');
  res.status(200).json({ message: 'Welcome to MediBridge, Your Trusted Health companion\'s API' });
})
app.use((req, res, next) => {
  console.log('Redirecting to homepage!')
  res.redirect('/');
  // res.status(404).json({ error: 'Not Found' });
});

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection to Db successful:', dbURI);
    app.listen(port, () => {
        console.log(`listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
    process.exit();
});
