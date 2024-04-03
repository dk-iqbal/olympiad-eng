import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { QuestionMarks, QuestionMarksDocument } from 'src/schemas/questionMarks.schema';
import { CloudinaryService } from './cloudinary.service';
import { Readable } from "stream";

@Injectable()
export class QuestionMarksService {
    constructor(
        @InjectModel(QuestionMarks.name) private questionMarksModel: Model<QuestionMarksDocument>,
    private readonly cloudinaryService: CloudinaryService,

    ) { }

    async create(questionMarks: QuestionMarks): Promise<QuestionMarks> {
        // You may want to add validation or additional logic here
        if (questionMarks.assignmentFile) {
            const thumbnailStream = new Readable();
            thumbnailStream.push(Buffer.from(questionMarks.assignmentFile, "base64"));
            thumbnailStream.push(null);
    
            const url = await this.cloudinaryService.uploadImage(
              thumbnailStream
            );
            questionMarks.assignmentFile = url;
          }
        const createdQuestionMarks = new this.questionMarksModel(questionMarks);
        return createdQuestionMarks.save();
    }

    async edit(questionMarksId: string, updatedQuestionMarks: QuestionMarks): Promise<QuestionMarks> {
        const existingQuestionMarks = await this.questionMarksModel.findByIdAndUpdate(questionMarksId, updatedQuestionMarks, {
            new: true
        }).exec();

        if (!existingQuestionMarks) {
            throw new NotFoundException(`QuestionMarks with ID ${questionMarksId} not found`);
        }
        return existingQuestionMarks;
    }

    async getById(questionMarksId: string): Promise<QuestionMarks> {
        const questionMarks = await this.questionMarksModel.findById(questionMarksId).exec();
        if (!questionMarks) {
            throw new NotFoundException(`QuestionMarks with id ${questionMarksId} not found`);
        }
        return questionMarks;
    }

    async getByStudentId(studentId: string): Promise<QuestionMarks[]> {
        return this.questionMarksModel.find({ studentId }).exec();
    }

    async getByStudentAndCourseId(courseId: string, studentId: string): Promise<QuestionMarks[]> {
        return this.questionMarksModel.find({ courseId, studentId, questionType: 'QUIZ' }).exec();
    }

    async getByStudentAndLessonId(lessonId: string, studentId: string): Promise<QuestionMarks[]> {
        return this.questionMarksModel.find({ lessonId, studentId }).exec();
    }

    async getByTo10Students(courseId: string): Promise<any[]> {
        const courseIdObjectId = new mongoose.Types.ObjectId(courseId);

        const topStudentsAggregate = await this.questionMarksModel.aggregate([
            {
                $match: { courseId: courseIdObjectId }
            },
            {
                $group: {
                    _id: "$studentId",
                    studentName: { $first: "$studentName" },
                    mark: { $sum: "$mark" },
                    lessonCount: { $addToSet: "$lessonId" } 
                }
            },
            {
                $addFields: {
                    lessonCount: { $size: "$lessonCount" } 
                }
            },
            {
                $sort: { mark: -1 }
            },
            {
                $limit: 10
            }
        ]);

        if (!topStudentsAggregate || topStudentsAggregate.length === 0) {
            throw new NotFoundException(`QuestionMarks for course with ID ${courseId} not found`);
        }

        return topStudentsAggregate;
    }


    async getDetailsQuestionMarksByStudentId(studentId: string): Promise<any[]> {
        const questionMarks = await this.questionMarksModel
            .find({ studentId }).populate('lessonId').populate('assignmentId').exec();

        if (!questionMarks || questionMarks.length === 0) {
            throw new NotFoundException(`QuestionMarks for student with ID ${studentId} not found`);
        }
        const output = questionMarks.map((qm) => ({
            _id: qm._id,
            totalQuestion: qm.totalQuestion,
            mark: qm.mark,
            totalMark: qm.totalMark,
            negativeMark: qm.negativeMark,
            totalWrong: qm.totalWrong,
            totalCorrect: qm.totalCorrect,
            questionType: qm.questionType,
            studentId: qm.studentId,
            studentName: qm.studentName,
            lessonId: (qm.lessonId as any)._id,
            lessonName: qm.lessonName,
            courseId: qm.courseId,
            assignmentId: (qm.assignmentId as any)._id,
            lesson: qm.lessonId,
            assignment: qm.assignmentId,
        }));

        return output;
    }

    async delete(questionMarksId: string): Promise<void> {
        await this.getById(questionMarksId);
        await this.questionMarksModel.findByIdAndDelete(questionMarksId).exec();
    }
}
