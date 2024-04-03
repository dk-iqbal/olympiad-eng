import { Controller, Delete, Get, Param, HttpException, HttpStatus, Put, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseDetailsService } from 'src/services/courseDetails.service';

@ApiTags("CoursesDetails")
@Controller('course-details')
export class CourseDetailsController {
    constructor(private readonly courseDetailsService: CourseDetailsService) { }

    @Get('course/:id')
    async getCourseDetails(@Param('id') courseId: string) {
        try {
            const courseDetails = await this.courseDetailsService.getCourseDetails(courseId);
            return courseDetails;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }


    @Get('get-course-section/:id/:studentId?')
    async getCourseWiseSection(
        @Param('id') courseId: string,
        @Param('studentId') studentId: string | null = null
        ) {
        try {
            const courseDetails = await this.courseDetailsService.getCourseWiseSection(courseId, studentId);
            return courseDetails;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('get-lesson/:id')
    async getLessonDetails(@Param('id') lessonId: string) {
        try {
            const courseDetails = await this.courseDetailsService.getLessonDetails(lessonId);
            return courseDetails;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete('lesson/:id')
    async deleteLesson(@Param('id') lessonId: string) {
        try {
            await this.courseDetailsService.deleteLessonWithQuestionsAssignment(lessonId);
            return { success: true, message: 'Lesson and associated questions/assignments deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Get('get-course-summary/:courseType')
    async getCoursesSummary(@Param('courseType') courseType: string) {
        try {
            const courseDetails = await this.courseDetailsService.getCoursesSummary(courseType);
            return courseDetails;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
