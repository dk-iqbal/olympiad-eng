import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Payment } from 'src/schemas/payment.schema';
import { PaymentService } from 'src/services/payment.service';

@ApiTags("Payment")
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('create')
    async create(@Body() payment: Payment): Promise<Payment> {
        try {
            return await this.paymentService.create(payment);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('edit/:paymentId')
    async edit(@Param('paymentId') paymentId: string, @Body() updatedPayment: Payment): Promise<Payment> {
        try {
            return await this.paymentService.edit(paymentId, updatedPayment);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('get-by-id:paymentId')
    async getById(@Param('paymentId') paymentId: string): Promise<Payment> {
        try {
            return await this.paymentService.getById(paymentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('get-by-student/:studentId')
    async getByStudentId(@Param('studentId') studentId: string): Promise<Payment[]> {
        try {
            return await this.paymentService.getByStudentId(studentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-by-course/:courseId')
    async getByCourseId(@Param('courseId') courseId: string): Promise<Payment[]> {
        try {
            return await this.paymentService.getByCourseId(courseId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-by-course-and-student/:courseId/:studentId')
    async getByCourseIdAndStudentId(
        @Param('courseId') courseId: string,
        @Param('studentId') studentId: string,
    ): Promise<Payment[]> {
        try {
            return await this.paymentService.getByCourseIdAndStudentId(courseId, studentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Get('get-by-enrollments/:enrollmentsId')
    async getByEnrollmentsId(@Param('enrollmentsId') enrollmentsId: string): Promise<Payment[]> {
        try {
            return await this.paymentService.getByEnrollmentsId(enrollmentsId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('delete/:paymentId')
    async delete(@Param('paymentId') paymentId: string): Promise<void> {
        try {
            return await this.paymentService.delete(paymentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
