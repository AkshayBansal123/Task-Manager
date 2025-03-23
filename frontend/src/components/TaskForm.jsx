import React,{useState} from 'react';
import {createTask} from '../api/api';

const TaskForm=({refreshTasks})=>{
    const [title,setTitle]=useState('')
    const [deadline, setDeadline] = useState('');
    const [reminderTime, setReminderTime] = useState('');

    const handleSubmit= async(e)=>{
        e.preventDefault();
        await createTask({title,deadline,reminderTime});
        refreshTasks();
        setTitle('');
        setDeadline('');
        setReminderTime('');
    };
    return (
        <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
        <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <input type="datetime-local" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} />
        <button type="submit">Add Task</button>
    </form>
    )
    }

    export default TaskForm;