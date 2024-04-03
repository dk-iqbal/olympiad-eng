import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Lesson } from 'src/schemas/lesson.schema';
import { LessonService } from 'src/services/lesson.service';

@ApiTags("Lessons")
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }

  @Post('create')
  @UseInterceptors(FileInterceptor("thumbnail"))
  async create(@UploadedFile() thumbnail: Express.Multer.File, @Body() lesson: Lesson): Promise<Lesson> {
    try {
      if (thumbnail) {
        lesson.thumbnail = thumbnail.buffer.toString("base64");
      }
      return await this.lessonService.create(lesson);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('edit/:id')
  @UseInterceptors(FileInterceptor("thumbnail"))
  async edit(
    @Param('id') lessonId: string,
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() updatedLesson: Lesson): Promise<Lesson> {
    try {
      if (thumbnail && !updatedLesson.thumbnail.startsWith("https")) {
        updatedLesson.thumbnail = thumbnail.buffer.toString("base64");
      }
      return await this.lessonService.edit(lessonId, updatedLesson);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-all')
  async getAll(): Promise<Lesson[]> {
    try {
      return await this.lessonService.getAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') lessonId: string): Promise<Lesson> {
    try {
      return await this.lessonService.getById(lessonId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('get-by-section/:sectionId')
  async getBySectionId(@Param('sectionId') sectionId: string): Promise<Lesson[]> {
    try {
      return await this.lessonService.getBySectionId(sectionId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') lessonId: string): Promise<void> {
    try {
      return await this.lessonService.delete(lessonId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
