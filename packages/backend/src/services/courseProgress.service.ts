import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseProgress, CourseProgressDocument } from 'src/schemas/courseProgress.schema';

@Injectable()
export class CourseProgressService {
    constructor(
        @InjectModel(CourseProgress.name) private courseProgressModel: Model<CourseProgressDocument>,
    ) { }

    async create(courseProgress: CourseProgress): Promise<CourseProgress> {
        const createdCourseProgress = new this.courseProgressModel(courseProgress);
        return createdCourseProgress.save();
    }

    async edit(courseProgressId: string, updatedCourseProgress: CourseProgress): Promise<CourseProgress> {
        const existingCourseProgress = await this.courseProgressModel
            .findByIdAndUpdate(courseProgressId, updatedCourseProgress, { new: true })
            .exec();

        if (!existingCourseProgress) {
            throw new NotFoundException(`CourseProgress with ID ${courseProgressId} not found`);
        }

        return existingCourseProgress;
    }

    async getById(courseProgressId: string): Promise<CourseProgress> {
        const courseProgress = await this.courseProgressModel.findById(courseProgressId).exec();

        if (!courseProgress) {
            throw new NotFoundException(`CourseProgress with ID ${courseProgressId} not found`);
        }

        return courseProgress;
    }

    async getByStudentId(studentId: string): Promise<CourseProgress[]> {
        return this.courseProgressModel.find({ studentId }).exec();
    }

    async getByCourseId(courseId: string): Promise<CourseProgress[]> {
        return this.courseProgressModel.find({ courseId }).exec();
    }

    async getByLessonId(lessonId: string): Promise<CourseProgress[]> {
        return this.courseProgressModel.find({ lessonId }).exec();
    }

    async delete(courseProgressId: string): Promise<void> {
        await this.getById(courseProgressId);
        await this.courseProgressModel.findByIdAndDelete(courseProgressId).exec();
    }
}
