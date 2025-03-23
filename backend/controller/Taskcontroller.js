import Task from '../models/Task.js'

export const getTasks= async(req,res)=>{
    const tasks=await Task.find(); // search in MongoDB
    res.json(tasks);
}

export const addTask= async(req,res)=>{
    const {title,description,deadline,reminderTime}=req.body;
    const task=await Task.create({title,description,deadline,reminderTime});
    res.status(201).json(task);
};

export const deleteTask= async(req,res)=>{
    const {id}=req.params;
    await Task.findByIdAndDelete(id);
    res.status(200).json({message:"Task deleted"})
}