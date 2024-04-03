import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { now, HydratedDocument } from "mongoose";
import { Section } from "./section.schema";

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true })
  sectionId: Section;

  @Prop({ required: false })
  sectionName: string;

  @Prop({ required: false })
  lessonURL: string;

  @Prop({ required: false })
  thumbnail: string;

  @Prop({ required: false })
  duration: string;

  @Prop({ required: true, default: false })
  isFree: boolean;

  @Prop({ required: false })
  positions: number;

  @Prop({ required: false, default: 1 })
  markPerQuestion: number;
  
  @Prop({ required: false })
  isModelTest: boolean;

  @Prop({ required: false, default: 0 })
  passingMarks: number;

  @Prop({ required: false })
  examTime: number;

  @Prop({ required: false })
  isNegativeMarks: boolean;

  @Prop({ required: false })
  negativeMarks: number;

  @Prop({ required: false, default: true })
  isActive: boolean;

  @Prop({ required: false })
  info: string;

  @Prop({ required: true, default: now() })
  createdAt: Date;

  @Prop({ required: false, default: now() })
  updatedAt: Date;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
