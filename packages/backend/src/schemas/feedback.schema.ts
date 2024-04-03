import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { now, HydratedDocument } from "mongoose";
import { Course } from "./course.schema";
import { User } from "./user.schema";

export type FeedbackDocument = HydratedDocument<Feedback>;

@Schema({ timestamps: true })
export class Feedback {
  @Prop({ required: true })
  feedbackText: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true })
  courseId: Course;

  @Prop({ required: false })
  courseName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  userId: User;

  @Prop({ required: false })
  userName: string;

  @Prop({ required: false })
  rate: number;

  @Prop({ required: false, default: false })
  status: boolean;

  @Prop({ required: true, default: now() })
  createdAt: Date;

  @Prop({ required: false, default: now() })
  updatedAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
