export const COURSE_DETAILS_API = {
  get_course_details: (courseId: string) => `/course-details/course/${courseId}`,
  delete_lesson_details: (lessonId: string) => `/course-details/lesson/${lessonId}`,
  get_course_summary: (courseType: string) => `/course-details/get-course-summary/${courseType}`,
  get_course_by_section: (sectionId: string) => `/course-details/get-course-section/${sectionId}`,
}
