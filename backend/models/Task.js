import mongoose from 'mongoose'

const taskSchema= new mongoose.Schema(
    {
        title: {type: String , required: true},
        description: {type: String},
        deadline : {type: Date},
        reminderTime: {type:Date}
    },
    {timestamps:true}
);

export default mongoose.model('Task',taskSchema);