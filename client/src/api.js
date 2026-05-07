// client/src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/tasks' });

export const fetchTasks = () => API.get('/');
export const createTask = (taskData) => API.post('/', taskData);
export const syncVibe = (vibeText) => API.post('/sync', { vibeText });
export const completeTask = (id) => API.patch(`/${id}`, { status: 'completed' });