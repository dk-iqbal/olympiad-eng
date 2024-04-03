export const ENROLMENT_API = {
  create_enrollment: `/enrollments/create`,
  get_all_enrollment: `/enrollments/get-all`,
  edit_enrollment: `/enrollments/edit`, // Note: This endpoint requires appending `/:enrollmentId` when used
  get_enrollment_by_id: (enrollmentId: string) => `/enrollments/${enrollmentId}`,
  get_enrollments_by_student: (studentId: string) => `/enrollments/get-by-student/${studentId}`,
  get_enrollments_by_course: (courseId: string) => `/enrollments/get-by-course/${courseId}`,
  get_enrollments_by_instructor: (instructorId: string) => `/enrollments/get-by-instructor/${instructorId}`,
  get_enrollments_by_student_and_course: (courseId: string, studentId: string) => `/enrollments/get-by-student-and-course/${courseId}/${studentId}`,
  delete_enrollment: `/enrollments/delete`, // Note: This endpoint requires appending `/:enrollmentId` when used
};
