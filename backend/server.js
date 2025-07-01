import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import errorMiddleware from './middleware/error.middleware.js';
import connectDB from './db.js';
import authRoutes from './routes/user.route.js';
import courseRoutes from './routes/course.route.js';
import chapterRoutes from './routes/chapter.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
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

app.use(errorMiddleware)
app.all('*', (req, res) => {
    res.status(404).send('Page not found');
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
