import React, { useState, useEffect } from "react";
import { fetchTasks, syncVibe, completeTask } from "../api";
import AddTask from "./AddTask";
import VibeCheck from "./VibeCheck";
import TaskList from "./TaskList";

const Dashboard = () => {
  // --- Core State ---
  const [tasks, setTasks] = useState([]);
  const [energy, setEnergy] = useState(3); // Assuming 1-5 scale. Default is 3.

  // --- Dynamic UI Colors ---
  const MOOD_PALETTES = {
    drained: {
      start: "#94A3B8", // Muted slate
      mid: "#64748B", // Dim steel
      end: "#475569", // Dark slate
    },
    chill: {
      start: "#8F87F1", // Pastel Blue
      mid: "#C68EFD", // Pastel Purple
      end: "#E9A5F1", // Pastel Pink
    },
    balanced: {
      start: "#2DD4BF", // Soft Teal
      mid: "#34D399", // Emerald Green
      end: "#4ADE80", // Light Green
    },
    focused: {
      start: "#2563EB", // Sharp Royal Blue
      mid: "#4F46E5", // Deep Indigo
      end: "#7C3AED", // Violet
    },
    peak: {
      start: "#F59E0B", // Electric Amber
      mid: "#EF4444", // Vibrant Red
      end: "#E11D48", // Deep Rose/Pink
    },
  };

  // Helper to map numeric energy level to mood keys
  const getMoodFromEnergy = (level) => {
    if (level <= 1) return "drained";
    if (level === 2) return "chill";
    if (level === 3) return "balanced";
    if (level === 4) return "focused";
    if (level >= 5) return "peak";
    return "balanced"; // Fallback
  };

  const currentMood = getMoodFromEnergy(energy);
  const activeColors = MOOD_PALETTES[currentMood] || MOOD_PALETTES["balanced"];

  // --- Data Fetching ---
  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      console.log("BACKEND DATA:", response.data);

      // Adjust based on your actual backend response structure
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch initial tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // --- Event Handlers ---
const handleVibeSubmit = async (text) => {
    try {
      console.log("➡️ 1. Sending to API:", text);
      const response = await syncVibe(text);

      console.log("⬅️ 2. Full API Response:", response);
      console.log("🎯 3. Energy Received:", response.data.calculatedEnergy);

      // Force it to be a number, just in case the backend sent a string
      const newEnergy = Number(response.data.calculatedEnergy);

      if (newEnergy >= 1 && newEnergy <= 5) {
        console.log("✅ 4. Setting state to:", newEnergy);
        setEnergy(newEnergy);
        setTasks(response.data.tasks || []);
      } else {
        console.error("❌ BACKEND SENT INVALID ENERGY:", newEnergy);
      }
    } catch (error) {
      console.error("🚨 API CRASHED:", error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  // --- Render ---
  return (
  <div
      // ✅ Removed the buggy Tailwind gradient classes and added 'vibe-gradient-bg'
      className="min-h-screen p-8 text-white transition-all duration-700 vibe-gradient-bg"
      style={{
        '--dynamic-start': activeColors.start,
        '--dynamic-mid': activeColors.mid,
        '--dynamic-end': activeColors.end,
      }}
    >
      {/* Added a glassmorphic wrapper to make content pop against the gradients */}
      <div className="max-w-2xl mx-auto space-y-8 bg-black/10 p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
        {/* Header */}
        <header className="text-center pt-2">
          <h1 className="text-4xl font-bold tracking-tight pb-2">SyncroMan</h1>
          <p className="opacity-80 mt-2">
            Work with your Mind, not against it.
          </p>
        </header>

    
        {/* The Task Creation Form */}
        <AddTask onTaskAdded={loadTasks} />

        {/* The Mood Input */}
        <div className="pt-6 border-t border-white/20">
          <h2 className="text-xl font-semibold mb-4">Vibe Check</h2>
          <VibeCheck onSync={handleVibeSubmit} />
        </div>

        {/* The Filtered Display */}
        <div className="pt-6 border-t border-white/20">
          <h2 className="text-xl font-semibold mb-4">Manageable Tasks:</h2>
          <TaskList tasks={tasks} onComplete={handleComplete} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
