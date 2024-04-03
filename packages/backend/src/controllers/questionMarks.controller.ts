import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuestionMarks } from 'src/schemas/questionMarks.schema';
import { QuestionMarksService } from 'src/services/questionMarks.service';
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("QuestionMarks")
@Controller('questionMarks')
export class QuestionMarksController {
    constructor(private readonly questionMarksService: QuestionMarksService) { }

    @Post('create')
    @UseInterceptors(FileInterceptor("assignmentFile"))
    async create(
        @UploadedFile() assignmentFile: Express.Multer.File,
        @Body() questionMarks: QuestionMarks
    ): Promise<QuestionMarks> {
        try {
            if (assignmentFile) {
                questionMarks.assignmentFile = assignmentFile?.buffer?.toString("base64");
            }
            return await this.questionMarksService.create(questionMarks);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('edit/:questionMarksId')
    async edit(@Param('questionMarksId') questionMarksId: string, @Body() updatedQuestionMarks: QuestionMarks): Promise<QuestionMarks> {
        try {
            return await this.questionMarksService.edit(questionMarksId, updatedQuestionMarks);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':questionMarksId')
    async getById(@Param('questionMarksId') questionMarksId: string): Promise<QuestionMarks> {
        try {
            return await this.questionMarksService.getById(questionMarksId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('get-by-student/:studentId')
    async getByStudentId(@Param('studentId') studentId: string): Promise<QuestionMarks[]> {
        try {
            return await this.questionMarksService.getByStudentId(studentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-by-courseId/:courseId/:studentId')
    async getByStudentAndCourseId(@Param('courseId') courseId: string, @Param('studentId') studentId: string): Promise<QuestionMarks[]> {
        try {
            return await this.questionMarksService.getByStudentAndCourseId(courseId, studentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-by-top-students/:courseId')
    async getByTo10Students(@Param('courseId') courseId: string): Promise<QuestionMarks[]> {
        try {
            return await this.questionMarksService.getByTo10Students(courseId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-by-lessonId/:lessonId/:studentId')
    async getByStudentAndLessonId(@Param('lessonId') lessonId: string, @Param('studentId') studentId: string): Promise<QuestionMarks[]> {
        try {
            return await this.questionMarksService.getByStudentAndLessonId(lessonId, studentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-details-by-studentId/:studentId')
    async getDetailsQuestionMarksByStudentId(@Param('studentId') studentId: string): Promise<QuestionMarks[]> {
        try {
            return await this.questionMarksService.getDetailsQuestionMarksByStudentId(studentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Delete('delete/:questionMarksId')
    async delete(@Param('questionMarksId') questionMarksId: string): Promise<void> {
        try {
            return await this.questionMarksService.delete(questionMarksId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
