import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from 'src/schemas/question.schema';

@Injectable()
export class QuestionService {
    constructor(
        @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    ) { }

    async create(questions: Question[]): Promise<Question[]> {
        const createdQuestions: Question[] = [];
        for (const question of questions) {
            await this.checkQuestionTextNotExists(question.questionName, question.lessonId);
            const createdQuestion = new this.questionModel(question);
            createdQuestions.push(await createdQuestion.save());
        }
        return createdQuestions;
    }

    async edit(questions: { questionId: string, updatedQuestion: Question }[]): Promise<Question[]> {
        const updatedQuestions: Question[] = [];

        for (const { questionId, updatedQuestion } of questions) {
            await this.checkQuestionTextNotExists(updatedQuestion.questionName, updatedQuestion.lessonId, questionId);
            const existingQuestion = await this.questionModel.findByIdAndUpdate(questionId, updatedQuestion, {
                new: true
            }).exec();

            if (!existingQuestion) {
                throw new NotFoundException(`Question with ID ${questionId} not found`);
            }
            updatedQuestions.push(existingQuestion);
        }
        return updatedQuestions;
    }

    async getAll(): Promise<Question[]> {
        return this.questionModel.find().exec();
    }

    async getById(questionId: string): Promise<Question> {
        const question = await this.questionModel.findById(questionId).exec();
        if (!question) {
            throw new NotFoundException(`Question with id ${questionId} not found`);
        }
        return question;
    }

    async getByLessonId(lessonId: string): Promise<Question[]> {
        return this.questionModel.find({ lessonId }).exec();
    }

    async delete(questionId: string): Promise<void> {
        await this.getById(questionId);
        await this.questionModel.findByIdAndDelete(questionId).exec();
    }

    async deleteByLessonId(lessonId: string): Promise<void> {
        await this.questionModel.deleteMany({ lessonId }).exec();
    }

    private async checkQuestionTextNotExists(text: string, lessonId: any, excludedQuestionId?: string): Promise<void> {
        const existingQuestion = await this.questionModel
            .findOne({ text, lessonId, _id: { $ne: excludedQuestionId } })
            .exec();

        if (existingQuestion) {
            throw new ConflictException(`Question "${text}" already exists for the given lesson`);
        }
    }
}
