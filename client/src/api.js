// client/src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/tasks' });

export const fetchTasks = () => API.get('/');
export const createTask = (taskData) => API.post('/', taskData);

export const syncVibe = async (text) => {
  // ✅ Uses your custom API instance and the correct 'vibeText' key!
  return await API.post('/sync', { vibeText: text });
};

export const completeTask = (id) => API.patch(`/${id}`, { status: 'completed' });