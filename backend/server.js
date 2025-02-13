import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import chapterRoutes from './routes/chapters.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// About page route
app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/chapters', chapterRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
