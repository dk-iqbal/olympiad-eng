import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Enrollments,
  EnrollmentsDocument,
} from "src/schemas/enrollments.schema";
import { StudentCoursesService } from "./studentCourses.service";
import { PaymentService } from "./payment.service";
import { Payment, PaymentDocument } from "src/schemas/payment.schema";
import {
  StudentCourses,
  StudentCoursesDocument,
} from "src/schemas/studentCourses.schema";

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollments.name)
    private enrollmentsModel: Model<EnrollmentsDocument>,
    private readonly studentCoursesService: StudentCoursesService,
    private readonly paymentService: PaymentService,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(StudentCourses.name)
    private studentCoursesModel: Model<StudentCoursesDocument>
  ) {}

  async create(enrollment: any): Promise<Enrollments> {
    const createdEnrollment = new this.enrollmentsModel(enrollment);

    // Save the enrollment
    const savedEnrollment = await createdEnrollment.save();

    // Create associated StudentCourses record
    const studentCourse = {
      enrollmentsId: savedEnrollment._id,
      courseId: enrollment.courseId,
      courseName: enrollment.courseName,
      studentId: enrollment.studentId,
      studentName: enrollment.studentName,
    };

    const paymentPayload = {
      courseId: enrollment.courseId,
      courseName: enrollment.courseName,
      studentId: enrollment.studentId,
      studentName: enrollment.studentName,
      enrollmentsId: savedEnrollment._id,
      instructorId: enrollment.instructorId,
      organizationId: enrollment.organizationId,
      paymentDate: enrollment.paymentDate,
      amount: enrollment.amount,
      discuntAmount: enrollment.discuntAmount,
      transactionType: enrollment.transactionType,
      transactionId: enrollment.transactionId,
      status: false,
    };
    await this.studentCoursesService.create(studentCourse as any);
    await this.paymentService.create(paymentPayload as any);
    return savedEnrollment;
  }

  async edit(
    enrollmentId: string,
    updatedEnrollment: any
  ): Promise<Enrollments> {
    const existingEnrollment = await this.enrollmentsModel
      .findByIdAndUpdate(enrollmentId, updatedEnrollment, { new: true })
      .exec();

    if (!existingEnrollment) {
      throw new NotFoundException(
        `Enrollment with ID ${enrollmentId} not found`
      );
    }

    // Update associated StudentCourses record
    await this.studentCoursesService.edit({
      enrollmentsId: enrollmentId as any,
      courseId: updatedEnrollment.courseId,
      courseName: updatedEnrollment.courseName,
      studentId: updatedEnrollment.studentId,
      studentName: updatedEnrollment.studentName,
    });

    // Update associated Payment record
    await this.paymentService.update({
      enrollmentsId: enrollmentId as any,
      courseId: updatedEnrollment.courseId,
      courseName: updatedEnrollment.courseName,
      studentId: updatedEnrollment.studentId,
      studentName: updatedEnrollment.studentName,
      instructorId: updatedEnrollment.instructorId,
      organizationId: updatedEnrollment.organizationId,
      paymentDate: updatedEnrollment.paymentDate,
      amount: updatedEnrollment.amount,
      discountAmount: updatedEnrollment.discountAmount,
      transactionType: updatedEnrollment.transactionType,
      transactionId: updatedEnrollment.transactionId,
      status: false,
    });

    return existingEnrollment;
  }

  async getAllEnrollments(): Promise<any[]> {
    const enrollments = await this.enrollmentsModel.find().exec();
    const populatedEnrollments = await Promise.all(
      enrollments?.map((enrollment) => this.populateEnrollment(enrollment))
    );

    return populatedEnrollments;
  }

  private async populateEnrollment(enrollment: any): Promise<any> {
    const payments = await this.paymentModel
      .find({ enrollmentsId: enrollment?._id || enrollment?.id })
      .exec();

    return { ...enrollment.toObject(), payments };
  }

  async getAllDetailsByEnrollmentId(enrollmentId: string): Promise<any> {
    const enrollmentDetails = await this.enrollmentsModel
      .findById(enrollmentId)
      .exec();

    if (!enrollmentDetails) {
      throw new NotFoundException(
        `Enrollment with ID ${enrollmentId} not found`
      );
    }

    const paymentDetails = await this.paymentModel
      .findOne({ enrollmentsId: enrollmentId })
      .exec();
    const studentCoursesDetails = await this.studentCoursesModel
      .findOne({ enrollmentsId: enrollmentId })
      .exec();

    return {
      enrollment: enrollmentDetails,
      payment: paymentDetails,
      studentCourses: studentCoursesDetails,
    };
  }

  async getById(enrollmentId: string): Promise<Enrollments> {
    const enrollment = await this.enrollmentsModel
      .findById(enrollmentId)
      .exec();

    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment with ID ${enrollmentId} not found`
      );
    }
    return enrollment;
  }

  async getByStudentId(studentId: string): Promise<Enrollments[]> {
    return this.enrollmentsModel.find({ studentId }).exec();
  }

  async getByCourseId(courseId: string): Promise<Enrollments[]> {
    return this.enrollmentsModel.find({ courseId }).exec();
  }

  async getByInstructorId(instructorId: string): Promise<Enrollments[]> {
    return this.enrollmentsModel.find({ instructorId }).exec();
  }

  async getByStudentAndCourseId(courseId: string, studentId: string): Promise<Enrollments> {
    const enrollment = this.enrollmentsModel.findOne({ courseId, studentId }).exec();
    return enrollment || null;
  }

  async delete(enrollmentId: string): Promise<void> {
    const enrollment = await this.getById(enrollmentId);

    await Promise.all([
      this.studentCoursesService.deleteByEnrollmentId(enrollmentId),
      this.paymentService.deleteByEnrollmentId(enrollmentId),
    ]);
    await this.enrollmentsModel.findByIdAndDelete(enrollmentId).exec();
  }


  async getTotalEnrolments(): Promise<number> {
    const total = await this.enrollmentsModel.countDocuments();
    return total;
  }
}
