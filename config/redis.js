const IORedis = require('ioredis');

const connection = new IORedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,      
    enableReadyCheck: false
});

module.exports = connection;
