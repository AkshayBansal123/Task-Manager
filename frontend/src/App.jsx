import React,{useState,useEffect} from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { fetchTasks } from './api/api'
const App = () => {
  const [tasks,setTasks]=useState([]);

  const loadTasks= async () =>{
    const {data}= await fetchTasks();
    setTasks(data);
  }

  useEffect(()=>{
    loadTasks();
  })

  return (
    <div>
     <h1>Task Manager App</h1>
     <TaskForm refreshTasks={loadTasks}/>
     <TaskList tasks={tasks} refreshTasks={loadTasks}/> 
    </div>
  )
}

export default App
