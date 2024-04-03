import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback, FeedbackDocument } from 'src/schemas/feedback.schema';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>,
    ) { }

    async create(feedback: Feedback): Promise<Feedback> {
        const createdFeedback = new this.feedbackModel(feedback);
        return createdFeedback.save();
    }

    async edit(feedbackId: string, updatedFeedback: Feedback): Promise<Feedback> {
        const existingFeedback = await this.feedbackModel.findByIdAndUpdate(feedbackId, updatedFeedback, {
            new: true
        }).exec();

        if (!existingFeedback) {
            throw new NotFoundException(`Feedback with ID ${feedbackId} not found`);
        }
        return existingFeedback;
    }

    async getAll(): Promise<Feedback[]> {
        return this.feedbackModel.find().exec();
    }

    async getFeedbackByStatus(status: boolean): Promise<Feedback[]> {
        return this.feedbackModel.find({ status }).exec();
    }
    async getById(feedbackId: string): Promise<Feedback> {
        const feedback = await this.feedbackModel.findById(feedbackId).exec();
        if (!feedback) {
            throw new NotFoundException(`Feedback with id ${feedbackId} not found`);
        }
        return feedback;
    }

    async getByUserId(userId: string): Promise<Feedback[]> {
        return this.feedbackModel.find({ userId }).exec();
    }

    async getByCourseId(courseId: string): Promise<Feedback[]> {
        return this.feedbackModel.find({ courseId }).exec();
    }

    async delete(feedbackId: string): Promise<void> {
        await this.getById(feedbackId);
        await this.feedbackModel.findByIdAndDelete(feedbackId).exec();
    }
}
