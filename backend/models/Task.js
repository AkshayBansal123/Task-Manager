import mongoose from 'mongoose'

const taskSchema= new mongoose.Schema(
    {
        taskName: {type: String},
        deadline : {type: Date},
        reminderTime: {type:Date}
    },
    {timestamps:true}
);

export default mongoose.model('Task',taskSchema);