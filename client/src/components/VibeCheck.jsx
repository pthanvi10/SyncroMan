import React, { useState } from 'react';

const VibeCheck = ({ onSync }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) onSync(text);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        // ✅ Updated to match the dark glass theme and dynamic mood focus
        className="w-full p-4 text-lg text-white transition-all bg-transparent border-2 outline-none resize-none rounded-xl border-white/20 focus:border-mood-mid placeholder-white/40"
        placeholder="How is your 'mann' right now? (e.g. I am focused and ready...)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3" // Bumped to 3 rows so it looks nicely proportioned
      />
      <button
        // ✅ Updated to match the AddTask button with dynamic hover state
        className="w-full py-3 font-bold transition-all bg-white shadow-lg text-slate-900 rounded-xl hover:bg-mood-mid hover:text-white"
      >
        Perform Vibe Check
      </button>
    </form>
  );
};

export default VibeCheck;