import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  StudentCourses,
  StudentCoursesDocument,
} from "src/schemas/studentCourses.schema";

@Injectable()
export class StudentCoursesService {
  constructor(
    @InjectModel(StudentCourses.name)
    private studentCoursesModel: Model<StudentCoursesDocument>
  ) {}

  async create(studentCourses: StudentCourses): Promise<StudentCourses> {
    const createdStudentCourses = new this.studentCoursesModel(studentCourses);
    return createdStudentCourses.save();
  }
  async edit(updatedStudentCourses: any): Promise<StudentCourses> {
    const { courseId, studentId } = updatedStudentCourses;

    const existingStudentCourses = await this.studentCoursesModel
      .findOneAndUpdate({ courseId, studentId }, updatedStudentCourses, {
        new: true,
      })
      .exec();

    if (!existingStudentCourses) {
      throw new NotFoundException(
        `StudentCourses with courseId ${courseId} and studentId ${studentId} not found`
      );
    }

    return existingStudentCourses;
  }

  async getByStudentId(studentId: string): Promise<StudentCourses[]> {
    return this.studentCoursesModel.find({ studentId }).exec();
  }

  async getByCourseId(courseId: string): Promise<StudentCourses[]> {
    return this.studentCoursesModel.find({ courseId }).exec();
  }

  async deleteByEnrollmentId(enrollmentId: string): Promise<void> {
    await this.studentCoursesModel
      .deleteMany({ enrollmentsId: enrollmentId })
      .exec();
  }
}
