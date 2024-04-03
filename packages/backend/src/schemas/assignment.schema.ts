import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { now, HydratedDocument } from "mongoose";
import { Lesson } from "./lesson.schema";
import { Course } from "./course.schema";
import { User } from "./user.schema";

export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema({ timestamps: true })
export class Assignment {
  @Prop({ required: true })
  assignmentName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true })
  lessonId: Lesson;

  @Prop({ required: false })
  lessonName: string;

  @Prop({ required: false })
  totalMarks: number;

  @Prop({ required: false })
  answerOptions: string;

  @Prop({ required: false })
  deadLine: Date;

  @Prop({ required: false })
  answerFile: string;

  @Prop({ required: false })
  assignmentFile: string;

  @Prop({ required: false })
  info: string;

  @Prop({ required: true, default: now() })
  createdAt: Date;

  @Prop({ required: false, default: now() })
  updatedAt: Date;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
