export interface CourseVideoProps {
  _id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  instructorId: string;
  instructorName: string;
  price: number;
  description: string;
  isDiscount: boolean;
  isFree: boolean;
  discount: number;
  courseProvider: string;
  info: string;
  courseOverview: string;
  thumbnail?: string;
  organizationId?: string;
  courseType?: string;
}

export interface CourseInstructorProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  info: {
    degree: string;
    socialLink: string;
  };
  image: string;
}

export interface CourseRoutineProps {
  _id: string;
  name: string;
  routines: string;
  courseId: string;
  courseName: string;
  isActive: boolean;
}

export interface LessonProps {
  _id: string;
  name: string;
  sectionId: string;
  lessonURL: string;
  thumbnail: string;
  duration: number;
  isFree: boolean;
  isActive: boolean;
  info: string;
  questions?: [object]
  assignments?: [object]
}

export interface CourseOverviewProps {
  course: CourseVideoProps;
  lesson: LessonProps;
  courseInstructor: CourseInstructorProps[];
  courseRoutine: CourseRoutineProps;
  isAuthUser: boolean;
}

export interface CourseDetailsProps {
  course: CourseVideoProps;
  lesson: LessonProps;
}
