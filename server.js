require('dotenv').config();
import { exit } from 'process';
import indexRoutes from './routes/index';
import dbClient from './utils/db';

const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(indexRoutes);

if (dbClient.isAlive()) {
    console.log('Connection to Db successful:', dbClient.dbURI);
    app.listen(port, () => {
        console.log(`listening on http://localhost:${port}`);
    });
} else {
    console.log('Database is not connected, cannot listen');
    exit();
}