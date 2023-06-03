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
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});