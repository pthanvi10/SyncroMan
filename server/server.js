// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows your React frontend to communicate with this backend
app.use(express.json()); // Parses incoming JSON requests


// MongoDB Connection (Updated for Mongoose 8+)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected successfully'))
.catch((err) => {
    console.error('❌ MongoDB Connection Error:');
    console.error(err);
});


// Routes
// We will create this file next
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// Health Check Route
app.get('/', (req, res) => {
    res.send('SyncroMan Backend is up and running!');
});

// GET /api/tasks - Fetch all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});