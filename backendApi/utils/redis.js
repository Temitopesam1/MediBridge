import { createClient } from 'redis';
require('dotenv').config();


class RedisClient {
    constructor() {
      this.client = createClient({
        password: process.env.PASSWORD, //'vPe1M3wWUTSkrD1GDgtYRXxn1LBo2ad3',
        socket: {
            host: 'redis-14213.c10.us-east-1-2.ec2.cloud.redislabs.com',
            port: 14213
        }
    });
      this.connected = true;
  
      // Display any errors in the console
      this.client.on('error', (err) => {
        this.connected = false;
        console.log(err.toString());
      });
      this.client.on('ready', () => {
        this.connected = true;
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