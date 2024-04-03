import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Feedback } from 'src/schemas/feedback.schema';
import { FeedbackService } from 'src/services/feedback.service';

@ApiTags("Feedbacks")
@Controller('feedbacks')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) { }

    @Post('create')
    async create(@Body() feedback: Feedback): Promise<Feedback> {
        try {
            return await this.feedbackService.create(feedback);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('edit/:id')
    async edit(@Param('id') feedbackId: string, @Body() updatedFeedback: Feedback): Promise<Feedback> {
        try {
            return await this.feedbackService.edit(feedbackId, updatedFeedback);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('get-all')
    async getAll(): Promise<Feedback[]> {
        try {
            return await this.feedbackService.getAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-feedback-by-status/:status')
    async getFeedbackByStatus(@Param('status') status: boolean): Promise<Feedback[]> {
        try {
            return await this.feedbackService.getFeedbackByStatus(status);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-by-id/:id')
    async getById(@Param('id') feedbackId: string): Promise<Feedback> {
        try {
            return await this.feedbackService.getById(feedbackId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('get-by-user/:userId')
    async getByUserId(@Param('userId') userId: string): Promise<Feedback[]> {
        try {
            return await this.feedbackService.getByUserId(userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-by-course/:courseId')
    async getByCourseId(@Param('courseId') courseId: string): Promise<Feedback[]> {
        try {
            return await this.feedbackService.getByCourseId(courseId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('delete/:id')
    async delete(@Param('id') feedbackId: string): Promise<void> {
        try {
            await this.feedbackService.delete(feedbackId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
