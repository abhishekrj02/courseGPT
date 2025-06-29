import express from 'express';
import Chapter from '../models/Chapter.js';

const router = express.Router();

// Create a new chapter (Only Authenticated Users)
router.post('/', async (req, res) => {
    try {
        const chapter = new Chapter(req.body);
        await chapter.save();
        res.status(201).json(chapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get chapters by courseId (Only Authenticated Users)


router.get('/', async (req, res) => {
    try {
        const { courseId, chapterId } = req.query;

        if (!courseId || chapterId === undefined) {
            return res.status(400).json({ error: "Missing courseId or chapterId" });
        }

        const chapter = await Chapter.findOne({ courseId, chapterId });

        if (!chapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }

        res.status(200).json(chapter);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch chapter" });
    }
});

export default router;
