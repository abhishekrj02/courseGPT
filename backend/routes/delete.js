import express from "express";
import Course from "../models/Course.js";
import Chapter from "../models/Chapter.js";

const router = express.Router();

router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing course ID" });
    }

    const deletedCourse = await Course.findOneAndDelete({ id });

    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    await Chapter.deleteMany({ id });
    res.status(200).json({
      message: "Course and related chapters deleted successfully",
      id,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Failed to delete course" });
  }
});

export default router;
