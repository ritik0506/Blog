import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import userRoute from './routes/userRoute.js';
import blogRoute from './routes/blogRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Blog API is running' });
});

app.use('/api/user', userRoute);
app.use('/api/blog', blogRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Something went wrong!' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
