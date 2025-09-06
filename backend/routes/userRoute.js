import express from 'express';
import { loginUser,registerUser } from '../controller/userController.js'
import { userDetail } from '../controller/userController.js';
 
const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/get-details', userDetail)


export default userRouter;