import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Assignment } from 'src/schemas/assignment.schema';
import { AssignmentService } from 'src/services/assignment.service';

@ApiTags("Assignments")
@Controller('assignments')
export class AssignmentController {
    constructor(private readonly assignmentService: AssignmentService) {}

    @Post('create')
    async create(@Body() assignment: Assignment): Promise<Assignment> {
        try {
            return await this.assignmentService.create(assignment);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('edit/:id')
    async edit(@Param('id') assignmentId: string, @Body() updatedAssignment: Assignment): Promise<Assignment> {
        try {
            return await this.assignmentService.edit(assignmentId, updatedAssignment);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('get-all')
    async getAll(): Promise<Assignment[]> {
        try {
            return await this.assignmentService.findAll();
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('get-by-id/:id')
    async getById(@Param('id') assignmentId: string): Promise<Assignment> {
        try {
            return await this.assignmentService.findById(assignmentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('get-by-lesson/:lessonId')
    async getByLessonId(@Param('lessonId') lessonId: string): Promise<Assignment[]> {
        try {
            return await this.assignmentService.findByLessonId(lessonId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('delete/:id')
    async delete(@Param('id') assignmentId: string): Promise<void> {
        try {
            await this.assignmentService.delete(assignmentId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
