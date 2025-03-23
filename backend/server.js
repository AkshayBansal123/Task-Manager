import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Taskroutes from './routes/Taskroutes.js'

dotenv.config();
const app=express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/tasks',Taskroutes) // assigns the handling of all the routes with /tasks to the Taskroutes

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
   .then(()=>console.log('MongoDB connected'))
   .catch((err)=> console.log(err));

// start the server
const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server is running on http://localhost:${PORT}`))   