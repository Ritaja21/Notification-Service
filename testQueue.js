require('dotenv').config();
const notificationQueue = require('./queues/notificationQueue');

(async () => {
    await notificationQueue.add('sendNotification', {
        userId: 'testuser',
        type: 'in-app',
        message: 'This is a test notification from Redis Queue!',
    });

    console.log('Job added to queue');
})();