import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { now, HydratedDocument } from "mongoose";
import { Course } from "./course.schema";
import { User } from "./user.schema";
import { Enrollments } from "./enrollments.schema";

export type StudentCoursesDocument = HydratedDocument<StudentCourses>;

@Schema({ timestamps: true })
export class StudentCourses {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true })
  courseId: Course;

  @Prop({ required: false })
  courseName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  studentId: User;

  @Prop({ required: false })
  studentName: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enrollments",
    required: true,
  })
  enrollmentsId: Enrollments;

  @Prop({ required: true, default: now() })
  createdAt: Date;

  @Prop({ required: false, default: now() })
  updatedAt: Date;
}

export const StudentCoursesSchema =
  SchemaFactory.createForClass(StudentCourses);
