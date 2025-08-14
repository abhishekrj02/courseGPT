import express from 'express';
import { createCourse, deleteCourse, getAllCourses, getAllCoursesByUser, getCourse, getCourseAll, getCourseById, publishCourse } from '../controllers/course.controller.js';

const router = express.Router();

router.post('/', createCourse);
router.get('/all', getAllCourses);
router.get('/user', getAllCoursesByUser);
router.get('/course', getCourseById);
router.get('/course/all', getCourse);
router.put('/publish', publishCourse);
router.delete('/:courseId', deleteCourse);

export default router;
