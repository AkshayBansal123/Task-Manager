import React,{useState,useEffect} from 'react'

import TaskList from './components/TaskList'
import { fetchTasks } from './api/api'
import Navbar from './components/Navbar'
const App = () => {
  const [tasks,setTasks]=useState([]);

  const loadTasks = async () => {
    try {
      const { data } = await fetchTasks();
  
      // Validate the fetched data before setting it to state
      if (Array.isArray(data)) {
        // Filter out any invalid tasks (based on your criteria, e.g., missing fields)
       
  
        // Set the valid tasks to state
        setTasks(data);
      } else {
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Optionally set an error state if needed
    }
  };
  

  useEffect(()=>{
    loadTasks();
  })

  return (
    <div>
    <Navbar/>
   
     <TaskList tasks={tasks} setTasks={setTasks}/> 
    </div>
  )
}

export default App
