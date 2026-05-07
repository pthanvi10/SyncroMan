import React, { useState } from 'react';
import { createTask } from '../api';

const AddTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [energyLevel, setEnergyLevel] = useState(3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent empty submissions
    if (!title.trim()) return;

    try {
      // 1. Package the data
      const newTask = { title, energy_level: energyLevel };
      
      // 2. Send to backend (MongoDB)
      await createTask(newTask);
      
      // 3. Reset the form UI
      setTitle('');
      setEnergyLevel(3);
      
      // 4. Tell the Dashboard to refresh the list
      if (onTaskAdded) {
        onTaskAdded(); 
      }
    } catch (error) {
      console.error("❌ Error adding task:", error);
    }
  };

  return (
    <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mb-8">
      <h3 className="text-white font-semibold mb-4 opacity-80">Add New Goal</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-indigo-500 outline-none p-2 text-white text-lg transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/60 uppercase tracking-widest">
            <span>Low Energy</span>
            <span>High Energy</span>
          </div>
          
          <input
            type="range"
            min="1"
            max="5"
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(Number(e.target.value))}
          />
          
          <div className="text-center text-indigo-400 font-bold">
            Level {energyLevel}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-indigo-500 hover:text-white transition-all shadow-lg"
        >
          Add to My Mann
        </button>
      </form>
    </div>
  );
};

export default AddTask;