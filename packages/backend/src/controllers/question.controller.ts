import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Question } from 'src/schemas/question.schema';
import { QuestionService } from 'src/services/question.service';

@ApiTags("Questions")
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post("create")
  async create(@Body() questions: Question[]): Promise<Question[]> {
    try {
      return await this.questionService.create(questions);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('edit')
  async edit(@Body() updatedQuestions: { questionId: string, updatedQuestion: Question }[]): Promise<Question[]> {
    try {
      return await this.questionService.edit(updatedQuestions);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("get-all")
  async getAll(): Promise<Question[]> {
    try {
      return await this.questionService.getAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') questionId: string): Promise<Question> {
    try {
      return await this.questionService.getById(questionId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('get-by-lesson/:lessonId')
  async getByLessonId(@Param('lessonId') lessonId: string): Promise<Question[]> {
    try {
      return await this.questionService.getByLessonId(lessonId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') questionId: string): Promise<void> {
    try {
      return await this.questionService.delete(questionId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
