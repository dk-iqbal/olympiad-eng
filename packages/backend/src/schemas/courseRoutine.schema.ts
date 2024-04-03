import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { now, HydratedDocument } from "mongoose";
import { Course } from "./course.schema";

export type CourseRoutineDocument = HydratedDocument<CourseRoutine>;

@Schema({ timestamps: true })
export class CourseRoutine {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  routines: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true })
  courseId: Course;

  @Prop({ required: false })
  courseName: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: now() })
  createdAt: Date;

  @Prop({ required: false, default: now() })
  updatedAt: Date;
}

export const CourseRoutineSchema = SchemaFactory.createForClass(CourseRoutine);
