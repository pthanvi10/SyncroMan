import React from 'react';

const TaskItem = ({ task, onComplete }) => {
  // Define energy colors/labels for visual quick-glance
  const energyColors = {
    1: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    2: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    3: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    4: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    5: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  return (
    <li className="group relative flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl transition-all hover:bg-white/10 hover:border-white/20 shadow-xl">
      <div className="flex items-center space-x-4">
        {/* Simple Checkbox/Circle for completion */}
        <button 
          onClick={() => onComplete(task._id)}
          className="w-6 h-6 rounded-full border-2 border-white/30 group-hover:border-indigo-500 transition-colors flex items-center justify-center"
        >
          <div className="w-3 h-3 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        
        <div>
          <h3 className="text-lg font-medium text-white">{task.title}</h3>
          <p className="text-xs text-white/50 uppercase tracking-widest">Added today</p>
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