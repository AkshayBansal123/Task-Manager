

import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, deleteTask } from '../api/api';

const TaskList = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({
    taskName: '',
    deadline: '',
    reminderTime: '',
  });
  const [addingTask, setAddingTask] = useState(false);

  useEffect(() => {
    tasks.forEach(scheduleReminder);
  }, [tasks]);

  const scheduleReminder = (task) => {
    const reminderTime = new Date(task.reminderTime).getTime();
    const currentTime = new Date().getTime();
    const timeUntilReminder = reminderTime - currentTime;

    if (timeUntilReminder > 0) {
      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification(`Reminder: ${task.taskName}`, {
            body: `It's time to start working on this task!`,
            icon: '/notification_icon.png',
          });
        }
      }, timeUntilReminder);
    }
  };

  const handleAddTaskClick = () => setAddingTask(true);

  const addTask = async () => {
    if (!newTask.taskName || !newTask.deadline || !newTask.reminderTime) {
      alert('Please fill in all fields.');
      return;
    }

    if (new Date(newTask.reminderTime) > new Date(newTask.deadline)) {
      alert('Reminder time must be before the deadline.');
      return;
    }

    const newTaskObj = {
      taskName: newTask.taskName,
      deadline: newTask.deadline,
      reminderTime: newTask.reminderTime,
    };

    try {
      const { createdTask } = await createTask(newTaskObj);
      setTasks([...tasks, createdTask]);
      setNewTask({ taskName: '', taskdeadline: '', reminderTime: '' });
      scheduleReminder(createdTask);
      setAddingTask(false);
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      const { data } = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.taskdeadline) - new Date(b.taskdeadline)
  );

  return (
    <div className="container mt-5">
      <button
        style={{
          backgroundColor: 'blue',
          width: '130px',
          height: '40px',
          marginLeft: '1000px',
          marginBottom: '20px',
         
          borderRadius: '5px',
        }}
        onClick={handleAddTaskClick}
      >
        Add task
      </button>
      <div className="table-responsive" style={{ width: '80%', margin: 'auto' }}>
        <table className="table table-striped table-bordered table-hover" style={{ borderRadius: '10px' }}>
          <thead  style={{ height: '50px'  }}>
            <tr>
              <th scope="col" style={{ textAlign: 'center', fontSize: '17px', width: '25%',backgroundColor: 'darkcyan', color: 'white' }}>Task</th>
              <th scope="col" style={{ textAlign: 'center', fontSize: '17px' ,backgroundColor: 'darkcyan', color: 'white'}}>Deadline</th>
              <th scope="col" style={{ textAlign: 'center', fontSize: '17px',backgroundColor: 'darkcyan', color: 'white' }}>Reminder Time</th>
              <th scope="col" style={{ textAlign: 'center', fontSize: '17px',backgroundColor: 'darkcyan', color: 'white' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No tasks to show</td>
              </tr>
            ) : (
              sortedTasks.map((task) => (
                <tr key={task._id}>
                  <td className="text-center" style={{ fontSize: '18px' ,backgroundColor: 'cyan'}}>{task.taskName}</td>
                  <td className="text-center" style={{ fontSize: '18px',backgroundColor: 'cyan'}}>{new Date(task.deadline).toLocaleString()}</td>
                  <td className="text-center" style={{ fontSize: '18px',backgroundColor: 'cyan'}}>{new Date(task.reminderTime).toLocaleString()}</td>
                  <td className="text-center" style={{ fontSize: '18px',backgroundColor: 'cyan' }}>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(task._id)}
                    >
                      Remove Task
                    </button>
                  </td>
                </tr>
              ))
            )}
            {addingTask && (
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Enter the task"
                    value={newTask.taskName}
                    onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
                    className="form-control"
                    style={{width:'100%'}}
                  />
                </td>
                <td>
                  <input
                    type="datetime-local"
                    placeholder="Enter the deadline"
                    value={newTask.deadline}
                    onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="datetime-local"
                    placeholder="Enter the reminder time"
                    value={newTask.reminderTime}
                    onChange={(e) => setNewTask({ ...newTask, reminderTime: e.target.value })}
                    className="form-control"
                  />
                </td>
                <td>
                  <button className="btn btn-success me-2" onClick={addTask}>
                    ✅ Yes
                  </button>
                  <button className="btn btn-danger" onClick={() => setAddingTask(false)}>
                    ❌ No
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
