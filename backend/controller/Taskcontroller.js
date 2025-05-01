import Task from '../models/Task.js'

export const getTasks= async(req,res)=>{
    try {
        const tasks = await Task.find(); // Search in MongoDB
        if (tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found" });
        }
        res.json(tasks); // Send the tasks as JSON
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: "An error occurred while fetching tasks" });
    }
}

export const addTask = async (req, res) => {
    try {
      const { taskName, deadline, reminderTime } = req.body;
  
      // Validate input
      if (!taskName || !deadline || !reminderTime) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      // Ensure reminder time is before the deadline
      if (new Date(reminderTime) > new Date(deadline)) {
        return res.status(400).json({ message: "Reminder time must be before the deadline." });
      }
  
      // Create the task
      const task = await Task.create({ taskName, deadline, reminderTime });
  
      // Send success response
      res.status(201).json(task);
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ message: "Failed to add task." });
    }
  };

  

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        // Use the custom 'id' field to find and delete the task
        const task = await Task.findByIdAndDelete(id);

        // Check if task was found and deleted
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Respond with success message
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        // If there's an error during deletion (e.g., invalid ID format)
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error while deleting task" });
    }
};

export const showTask=async(req,res)=>{
    const {id}=req.params;
    const task=await Task.findById(id);
    res.status(200).json(task);
}