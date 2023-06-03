const mongoose = require('mongoose');

class DBClients {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';
    
        this.url = process.env.uri;
    
        // Use connect method to connect to the server
        this.client = new MongoClient(this.url, { useUnifiedTopology: true });
        this.client.connect();
        this.db = this.client.db(database);
        this.userCollection = this.db.collection('users');
        this.fileCollection = this.db.collection('files');
    }
}
await mongoose.connect('mongodb://localhost:27017/');