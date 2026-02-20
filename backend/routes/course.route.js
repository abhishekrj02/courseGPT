import express from 'express';
import { createCourse, deleteCourse, getAllCourses, getAllCoursesByUser, getCourse, getCourseById, publishCourse, updateCourseBanner } from '../controllers/course.controller.js';

const router = express.Router();

router.post('/', createCourse);
router.get('/all', getAllCourses);
router.get('/user', getAllCoursesByUser);
router.get('/course', getCourseById);
router.get('/course/all', getCourse);
router.put('/publish', publishCourse);
router.put('/banner', updateCourseBanner);
router.delete('/:courseId', deleteCourse);

export default router;
