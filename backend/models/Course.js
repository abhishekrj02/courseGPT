import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    courseId: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
    includeVideo: { type: String, default: "Yes" },
    courseOutput: { type: Object, required: true },
    createdBy: { type: String, required: true },
    username: { type: String },
    userProfileImage: { type: String },
    courseBanner: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/studyai-c4872.appspot.com/o/banner.jpg?alt=media&token=48e02703-0b98-4901-835a-184a2c0a71ea",
    },
    publish: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
