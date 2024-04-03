import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Payment, PaymentDocument } from "src/schemas/payment.schema";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>
  ) {}

  async create(payment: Payment): Promise<Payment> {
    const createdPayment = new this.paymentModel(payment);
    return createdPayment.save();
  }

  async edit(paymentId: string, updatedPayment: Payment): Promise<Payment> {
    const existingPayment = await this.paymentModel
      .findByIdAndUpdate(paymentId, updatedPayment, { new: true })
      .exec();

    if (!existingPayment) {
      throw new NotFoundException(`Payment with ID ${paymentId} not found`);
    }

    return existingPayment;
  }

  async update(updatedPayment: any): Promise<void> {
    const { enrollmentsId, ...paymentDetails } = updatedPayment;

    const existingPayment = await this.paymentModel
      .findOneAndUpdate({ enrollmentsId }, paymentDetails, { new: true })
      .exec();

    if (!existingPayment) {
      throw new NotFoundException(
        `Payment with Enrollment ID ${enrollmentsId} not found`
      );
    }
  }

  async getById(paymentId: string): Promise<Payment> {
    const payment = await this.paymentModel.findById(paymentId).exec();

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${paymentId} not found`);
    }

    return payment;
  }

  async getByStudentId(studentId: string): Promise<Payment[]> {
    return this.paymentModel.find({ studentId }).exec();
  }

  async getByCourseId(courseId: string): Promise<Payment[]> {
    return this.paymentModel.find({ courseId }).exec();
  }

  async getByCourseIdAndStudentId(
    courseId: string,
    studentId: string
  ): Promise<Payment[]> {
    return this.paymentModel.find({ courseId, studentId }).exec();
  }

  async getByEnrollmentsId(enrollmentsId: string): Promise<Payment[]> {
    return this.paymentModel.find({ enrollmentsId }).exec();
  }

  async delete(paymentId: string): Promise<void> {
    await this.getById(paymentId);
    await this.paymentModel.findByIdAndDelete(paymentId).exec();
  }

  async deleteByEnrollmentId(enrollmentId: string): Promise<void> {
    await this.paymentModel.deleteMany({ enrollmentsId: enrollmentId }).exec();
  }
}
