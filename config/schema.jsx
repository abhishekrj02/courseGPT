import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable("courseList", {
    id: serial("id").primaryKey(),
    courseId: varchar("courseId").notNull(),
    name: varchar("name").notNull(),
    category: varchar("category").notNull(),
    difficulty: varchar("difficulty").notNull(),
    includeVideo: varchar("includeVideo").notNull().default("Yes"),
    courseOutput: json("courseOutput").notNull(),
    createdBy: varchar("createdBy").notNull(),
    username: varchar("username"),
    userProfileImage: varchar("userProfileImage"),
    courseBanner: varchar("courseBanner").default(
        "https://firebasestorage.googleapis.com/v0/b/studyai-c4872.appspot.com/o/hq720.jpg?alt=media&token=4b51f688-8b30-4cb5-8ed0-c39febbdfba8"
    ),
    publish: boolean("publish").default(false),
});

export const Chapters = pgTable('chapters', {
    id:serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    chapterId: integer('chapterId').notNull(),
    content: json('content').notNull(),
    videoId: varchar('videoId').notNull()
})
