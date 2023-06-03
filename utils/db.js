const mongoose = require('mongoose');

async function connectDB(){
    const uri = process.env.URL;
    const database = process.env.DATABASE;
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    })
    .catch((err) => {
        console.log(`Database Connection Error: ${err}`);
    });
}
    

function isAlive(){
    const status = mongoose.connection.readyState;
    if(status === 1){
        return true;
    } else {
        return false;
    }
}

module.exports = { connectDB, isAlive };