import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, now } from "mongoose";
import { User } from "./user.schema";
import { Lesson } from "./lesson.schema";
import { Course } from "./course.schema";
import { Assignment } from "./assignment.schema";

export type QuestionMarksDocument = HydratedDocument<QuestionMarks>;

@Schema({ timestamps: true })
export class QuestionMarks {
    @Prop({ required: false })
    totalQuestion: number;

    @Prop({ required: true })
    mark: number;

    @Prop({ required: true })
    totalMark: number;

    @Prop({ required: false })
    negativeMark: number;

    @Prop({ required: false })
    totalWrong: number;

    @Prop({ required: false })
    totalCorrect: number;

    @Prop({ required: false })
    isPassed: Boolean;

    @Prop({ required: true, enum: ["ASSIGNMENT", "QUIZ"] })
    questionType: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    studentId: User;

    @Prop({ required: true })
    studentName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true })
    lessonId: Lesson;

    @Prop({ required: true })
    lessonName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true })
    courseId: Course;

    @Prop({ required: false })
    courseName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: false })
    assignmentId: Assignment;

    @Prop({ required: false })
    assignmentFile: string;

    @Prop({ required: true, default: now() })
    createdAt: Date;

    @Prop({ required: false, default: now() })
    updatedAt: Date;
}

export const QuestionMarksSchema = SchemaFactory.createForClass(QuestionMarks)