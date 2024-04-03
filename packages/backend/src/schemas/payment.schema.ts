import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, now } from "mongoose";
import { User } from "./user.schema";
import { Course } from "./course.schema";
import { Enrollments } from "./enrollments.schema";

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    studentId: User;

    @Prop({ required: true })
    studentName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true })
    courseId: Course;

    @Prop({ required: true })
    courseName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Enrollments", required: true })
    enrollmentsId: Enrollments;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    instructorId: User;

    @Prop({ required: true })
    organizationId: string;

    @Prop({ required: true, default: now() })
    paymentDate: Date;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: false })
    discountAmount: number;

    @Prop({ required: true })
    transactionType: string;

    @Prop({ required: true })
    transactionId: string;

    @Prop({ required: true })
    status: boolean;

    @Prop({ required: true, default: now() })
    createdAt: Date;

    @Prop({ required: false, default: now() })
    updatedAt: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)