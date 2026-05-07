// server/routes/tasks.js
const express = require('express');
const router = express.Router();
const { calculateEnergyLevel } = require('../utils/vibeParser');
const Task = require('../models/Task'); // Assuming you've built the Task model!

// POST /api/tasks/sync 
// The magic route: Receives the vibe text, calculates energy, returns filtered tasks
router.post('/sync', async (req, res) => {
    try {
        const { vibeText } = req.body;

        // 1. Calculate the energy level purely in-memory
        const userEnergy = calculateEnergyLevel(vibeText);

        // 2. Query the database for tasks that are less than or equal to their capacity
        // Note: The vibeText is never saved to the database!
        const matchedTasks = await Task.find({
            energy_level: { $lte: userEnergy },
            status: { $ne: 'completed' } // Don't show already finished tasks
        }).sort({ energy_level: -1 }); // Show highest manageable tasks first

        // 3. Return the data to the React frontend
        res.status(200).json({
            calculatedEnergy: userEnergy,
            tasks: matchedTasks
        });

    } catch (error) {
        console.error("Sync Error:", error);
        res.status(500).json({ message: "Server error during vibe sync" });
    }

});


// POST /api/tasks
// Create a new task (e.g., Title: "Write Essay", Energy: 5)
router.post('/', async (req, res) => {
    try {
        const { title, energy_level } = req.body;
        
        const newTask = new Task({ title, energy_level });
        const savedTask = await newTask.save();
        
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Failed to create task" });
    }
});

// GET /api/tasks
// Fetch all pending tasks (Useful for your initial dashboard load)
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({ status: 'pending' }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
});

// PATCH /api/tasks/:id
// Mark a task as completed
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(
            id, 
            { status: 'completed' }, 
            { new: true }
        );
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
});
// Add your standard GET and POST routes here later for creating tasks
// ...

module.exports = router;