import express from 'express'
import { UserController } from './user.controller';


const router=express.Router();

router.post('/create-student',UserController.createStudent)
//router.get('/users',UserController.)


export const userRoutes=router;