import Chapter from "../models/Chapter.js";
import AppError from "../utils/error.util.js";

// Create a new chapter
const createChapter = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return next(new AppError("Request body is empty", 400));
        }
        const chapter = new Chapter(req.body);
        if (!chapter) {
            return next(new AppError("Failed", 500));
        }
        await chapter.save();
        res.status(201).json(chapter);
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
};

// Get chapters by courseId
const getChapter = async (req, res) => {
    try {
        const { courseId, chapterId } = req.query;

        if (!courseId || chapterId === undefined) {
            return res
                .status(400)
                .json({ error: "Missing courseId or chapterId" });
        }

        const chapter = await Chapter.findOne({ courseId, chapterId });

        if (!chapter) {
            return next(new AppError("Chapter not found", 404));
        }

        res.status(200).json(chapter);
    } catch (error) {
        return next(new AppError("Failed to fetch chapter", 500));
    }
};

export { createChapter, getChapter };
