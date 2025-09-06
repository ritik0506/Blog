import express from 'express'
import connectDB from './config/mongodb.js'
import cors from 'cors'
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js'

import userRouter from './routes/userRoute.js'
import router from './routes/blogRoute.js'


const app = express();
const port = process.env.PORT || 4000


connectDB();

app.use(cors({
    origin: "http://localhost:5173" }))
connectCloudinary();
app.use(express.json());

app.use('/api/user',userRouter)
app.use('/api/blog',router)

app.use(express.json());


app.listen(port, ()=>
console.log("server runnng on port "+ port))