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
    <div className="p-6 mb-8 border rounded-2xl shadow-2xl bg-white/5 backdrop-blur-xl border-white/10">
      <h3 className="mb-4 font-semibold text-white opacity-80">Add New Goal</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="What needs to be done?"
          // ✅ Changed focus to use the dynamic mid-color of the current palette
          className="w-full p-2 text-lg text-white transition-all bg-transparent border-b-2 outline-none border-white/20 focus:border-mood-mid"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="space-y-2">
          <div className="flex justify-between text-xs tracking-widest uppercase text-white/60">
            <span>Low Energy</span>
            <span>High Energy</span>
          </div>

          <input
            type="range"
            min="1"
            max="5"
            // ✅ Changed the slider thumb to the dynamic mid-color
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/20 accent-mood-mid"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(Number(e.target.value))}
          />

          {/* ✅ Changed the text color to match */}
          <div className="font-bold text-center text-mood-mid">
            Level {energyLevel}
          </div>
        </div>

        <button
          type="submit"
          // ✅ Button hover state now matches the active mood!
          className="w-full py-3 font-bold transition-all bg-white shadow-lg text-slate-900 rounded-xl hover:bg-mood-mid hover:text-white"
        >
          Add to My Mann
        </button>
      </form>
    </div>
  );
};

export default AddTask;