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
        className="w-full p-4 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-0 text-lg transition-all"
        placeholder="How is your 'mann' right now? (e.g. I am focused and ready...)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="2"
      />
      <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg">
        Perform Vibe Check
      </button>
    </form>
  );
};

export default VibeCheck;