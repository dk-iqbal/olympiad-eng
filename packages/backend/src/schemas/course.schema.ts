import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { now, HydratedDocument } from "mongoose";
import { Category } from "./category.schema";
import { User } from "./user.schema";

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true })
  categoryId: Category;

  @Prop({ required: false })
  categoryName: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  instructorId: User;

  @Prop({ required: false })
  instructorName: string;

  @Prop({ required: false })
  multiInstructorIds: string;

  @Prop({ required: true })
  organizationId: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  isDiscount: boolean;

  @Prop({ required: false, default: 0 })
  discount: number;

  @Prop({ required: false })
  courseProvider: string;

  @Prop({ required: false })
  courseOverview: string;

  @Prop({ required: false })
  thumbnail: string;

  @Prop({ required: true, default: "Pending" })
  status: string;

  @Prop({ required: false, default: "" })
  info: string;

  @Prop({ required: true, enum: ["COURSE", "MODEL_TEST"] })
  courseType: string;

  @Prop({required: false, default: false})
  isFree: boolean;

  @Prop({ required: true, default: now() })
  createdAt: Date;

  @Prop({ required: false, default: now() })
  updatedAt: Date;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
