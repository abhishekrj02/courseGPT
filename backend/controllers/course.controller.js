
import Course from "../models/Course.js";
import Chapter from "../models/Chapter.js";


const createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getAllCourses =  async (req, res) => {
    try {
        const courses = await Course.find({ publish: true });

        if (!courses.length) {
            return res.status(404).json({ error: "No published courses found" });
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch courses" });
    }
};


const getAllCoursesByUser = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ error: "Missing email parameter" });
        }

        const courses = await Course.find({ createdBy: email });

        if (!courses.length) {
            return res
                .status(404)
                .json({ error: "No courses found for this user" });
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user courses" });
    }
};


const getCourseById = async (req, res) => {
    try {
        const { courseId, createdBy } = req.query;

        if (!courseId || !createdBy) {
            return res
                .status(400)
                .json({ error: "Missing courseId or createdBy" });
        }

        const course = await Course.findOne({ courseId, createdBy });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course" });
    }
};


const getCourse = async (req, res) => {
    try {
        const { courseId } = req.query;

        if (!courseId) {
            return res.status(400).json({ error: "Missing courseId" });
        }

        const course = await Course.findOne({ courseId });

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch course" });
    }
};


const publishCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        if (!courseId) {
            return res.status(400).json({ error: "Missing courseId" });
        }

        const course = await Course.findOneAndUpdate(
            { courseId },
            { publish: true },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({
            message: "Course published successfully",
            course,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update course" });
    }
};


const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Delete the course
        const deletedCourse = await Course.findOneAndDelete({ courseId });

        if (!deletedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Delete all chapters linked to this course
        await Chapter.deleteMany({ courseId });

        res.status(200).json({
            message: "Course and related chapters deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete course and chapters" });
    }
};

export {
    createCourse,
    getAllCourses,
    getAllCoursesByUser,
    getCourse,
    getCourseById,
    publishCourse,
    deleteCourse,
};
