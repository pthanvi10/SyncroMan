import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onComplete }) => {
  // Empty State: When no tasks match the current energy vibe
  if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    return (
      // ✅ Updated to match the exact glassmorphic style of AddTask and TaskItem
      <div className="p-8 text-center transition-all border shadow-xl bg-white/5 backdrop-blur-xl border-white/10 rounded-2xl">
        <p className="text-lg italic tracking-wide text-white/70">
          No tasks match your current energy. Perhaps take a break? ☕
        </p>
      </div>
    );
  }

  // Populated State: Renders the list of TaskItems
  return (
    // ✅ Bumped space-y-3 to space-y-4 just to give those nice glowing TaskItems room to breathe
    <ul className="space-y-4">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} onComplete={onComplete} />
      ))}
    </ul>
  );
};

export default TaskList;