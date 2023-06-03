require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
import router from './routes/index';


const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(router);

const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});