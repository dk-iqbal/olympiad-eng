export const COURSE_API = {
  fetch_all_courses: `/courses/get-all`,
  fetch_courses_by_organization: (organizationId: string) => `/courses/find-by-organization-id?organizationId=${organizationId}`,
  fetch_course_by_type: (courseType: string) => `/courses/get-by-type?courseType=${courseType}`,
  fetch_course_by_id: `/courses/get-course-by-id/`,
  fetch_course_by_status: (status: string, courseType: string) => `/courses/get-by-status?status=${status}&courseType=${courseType}`,
  fetch_student_course_report_details: (courseId: string, studentId?: string) => studentId ? `/questionMarks/get-by-courseId/${courseId}/${studentId}`: `/questionMarks/get-by-courseId/${courseId}`,
  fetch_report_by_course_and_student: (courseId: string, studentId?: string) =>  studentId ? `/enrollments/get-by-student-and-course/${courseId}/${studentId}` : `/enrollments/get-by-student-and-course/${courseId}`,
  fetch_highest_student_by_course: (courseId: string) => `/questionMarks/get-by-top-students/${courseId}`,
  fetch_course_by_courseId_and_studentId: (
    courseId: string,
    studentId?: string | null
  ) => studentId ? `/course-details/get-course-section/${courseId}/${studentId}` : `/course-details/get-course-section/${courseId}`,
  fetch_lesson_by_section: (sectionId: string) => `/course-details/get-lesson/${sectionId}`,
  fetch_course_by_student: (studentId: string) => `/student-courses/get-by-student/${studentId}`,
};
