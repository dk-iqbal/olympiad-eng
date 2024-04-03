import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Enrollments } from "src/schemas/enrollments.schema";
import { EnrollmentsService } from "src/services/enrollments.service";

@ApiTags("Enrollments")
@Controller("enrollments")
export class EnrollmentsController {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @Get("get-all")
  async getAllEnrollments(): Promise<Enrollments[]> {
    return this.enrollmentsService.getAllEnrollments();
  }

  @Post("create")
  async create(@Body() enrollment: Enrollments): Promise<Enrollments> {
    try {
      return await this.enrollmentsService.create(enrollment);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put("edit/:enrollmentId")
  async edit(
    @Param("enrollmentId") enrollmentId: string,
    @Body() updatedEnrollment: Enrollments
  ): Promise<Enrollments> {
    try {
      return await this.enrollmentsService.edit(
        enrollmentId,
        updatedEnrollment
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":enrollmentId")
  async getById(
    @Param("enrollmentId") enrollmentId: string
  ): Promise<Enrollments> {
    try {
      return await this.enrollmentsService.getById(enrollmentId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get("get-by-student/:studentId")
  async getByStudentId(
    @Param("studentId") studentId: string
  ): Promise<Enrollments[]> {
    try {
      return await this.enrollmentsService.getByStudentId(studentId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("get-by-course/:courseId")
  async getByCourseId(
    @Param("courseId") courseId: string
  ): Promise<Enrollments[]> {
    try {
      return await this.enrollmentsService.getByCourseId(courseId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("get-by-instructor/:instructorId")
  async getByInstructorId(
    @Param("instructorId") instructorId: string
  ): Promise<Enrollments[]> {
    try {
      return await this.enrollmentsService.getByInstructorId(instructorId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("get-by-student-and-course/:courseId/:studentId")
  async getByStudentAndCourseId(
    @Param("courseId") courseId: string,
    @Param("studentId") studentId: string
  ): Promise<Enrollments> {
    try {
      return await this.enrollmentsService.getByStudentAndCourseId(
        courseId,
        studentId
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("delete/:enrollmentId")
  async delete(@Param("enrollmentId") enrollmentId: string): Promise<void> {
    try {
      return await this.enrollmentsService.delete(enrollmentId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
