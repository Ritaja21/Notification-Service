const express = require('express');
const router = express.Router();
const notificationQueue = require('../queues/notificationQueue');

function isValidEmail(email){
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone){
     return /^[6-9]\d{9}$/.test(phone);
}

router.post('/', async (req, res) => {
    const { userId, type, message, email, phone } = req.body;
    if (!userId || !type || !message) {
        return res.status(400).json({ error: 'userId, type, and message are required' });
    }
    if (type === 'email' && !isValidEmail(email)) {
        return res.status(400).json({ error: 'email required for email type notification' });
    }
    if (type === 'sms' && !isValidPhone(phone)) {
        return res.status(400).json({ error: 'phone number is required for sms type notification' })
    }
    try {
        await notificationQueue.add('sendNotification', { userId, type, message, email, phone });
        res.status(200).json({ message: 'Notification queued successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to queue notification' });
    }
});

module.exports = router;