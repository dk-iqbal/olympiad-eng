import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, now } from "mongoose";
import { User } from "./user.schema";
import { Course } from "./course.schema";
import { Lesson } from "./lesson.schema";

export type CourseProgressDocument = HydratedDocument<CourseProgress>;

@Schema({ timestamps: true })
export class CourseProgress {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    studentId: User;

    @Prop({ required: true })
    studentName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true })
    courseId: Course;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true })
    lessonId: Lesson;

    @Prop({ required: true })
    timespan: number;

    @Prop({ required: false, default: false })
    isViewCompleted: boolean;

    @Prop({ required: true, default: now() })
    createdAt: Date;

    @Prop({ required: false, default: now() })
    updatedAt: Date;
}

export const CourseProgressSchema = SchemaFactory.createForClass(CourseProgress)