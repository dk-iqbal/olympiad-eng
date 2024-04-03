// course-details.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';
import { SectionService } from './section.service';
import { LessonService } from './lesson.service';
import { QuestionService } from './question.service';
import { AssignmentService } from './assignment.service';
import { EnrollmentsService } from './enrollments.service';
import { UserService } from './user.service';

@Injectable()
export class CourseDetailsService {
    constructor(
        private readonly courseService: CourseService,
        private readonly sectionService: SectionService,
        private readonly lessonService: LessonService,
        private readonly questionService: QuestionService,
        private readonly assignmentService: AssignmentService,
        private readonly enrollmentsService: EnrollmentsService,
        private readonly userService: UserService,
    ) { }

    async getCourseDetails(courseId: string) {
        const course = await this.courseService.getCourseById(courseId);
        const sections = await this.sectionService.getByCourseId(courseId);

        const courseDetails = {
            id: (course as any)?.course?._id || (course as any)?.course?.id,
            courseName: course?.course?.name,
            organizationId: course?.course?.organizationId,
            courseType: course?.course?.courseType,
            sections: await Promise.all(
                sections.map(async (section: any) => {
                    const lessons = await this.lessonService.getBySectionId(section.id);

                    const sectionDetails = {
                        id: section._id,
                        name: section.name,
                        isActive: section.isActive,
                        positions: section.positions,
                        duration: section.duration,
                        courseId: section.courseId,
                        lessons: await Promise.all(
                            lessons.map(async (lesson: any) => {
                                const lessonDetails = {
                                    id: lesson._id,
                                    name: lesson.name,
                                    sectionId: lesson.sectionId,
                                    sectionName: lesson.sectionName,
                                    duration: lesson.duration,
                                    lessonURL: lesson.lessonURL,
                                    thumbnail: lesson.thumbnail,
                                    isFree: lesson.isFree,
                                    positions: lesson.positions,
                                    isModelTest: lesson.isModelTest,
                                    passingMarks: lesson.passingMarks,
                                    examTime: lesson.examTime,
                                    isNegativeMarks: lesson.isNegativeMarks,
                                    negativeMarks: lesson.negativeMarks,
                                    isActive: lesson.isActive,
                                    info: lesson.info,
                                    questions: await this.questionService.getByLessonId(lesson._id),
                                    assignments: await this.assignmentService.findByLessonId(lesson._id),
                                };

                                return lessonDetails;
                            }),
                        ),
                    };

                    return sectionDetails;
                }),
            ),
        };

        return courseDetails;
    }

    async getCourseWiseSection(courseId: string, studentId?: string | null) {
        const course = await this.courseService.getCourseById(courseId);
        const sections = await this.sectionService.getByCourseId(courseId);
        let enrollments;
        let student;
        if (studentId) {
            enrollments = await this.enrollmentsService.getByStudentAndCourseId(courseId, studentId)
            student = await this.userService.getById(studentId)
        }
        const isAuthUser = (course?.course?.isFree && student?.name)

        const courseDetails = {
            id: (course as any)?.course._id || (course as any)?.course.id,
            courseName: course?.course?.name,
            isAuthUserCourse: isAuthUser ? true : enrollments?.isAmountPaid ? true : false,
            organizationId: course?.course?.organizationId,
            courseType: course?.course?.courseType,
            sections: await Promise.all(
                sections.map(async (section: any) => {
                    const lessons = await this.lessonService.getSectionById(section.id);

                    const sectionDetails = {
                        id: section._id,
                        name: section.name,
                        isActive: section.isActive,
                        positions: section.positions,
                        duration: section.duration,
                        isAuthUserCourse: isAuthUser ? true : enrollments?.isAmountPaid ? true : false,
                        courseId: section.courseId,
                        lessons: await Promise.all(
                            lessons.map(async (lesson: any) => {
                                const lessonDetails = {
                                    id: lesson._id,
                                    name: lesson.name,
                                    duration: lesson.duration,
                                    lessonURL: lesson.lessonURL,
                                    thumbnail: lesson.thumbnail,
                                    isFree: lesson.isFree,
                                    isAuthUser: isAuthUser ? true : enrollments?.isAmountPaid ? true : false,
                                    positions: lesson.positions,
                                    isModelTest: lesson.isModelTest,
                                    isActive: lesson.isActive,
                                };

                                return lessonDetails;
                            }),
                        ),
                    };

                    return sectionDetails;
                }),
            ),
        };

        return courseDetails;
    }

    async getLessonDetails(lessonId: string) {
        const lesson = await this.lessonService.getById(lessonId);

        if (!lesson) {
            throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
        }

        const lessonDetails = {
            id: (lesson as any)._id,
            name: lesson.name,
            sectionId: lesson.sectionId,
            sectionName: lesson.sectionName,
            duration: lesson.duration,
            lessonURL: lesson.lessonURL,
            thumbnail: lesson.thumbnail,
            isFree: lesson.isFree,
            positions: lesson.positions,
            isModelTest: lesson.isModelTest,
            passingMarks: lesson.passingMarks || 0,
            examTime: lesson.examTime,
            isNegativeMarks: lesson.isNegativeMarks,
            negativeMarks: lesson.negativeMarks,
            isActive: lesson.isActive,
            info: lesson.info,
            questions: await this.questionService.getByLessonId((lesson as any)._id),
            assignments: await this.assignmentService.findByLessonId((lesson as any)._id),
        };

        return lessonDetails;
    }


    async deleteLessonWithQuestionsAssignment(lessonId: string): Promise<void> {
        // Check if the lesson exists
        const existingLesson = await this.lessonService.getById(lessonId);
        if (!existingLesson) {
            throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
        }
        await this.questionService.deleteByLessonId(lessonId);

        await this.assignmentService.deleteByLessonId(lessonId);

        // Now, delete the lesson itself
        await this.lessonService.delete(lessonId);
    }

    async getCoursesSummary(courseType: string): Promise<any> {
        const totalCourse = await this.courseService.getTotalCourses(courseType);
        const totalLesson = await this.lessonService.getTotalLessons();
        const totalEnrollment = await this.enrollmentsService.getTotalEnrolments();
        const totalActiveCourse = await this.courseService.getTotalActiveCourses(courseType);
        const totalPendingCourse = await this.courseService.getTotalPendingCourses(courseType);
        const totalFreeCourse = await this.courseService.getTotalFreeCourses(courseType);
        const totalPaidCourse = await this.courseService.getTotalPaidCourses(courseType);

        return {
            totalCourse,
            totalLesson,
            totalEnrollment,
            totalStudent: totalEnrollment,
            totalActiveCourse,
            totalPendingCourse,
            totalFreeCourse,
            totalPaidCourse,
        };
    }
}
