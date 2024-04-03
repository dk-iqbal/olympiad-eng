import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { now, HydratedDocument } from "mongoose";
import { Lesson } from "./lesson.schema";

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true })
  questionName: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true})
  lessonId: Lesson;

  @Prop({ required: false })
  lessonName: string;

  @Prop({ required: false })
  answerOptions: string;

  @Prop({ required: false })
  correctAnswer: string;

  @Prop({ required: false })
  info: string;

  @Prop({ required: true, default: now() })
  createdAt: Date;

  @Prop({ required: false, default: now() })
  updatedAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
