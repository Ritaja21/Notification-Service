const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.get('/:id/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

module.exports = router;