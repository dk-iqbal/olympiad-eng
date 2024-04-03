import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, now } from "mongoose";
import { User } from "./user.schema";
import { Course } from "./course.schema";

export type EnrollmentsDocument = HydratedDocument<Enrollments>;

@Schema({ timestamps: true })
export class Enrollments {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  studentId: User;

  @Prop({ required: true })
  studentName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true })
  courseId: Course;

  @Prop({ required: true })
  courseName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  instructorId: string;

  @Prop({ required: true })
  organizationId: string;

  @Prop({ required: true })
  instructorName: string;

  @Prop({ required: true })
  studentMobileNumber: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: false })
  transactionType: string;

  @Prop({ required: false })
  isAmountPaid: boolean;

  @Prop({ required: true, default: "Pending", enum: ["Pending", "Approved"] })
  status: string;

  @Prop({ required: true, default: now() })
  enrollmentDate: Date;

  @Prop({ required: true, default: now() })
  createdAt: Date;

  @Prop({ required: false, default: now() })
  updatedAt: Date;
}

export const EnrollmentsSchema = SchemaFactory.createForClass(Enrollments);
