import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
    courseId: { type: String, required: true },
    chapterId: { type: Number, required: true },
    content: { type: Object, required: true },
    videoId: { type: String }
}, { timestamps: true });

export default mongoose.model('Chapter', ChapterSchema);
