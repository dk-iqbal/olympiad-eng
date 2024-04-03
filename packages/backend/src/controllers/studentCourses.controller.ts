import { Controller, Get, Post, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentCourses } from 'src/schemas/studentCourses.schema';
import { StudentCoursesService } from 'src/services/studentCourses.service';

@ApiTags("StudentCourses")
@Controller('student-courses')
export class StudentCoursesController {
    constructor(private readonly studentCoursesService: StudentCoursesService) {}

    @Post('create')
    async create(@Body() studentCourses: StudentCourses): Promise<StudentCourses> {
        try {
            return await this.studentCoursesService.create(studentCourses);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('get-by-student/:studentId')
    async getByStudentId(@Param('studentId') studentId: string): Promise<StudentCourses[]> {
        try {
            return await this.studentCoursesService.getByStudentId(studentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-by-course/:courseId')
    async getByCourseId(@Param('courseId') courseId: string): Promise<StudentCourses[]> {
        try {
            return await this.studentCoursesService.getByCourseId(courseId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
