import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Course } from "src/schemas/course.schema";
import { CourseService } from "src/services/course.service";

@ApiTags("Courses")
@Controller("courses")
export class CourseController {
  constructor(private courseService: CourseService) { }

  @Get("get-all")
  async getAllCourses(): Promise<Course[]> {
    return this.courseService.getAllCourses();
  }

  @Get("get-by-organization-id")
  async findByOrganizationId(
    @Query("organizationId") organizationId?: string
  ): Promise<Course[]> {
    return this.courseService.getCoursesByOrganizationId(organizationId);
  }

  @Get("get-course-by-id")
  async getCourseById(@Query("courseId") courseId?: string, @Query("studentId") studentId?: string | null): Promise<Course> {
    try {
      const course = await this.courseService.getCourseById(courseId, studentId);
      return course;
    } catch (error) {
      throw new HttpException('Failed to retrieve course', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get("get-by-status")
  async findByStatus(
    @Query("status") status?: string,
    @Query("courseType") courseType?: string
  ): Promise<Course[]> {
    return this.courseService.getCoursesByStatusAndType(status, courseType);
  }

  @Get("get-by-instructor-id")
  async findByInstructorId(
    @Query("instructorId") instructorId?: string
  ): Promise<Course[]> {
    return this.courseService.getCoursesByInstructorId(instructorId);
  }

  @Get("get-by-type")
  async findByCourseByType(
    @Query("courseType") courseType?: string
  ): Promise<Course[]> {
    return this.courseService.getCoursesByType(courseType);
  }

  @Post("create")
  @UseInterceptors(FileInterceptor("thumbnail"))
  async createCourse(
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() course: Course
  ): Promise<Course> {
    const existingCourse = await this.courseService.checkCourseNameExists(
      course.name
    );
    if (existingCourse) {
      throw new HttpException("Course already exists!", HttpStatus.FORBIDDEN);
    }
    if (thumbnail) {
      course.thumbnail = thumbnail?.buffer?.toString("base64");
    }
    return this.courseService.create(course);
  }

  @Put("edit/:id")
  @UseInterceptors(FileInterceptor("thumbnail"))
  async editCourse(
    @Param("id") courseId: string,
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() updatedCourse: Course
  ): Promise<Course> {
    try {
      if (
        updatedCourse.thumbnail &&
        !updatedCourse.thumbnail.startsWith("https")
      ) {
        if (thumbnail) {
          updatedCourse.thumbnail = thumbnail?.buffer?.toString("base64");
        }
      }
      return this.courseService.update(courseId, updatedCourse);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          `Course with ID ${courseId} not found`,
          HttpStatus.NOT_FOUND
        );
      }
      throw error;
    }
  }

  @Delete("delete/:id")
  async deleteCourse(@Param("id") courseId: string): Promise<void> {
    try {
      await this.courseService.delete(courseId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          `Course with ID ${courseId} not found`,
          HttpStatus.NOT_FOUND
        );
      }
      throw error;
    }
  }
}
