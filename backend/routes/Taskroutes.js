import express from 'express'
import { getTasks,addTask,deleteTask,showTask } from '../controller/Taskcontroller.js'

const router=express.Router();

router.get('/',getTasks);
router.post('/',addTask);
router.delete('/:id',deleteTask);
router.get('/:id',showTask);
export default router;