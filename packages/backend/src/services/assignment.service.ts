import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment, AssignmentDocument } from 'src/schemas/assignment.schema';

@Injectable()
export class AssignmentService {
    constructor(
        @InjectModel(Assignment.name) private assignmentModel: Model<AssignmentDocument>,
    ) { }

    async create(assignment: Assignment): Promise<Assignment> {
        await this.checkAssignmentTextNotExists(assignment.assignmentName, assignment.lessonId);
        const createdAssignment = new this.assignmentModel(assignment);
        return createdAssignment.save();
    }

    async edit(assignmentId: string, updatedAssignment: Assignment): Promise<Assignment> {
        await this.checkAssignmentTextNotExists(updatedAssignment.assignmentName, updatedAssignment.lessonId, assignmentId);
        const existingAssignment = await this.assignmentModel.findByIdAndUpdate(assignmentId, updatedAssignment, {
            new: true
        }).exec();

        if (!existingAssignment) {
            throw new NotFoundException(`Assignment with ID ${assignmentId} not found`);
        }
        return existingAssignment;
    }

    async findAll(): Promise<Assignment[]> {
        return this.assignmentModel.find().exec();
    }

    async findById(assignmentId: string): Promise<Assignment> {
        const assignment = await this.assignmentModel.findById(assignmentId).exec();
        if (!assignment) {
            throw new NotFoundException(`Assignment with id ${assignmentId} not found`);
        }
        return assignment;
    }

    async findByLessonId(lessonId: string): Promise<Assignment[]> {
        return this.assignmentModel.find({ lessonId }).exec();
    }

    async delete(assignmentId: string): Promise<void> {
        await this.findById(assignmentId);
        await this.assignmentModel.findByIdAndDelete(assignmentId).exec();
    }

    async deleteByLessonId(lessonId: string): Promise<void> {
        await this.assignmentModel.deleteMany({ lessonId }).exec();
    }

    async checkAssignmentTextNotExists(assignmentName: string, lessonId: any, excludedAssignmentId?: string): Promise<void> {
        const existingAssignment = await this.assignmentModel
            .findOne({ assignmentName, lessonId, _id: { $ne: excludedAssignmentId } })
            .exec();
        if (existingAssignment) {
            throw new ConflictException(`Assignment "${assignmentName}" already exists for the given lesson`);
        }
    }
}
