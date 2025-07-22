import axios from 'axios'

const API= import.meta.env.VITE_API_URL;
a
export const fetchTasks=()=>API.get(`${API}/tasks`);
export const createTask=(task)=>API.post(`${API}/tasks',task`);
export const deleteTask=(id)=>API.delete(`${API}/tasks/${id}`);
export const showTask=(id)=>API.get(`${API}/tasks/${id}`);