const mongoose = require('mongoose');

class DBClient {
    constructor(){
        this.connectDB();
    }
    async connectDB() {
        const uri = process.env.DATABASE_URI;
        const database = process.env.DATABASE;
        await mongoose.connect(`${uri}/${database}`, {
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

    isAlive(){
        const status = mongoose.connection.readyState;
        if(status === 1){
            return true;
        } else {
            return false;
        }
    }
}

const dbClient = DBClient();
module.exports = dbClient;