import React from 'react';

const TaskItem = ({ task, onComplete }) => {
  // We keep these colors static! This ensures a Level 5 task always
  // looks like a high-energy task, regardless of the user's current mood.
  const energyColors = {
    1: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    2: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    3: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    4: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    5: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  return (
    <li className="relative flex items-center justify-between p-4 transition-all border shadow-xl group bg-white/5 backdrop-blur-lg border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20">
      <div className="flex items-center space-x-4">

        {/* ✅ Checkbox border now matches the dynamic dashboard vibe on hover */}
        <button
          onClick={() => onComplete(task._id)}
          className="flex items-center justify-center w-6 h-6 transition-colors border-2 rounded-full border-white/30 group-hover:border-mood-mid"
        >
          {/* ✅ Checkbox fill color now matches the dynamic dashboard vibe */}
          <div className="w-3 h-3 transition-opacity rounded-full opacity-0 bg-mood-mid group-hover:opacity-100" />
        </button>

        <div>
          <h3 className="text-lg font-medium text-white">{task.title}</h3>
          <p className="text-xs tracking-widest uppercase text-white/50">Added today</p>
        </div>
      </div>

      {/* Energy Badge */}
      <div className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter ${energyColors[task.energy_level]}`}>
        Lvl {task.energy_level}
      </div>
    </li>
  );
};

export default TaskItem;