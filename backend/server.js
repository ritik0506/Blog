import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: '✅ Blog API is running' });
});

app.use('/api/user', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/blogs', blogRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
