import { createClient } from 'redis';

require('dotenv').config();

class RedisClient {
  constructor() {
    this.client = createClient({
      password: process.env.PASSWORD,
      socket: {
        host: process.env.REDISURL,
        port: 12292,
      },
    });
  }

  async connectRedis() {
    await this.client.connect()
      .then(() => {
        console.log('connected to redis server!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  isAlive() {
    return this.connected;
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

const redisClient = new RedisClient();

export default redisClient;
