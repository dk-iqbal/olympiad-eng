import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseProgress } from 'src/schemas/courseProgress.schema';
import { CourseProgressService } from 'src/services/courseProgress.service';

@ApiTags("CourseProgress")
@Controller('courseProgress')
export class CourseProgressController {
    constructor(private readonly courseProgressService: CourseProgressService) { }

    @Post('create')
    async create(@Body() courseProgress: CourseProgress): Promise<CourseProgress> {
        try {
            return await this.courseProgressService.create(courseProgress);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('edit/:courseProgressId')
    async edit(@Param('courseProgressId') courseProgressId: string, @Body() updatedCourseProgress: CourseProgress): Promise<CourseProgress> {
        try {
            return await this.courseProgressService.edit(courseProgressId, updatedCourseProgress);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':courseProgressId')
    async getById(@Param('courseProgressId') courseProgressId: string): Promise<CourseProgress> {
        try {
            return await this.courseProgressService.getById(courseProgressId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('get-by-student/:studentId')
    async getByStudentId(@Param('studentId') studentId: string): Promise<CourseProgress[]> {
        try {
            return await this.courseProgressService.getByStudentId(studentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-by-course/:courseId')
    async getByCourseId(@Param('courseId') courseId: string): Promise<CourseProgress[]> {
        try {
            return await this.courseProgressService.getByCourseId(courseId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-by-lesson/:lessonId')
    async getByLessonId(@Param('lessonId') lessonId: string): Promise<CourseProgress[]> {
        try {
            return await this.courseProgressService.getByLessonId(lessonId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('delete/:courseProgressId')
    async delete(@Param('courseProgressId') courseProgressId: string): Promise<void> {
        try {
            return await this.courseProgressService.delete(courseProgressId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
