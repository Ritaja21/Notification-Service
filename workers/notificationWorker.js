require('dotenv').config();

const { Worker } = require('bullmq');
const connection = require("../config/redis");
const Notification = require("../models/Notification");

const connectDB = require('../config/db');
connectDB(); 

const worker = new Worker('notifications', async (job) => {
    const { userId, type, message, email, phone } = job.data;

    console.log(`Processing job for user ${userId}: ${message} [${type}]`);

    if (type === 'email') {
        if (!email) throw new Error('Missing email id from email notification')
        console.log(`Email sent to ${email}: ${message}`);
    } else if (type === 'sms') {
        if (!phone) throw new Error('Missing phone number for SMS');
        console.log(`SMS sent to ${phone}: ${message}`);
    } else if (type === 'in-app') {
        await Notification.create({ userId, type, message });
        console.log(`In-app notification saved for ${userId}`);
    }
}, {
    connection,
    attempts: 3 //retry 3 times if failed
});

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed ${err.message}`);
})
