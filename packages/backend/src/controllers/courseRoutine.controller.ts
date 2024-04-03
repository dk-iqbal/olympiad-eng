import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseRoutine } from 'src/schemas/courseRoutine.schema';
import { CourseRoutineService } from 'src/services/courseRoutine.service';

@ApiTags('CourseRoutines')
@Controller('course-routines')
export class CourseRoutineController {
  constructor(private readonly courseRoutineService: CourseRoutineService) {}

  @Post('create')
  async create(@Body() courseRoutine: CourseRoutine): Promise<CourseRoutine> {
    try {
      return await this.courseRoutineService.create(courseRoutine);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('edit/:id')
  async edit(@Param('id') courseRoutineId: string, @Body() updatedCourseRoutine: CourseRoutine): Promise<CourseRoutine> {
    try {
      return await this.courseRoutineService.edit(courseRoutineId, updatedCourseRoutine);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-all')
  async getAll(): Promise<CourseRoutine[]> {
    try {
      return await this.courseRoutineService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') courseRoutineId: string): Promise<CourseRoutine> {
    try {
      return await this.courseRoutineService.findById(courseRoutineId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('get-by-courseId/:courseId')
  async getByCourseId(@Param('courseId') courseId: string): Promise<CourseRoutine> {
    try {
      return await this.courseRoutineService.getByCourseId(courseId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') courseRoutineId: string): Promise<void> {
    try {
      await this.courseRoutineService.delete(courseRoutineId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
