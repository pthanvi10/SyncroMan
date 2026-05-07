import React, { useState, useEffect } from 'react';
import { fetchTasks, syncVibe, completeTask } from '../api'; // ✅ Single, merged import
import AddTask from './AddTask';
import VibeCheck from './VibeCheck';
import TaskList from './TaskList';

const Dashboard = () => {
  // --- Core State ---
  const [tasks, setTasks] = useState([]);
  const [energy, setEnergy] = useState(3); // Default energy level

  // --- Dynamic UI Colors ---
  const bgColors = {
    1: 'bg-slate-900 text-slate-100', // Drained
    2: 'bg-blue-900 text-slate-100',  // Chill
    3: 'bg-emerald-900 text-slate-100', // Balanced
    4: 'bg-amber-900 text-slate-100',   // Focused
    5: 'bg-orange-900 text-slate-100', // Peak
  };

  // --- Data Fetching ---
  // Fetches the default task list when the app loads
const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      console.log("BACKEND DATA:", response.data); // ADD THIS LINE
      
      // If your backend is sending { tasks: [...] }, you need to set it like this:
      // setTasks(response.data.tasks);
      // If it's just sending an array, leave it as is:
      setTasks(response.data);
      
    } catch (error) {
      console.error("Failed to fetch initial tasks:", error);
    }
  };

  // Run once on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  // --- Event Handlers ---
  
  // 1. Handle Vibe Submission (The AI Parser)
  const handleVibeSubmit = async (text) => {
    try {
      const response = await syncVibe(text);
      setTasks(response.data.tasks);
      setEnergy(response.data.calculatedEnergy);
    } catch (error) {
      console.error("Failed to sync vibe:", error);
    }
  };

  // 2. Handle Task Completion
  const handleComplete = async (id) => {
    try {
      await completeTask(id);
      // Instantly remove it from the UI for that snappy "Zen" feel
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  

  // --- Render ---
  return (
    <div className={`min-h-screen transition-colors duration-700 p-8 ${bgColors[energy]}`}>
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center pt-8">
          <h1 className="text-4xl font-bold tracking-tight">SyncroMan</h1>
          <p className="opacity-75 mt-2">Work with your mann, not against it.</p>
        </header>

        {/* The Task Creation Form */}
        {/* We pass loadTasks so AddTask can trigger a UI refresh when done */}
        <AddTask onTaskAdded={loadTasks} />

        {/* The Mood Input */}
        <div className="pt-4 border-t border-white/10">
          <h2 className="text-xl font-semibold mb-4">Vibe Check</h2>
          <VibeCheck onSync={handleVibeSubmit} />
        </div>
        
        {/* The Filtered Display */}
        <div className="pt-8">
          <h2 className="text-xl font-semibold mb-4">Manageable Tasks:</h2>
          <TaskList tasks={tasks} onComplete={handleComplete} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;