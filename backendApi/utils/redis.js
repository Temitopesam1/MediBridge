import { createClient } from 'redis';
require('dotenv').config();


class RedisClient {
    constructor() {
        this.client = createClient({
            password: process.env.PASSWORD,
            socket: {
                host: 'redis-14213.c10.us-east-1-2.ec2.cloud.redislabs.com',
                port: 14213
            }
        });
    }
  
    async connect(){ 
        await this.client.connect().then(()=> console.log("Redis connected"));
    };
  
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
        this.client.setEx(key, duration, value, (err, reply) => {
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