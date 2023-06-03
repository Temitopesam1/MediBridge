require('dotenv').config();
import mongoose from "mongoose";

class DBClients {
  constructor() {
    this.dbURI = process.env.DATABASE_URI || 'mongodb://localhost:27017';
    this._connectDB();
    }

  async _connectDB() {
    mongoose.connect(this.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
  }

  async isAlive() {
    await this._connectDB()
    const status = mongoose.connection.readyState;
    if (status === 1) {
        return true;
    }
    return false;
  }
}

const dbClient = new DBClients();
export default dbClient;