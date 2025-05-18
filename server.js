const express = require('express');
const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB();

app.use('/notifications', require('./routes/notification'));
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
    res.json({ message: 'The API is working' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

