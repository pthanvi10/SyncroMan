import React from 'react';
import TaskItem from './TaskItem'; // ADD THIS LINE

const TaskList = ({ tasks, onComplete
 }) => {
if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="p-6 bg-white/10 rounded-lg text-center">
        <p className="italic opacity-70">No tasks match your current energy. Perhaps take a break? ☕</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map(task => (
       <TaskItem key={task._id} task={task} onComplete={onComplete} />
      ))}
    </ul>
  );
};

export default TaskList;