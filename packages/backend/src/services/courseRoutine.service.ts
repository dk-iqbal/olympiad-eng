import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseRoutine, CourseRoutineDocument } from 'src/schemas/courseRoutine.schema';

@Injectable()
export class CourseRoutineService {
  constructor(
    @InjectModel(CourseRoutine.name) private courseRoutineModel: Model<CourseRoutineDocument>,
  ) {}

  async create(courseRoutine: CourseRoutine): Promise<CourseRoutine> {
    await this.checkCourseRoutineNameNotExists(courseRoutine.name, courseRoutine.courseId);
    const createdCourseRoutine = new this.courseRoutineModel(courseRoutine);
    return createdCourseRoutine.save();
  }

  async edit(courseRoutineId: string, updatedCourseRoutine: CourseRoutine): Promise<CourseRoutine> {
    await this.checkCourseRoutineNameNotExists(
      updatedCourseRoutine.name,
      updatedCourseRoutine.courseId,
      courseRoutineId,
    );
    const existingCourseRoutine = await this.courseRoutineModel
      .findByIdAndUpdate(courseRoutineId, updatedCourseRoutine, {
        new: true,
      })
      .exec();

    if (!existingCourseRoutine) {
      throw new NotFoundException(`CourseRoutine with ID ${courseRoutineId} not found`);
    }
    return existingCourseRoutine;
  }

  async findAll(): Promise<CourseRoutine[]> {
    return this.courseRoutineModel.find().exec();
  }

  async findById(courseRoutineId: string): Promise<CourseRoutine> {
    const courseRoutine = await this.courseRoutineModel.findById(courseRoutineId).exec();
    if (!courseRoutine) {
      throw new NotFoundException(`CourseRoutine with id ${courseRoutineId} not found`);
    }
    return courseRoutine;
  }

  // async getByCourseId(courseId: string): Promise<CourseRoutine | null> {
  //   const courseRoutine = await this.courseRoutineModel.findOne({ courseId }).exec();
    
  //   if (!courseRoutine) {
  //     throw new NotFoundException(`No CourseRoutine found for courseId: ${courseId}`);
  //   }
  //   return courseRoutine;
  // }

  async getByCourseId(courseId: string): Promise<CourseRoutine | null> {
    try {
      const courseRoutine = await this.courseRoutineModel.findOne({ courseId }).exec();
      if (!courseRoutine) {
        return null;
      }
      return courseRoutine;
    } catch (error) {
      throw error;
    }
  }

  async delete(courseRoutineId: string): Promise<void> {
    await this.findById(courseRoutineId);
    await this.courseRoutineModel.findByIdAndDelete(courseRoutineId).exec();
  }

  async checkCourseRoutineNameNotExists(
    name: string,
    courseId: any,
    excludedCourseRoutineId?: string,
  ): Promise<void> {
    const existingCourseRoutine = await this.courseRoutineModel
      .findOne({ name, courseId, _id: { $ne: excludedCourseRoutineId } })
      .exec();
    if (existingCourseRoutine) {
      throw new ConflictException(`CourseRoutine "${name}" already exists for the given course`);
    }
  }
}
