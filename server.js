require('dotenv').config();
import indexRoutes from './routes/index';
import mongoose from "mongoose";

const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.DATABASE_URI || 'mongodb://localhost:27017';

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(indexRoutes);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection to Db successful:', dbURI);
    app.listen(port, () => {
        console.log(`listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to Database:', error);
    process.exit();
});
