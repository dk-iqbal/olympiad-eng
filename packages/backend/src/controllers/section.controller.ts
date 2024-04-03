// section.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Section } from 'src/schemas/section.schema';
import { SectionService } from 'src/services/section.service';

@ApiTags("Sections")
@Controller('sections')
export class SectionController {
  constructor(private readonly sectionService: SectionService) { }

  @Post("create")
  async create(@Body() section: Section[]): Promise<Section[]> {
    try {
      return await this.sectionService.create(section);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('edit/:id')
  async edit(@Param('id') sectionId: string, @Body() updatedSection: Section): Promise<Section> {
    try {
      return await this.sectionService.edit(sectionId, updatedSection);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("get-all")
  async getAll(): Promise<Section[]> {
    try {
      return await this.sectionService.getAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-by-id/:id')
  async getById(@Param('id') sectionId: string): Promise<Section> {
    try {
      return await this.sectionService.getById(sectionId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('get-by-course/:courseId')
  async getByCourseId(@Param('courseId') courseId: string): Promise<Section[]> {
    try {
      return await this.sectionService.getByCourseId(courseId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-by-status/:isActive')
  async getSectionByStatus(@Param('isActive') isActive: boolean): Promise<Section[]> {
    try {
      return await this.sectionService.getSectionByStatus(isActive);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('get-by-course-and-status/:courseId/:isActive')
  async getSectionByCourseIdAndStatus(
    @Param('courseId') courseId: string,
    @Param('isActive') isActive: boolean
    ): Promise<Section[]> {
    try {
      return await this.sectionService.getSectionByCourseIdAndStatus(courseId, isActive);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Delete('delete/:id')
  async delete(@Param('id') sectionId: string): Promise<void> {
    try {
      return await this.sectionService.delete(sectionId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
