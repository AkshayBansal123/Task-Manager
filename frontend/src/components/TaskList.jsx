import React from 'react'
import {deleteTask} from '../api/api'

const TaskList=({
    tasks,refreshTasks}
)=>{
    const handleDelete= async(id)=>{
        await deleteTask(id);
        refreshTasks();
    };
    return (
        <div>
            {
                tasks.map((task)=>(
                    <div key={task._id}>
                    <h4>{task.title}</h4>
                    <p>Deadline: {new Date(task.deadline).toLocaleString()}</p>
                    <p>Reminder: {new Date(task.reminderTime).toLocaleString()}</p>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
};


export default TaskList;
