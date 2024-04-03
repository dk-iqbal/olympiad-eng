import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Course, CourseDocument } from "src/schemas/course.schema";
import { UserService } from "./user.service";
import { LessonService } from "./lesson.service";
import { CloudinaryService } from "./cloudinary.service";
import { Readable } from "stream";
import { CourseRoutineService } from "./courseRoutine.service";
import { EnrollmentsService } from "./enrollments.service";
import { SectionService } from "./section.service";

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    private readonly userService: UserService,
    private readonly courseRoutineService: CourseRoutineService,
    private readonly lessonService: LessonService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly enrollmentsService: EnrollmentsService,
    private readonly sectionService: SectionService,
  ) { }

  // async create(course: Course): Promise<Course> {
  //   await this.checkCourseNameExists(course.name);
  //   const thumbnailUrl = await this.cloudinaryService.uploadImage(course.thumbnail);
  //   course.thumbnail = thumbnailUrl;
  //   const createdCourse = new this.courseModel(course);
  //   return createdCourse.save();
  // }

  async create(course: Course): Promise<Course> {
    try {
      await this.checkCourseNameExists(course.name);
      if (course.thumbnail) {
        const thumbnailStream = new Readable();
        thumbnailStream.push(Buffer.from(course.thumbnail, "base64"));
        thumbnailStream.push(null);

        const thumbnailUrl = await this.cloudinaryService.uploadImage(
          thumbnailStream
        );
        course.thumbnail = thumbnailUrl;
      }
      const createdCourse = new this.courseModel(course);
      return createdCourse.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async update(courseId: string, updatedCourse: Course): Promise<Course> {
    await this.checkCourseNameExists(updatedCourse.name, courseId);

    if (
      updatedCourse.thumbnail &&
      !updatedCourse.thumbnail?.startsWith("https")
    ) {
      const thumbnailStream = new Readable();
      thumbnailStream.push(Buffer.from(updatedCourse.thumbnail, "base64"));
      thumbnailStream.push(null);

      const thumbnailUrl = await this.cloudinaryService.uploadImage(
        thumbnailStream
      );
      if (updatedCourse.thumbnail) {
        updatedCourse.thumbnail = thumbnailUrl;
      }
    }

    const existingCourse = await this.courseModel.findByIdAndUpdate(
      courseId,
      updatedCourse,
      { new: true }
    );

    if (!existingCourse) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    return existingCourse;
  }

  async getCourseById(courseId: string, studentId?: string | null): Promise<any> {
    const course = await this.courseModel.findById(courseId).exec();
  
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    let enrollments;
    if (studentId) {
        enrollments = await this.enrollmentsService.getByStudentAndCourseId(courseId, studentId)
    }
  
    const multiInstructor = course?.multiInstructorIds
      ? await Promise.all(
          JSON.parse(course?.multiInstructorIds)?.map(async (item) => {
            return this.userService.getById(item?.value);
          })
        )
      : null;
  
    const instructorInfo = await this.userService.getById(
      course?.instructorId as any
    );
  
    const routineInfo = await this.courseRoutineService.getByCourseId(course?._id as any) || null;

    const sections = await this.sectionService.getByCourseId(course?._id as any) || null;  
    const firstLesson = await this.lessonService.getBySectionId((sections[0] as any)?._id) || null;
  
    return {
      course,
      lesson: firstLesson[0],
      courseInstructor: multiInstructor?.length > 0 ? multiInstructor : [instructorInfo],
      courseRoutine: routineInfo || null,
      hasRoutines: !!routineInfo, 
      hasMultiInstructors: !!multiInstructor,
      isAuthUser: course?.isFree ? true : enrollments?.isAmountPaid ? true : false
    };
  }
  

  async getCoursesByOrganizationId(organizationId: string): Promise<Course[]> {
    const courses = await this.courseModel.find({ organizationId }).exec();
    if (!courses || courses.length === 0) {
      throw new NotFoundException(
        `No courses found for organization with ID ${organizationId}`
      );
    }
    return courses;
  }

  async getCoursesByStatusAndType(status?: string, courseType?: string
  ): Promise<Course[]> {
    const query: any = {};
    if (status) {
      query.status = status;
    }
    if (courseType) {
      query.courseType = courseType;
    }
    const courses = await this.courseModel.find(query).exec();
    if (!courses || courses.length === 0) {
      throw new NotFoundException(
        `No courses found for ${status ? `status: ${status}` : ""}${status && courseType ? " and " : ""
        }${courseType ? `courseType: ${courseType}` : ""}`
      );
    }
    return courses;
  }

  async getCoursesByInstructorId(instructorId: string): Promise<Course[]> {
    const courses = await this.courseModel
      .find({ instructor: instructorId })
      .exec();
    if (!courses || courses.length === 0) {
      throw new NotFoundException(
        `No courses found for instructor with ID ${instructorId}`
      );
    }
    return courses;
  }

  async getCoursesByType(courseType: string): Promise<Course[]> {
    const courses = await this.courseModel
      .find({ courseType: courseType })
      .exec();
    if (!courses || courses.length === 0) {
      throw new NotFoundException(
        `No courses found for instructor with ID ${courseType}`
      );
    }
    return courses;
  }

  async delete(courseId: string): Promise<void> {
    const deletedCourse = await this.courseModel
      .findByIdAndDelete(courseId)
      .exec();

    if (!deletedCourse) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
  }

  async checkCourseNameExists(
    name: string,
    courseId?: string
  ): Promise<Course> {
    const existingCourse = await this.courseModel.findOne({
      name,
      _id: { $ne: courseId },
    });
    if (existingCourse) {
      throw new Error(`Course is '${name}' already exists`);
    }
    return existingCourse;
  }

  async getTotalCourses(courseType: string): Promise<number> {
    const totalCourses = await this.courseModel.countDocuments({ courseType });
    return totalCourses;
  }

  async getTotalActiveCourses(courseType: string): Promise<number> {
    const totalActiveCourses = await this.courseModel.countDocuments({ courseType, status: 'Approved' });
    return totalActiveCourses;
  }

  async getTotalPendingCourses(courseType: string): Promise<number> {
    const totalPendingCourses = await this.courseModel.countDocuments({ courseType, status: 'Pending' });
    return totalPendingCourses;
  }


  async getTotalFreeCourses(courseType: string): Promise<number> {
    const totalPendingCourses = await this.courseModel.countDocuments({ courseType, isFree: true });
    return totalPendingCourses;
  }

  async getTotalPaidCourses(courseType: string): Promise<number> {
    const totalPendingCourses = await this.courseModel.countDocuments({ courseType, isFree: false });
    return totalPendingCourses;
  }

}
