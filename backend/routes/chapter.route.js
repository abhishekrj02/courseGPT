import express from 'express';
import { createChapter, getChapter } from '../controllers/chapter.controller.js';

const router = express.Router();

router.post('/', createChapter);
router.get('/', getChapter);
export default router;
