# 📢 Notification Service

A notification service built with Node.js, Express, Redis, and BullMQ to simulate sending and retrieving notifications for users using a queue-based architecture.

---

## 📌 Objective

The project is a part of an internship assignment aimed to build a system that:
- Sends notifications (Email, SMS, In-app)
- Queues notifications using Redis and BullMQ for better performance and async processing
- Allows retrieval of notifications per user

---

## 🚀 Features

- **POST /notifications** — Send a notification (queued using BullMQ)
- **GET /users/:id/notifications** — Retrieve all notifications for a specific user
- Notifications are processed asynchronously in the background
- Redis is used as a message broker for job queueing
- Clean and modular structure for future integration of retry logic, APIs, etc.

---

## 🧠 Assumptions

- Notifications are stored in a database (MongoDB Atlas)
- Notification delivery (Email, SMS, In-app) is simulated via console logs
- BullMQ handles job queuing and processing
- Redis connected through Redis Cloud

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Ritaja21/Notification-Service.git
cd Notification-Service
```

### 2. Install Dependencies
``` bash
npm install express mongoose dotenv ioredis bullmq
```
### 3. Setup and Connect MongoDB Atlas and Redis Cloud

### 4. Create a .env file
```bash
PORT= ENTER_PORT
MONGO_URI= ENTER_MONGO_URL
REDIS_HOST = ENTER_REDIS_HOST
REDIS_PORT = ENTER_REDIS_PORT
REDIS_PASSWORD = ENTER_REDIS_PASSWORD
```
### 5. Start the server
```bash
node server.js
```

### 6. Start the background worker
The notification worker must be running alongside the server to process queued jobs.

```bash
node workers/notificationWorker.js
```


---

### 📁 Note
```md
> 📝 Make sure `.env` and `node_modules/` are listed in your `.gitignore` to avoid pushing sensitive or bulky files to GitHub.
```


## 📮 API Endpoints

### 1. Post/notifications

Queues a notification to be sent asynchronously.
- Request Body 
```json
{
  "userId": "123",
  "type": "email",
  "email": "123@gmail.com"
  "message": "Welcome to the notification system!"
}
```
- Sample Response
```json
{
    "message": "Notification queued successfully"
}
```
### 2. GET /users/:id/notifications
Retrieves all notifications sent to a particular user.
 - Example
```bash
GET /users/testuser/notifications
```
- Sample Response
```json
  [
    {
        "_id": "6829e8bc6740a30dd5b693d5",
        "userId": "testuser",
        "type": "in-app",
        "message": "Hello test user",
        "createdAt": "2025-05-18T14:03:40.396Z",
        "__v": 0
    },
    {
        "_id": "6829e3961e46b6d61a3a03b9",
        "userId": "testuser",
        "type": "in-app",
        "message": "This is a test notification from Redis Queue!",
        "createdAt": "2025-05-18T13:41:42.586Z",
        "__v": 0
    }
]
```

## Sample Requests for different Types of Notifications

### 1. Email- type Notification
```json
{
  "userId": "123",
  "type": "email",
  "email": "user@example.com",
  "message": "Hello test user this is an email-type notification"
}
```
### 2. SMS - type Notification
```json
{
  "userId": "456",
  "type": "sms",
  "phone": "9812345678",
  "message": "Hello test user this is an sms-type notification"
}
```

### 3. In-app Notification
```json
{
  "userId": "789",
  "type": "in-app",
  "message": "Hello test user this is an in-app notification"
}
```

## Postman Output
### 1. Send Notifications
![Screenshot 2025-05-18 233742](https://github.com/user-attachments/assets/9ed73681-5a7f-4617-a63f-1f8296b75744)

### 2. Fetch Notifications
![Screenshot 2025-05-18 233755](https://github.com/user-attachments/assets/f9a54600-cb03-4fdc-843c-1182be19dd65)

## ⚙️ Tech Stack
- Node.js + Express
- MongoDB Atlas for database 
- BullMQ (Redis-based queue)
- Redis for message brokering
- dotenv for config
- Postman for testing

##  Bonus Features Implemented ✅
-  BullMQ queue integration for async processing
-  Redis support for job management
-  Retry & failure handling is ready to be extended via BullMQ config

## 🔧 Folder Structure (Sample)
```bash
notification-service/
├── config/                  # MongoDB & Redis config
│   ├── db.js
│   └── redis.js           
├── models/
│   └── Notification.js            # Database to store the notifications 
├── queues/
│   └── notificationQueue.js       # Queue setup and export
├── routes/                        # Post and get notification api 
│   ├── notifications.js
│   └── users.js
├── workers/
│   └── notificationWorker.js       # BullMQ worker for processing notifications
├── .env
├── server.js
└── package.json
```
## Author
 Ritaja Tarafder 
- [GitHub](https://github.com/Ritaja21)
- [LinkedIn](https://www.linkedin.com/in/ritaja-tarafder-8b8a8b30b/)

---

© 2025 Ritaja Tarafder. This project was developed as part of an internship assignment.
 
