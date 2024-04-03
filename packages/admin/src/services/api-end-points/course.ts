export const COURSE_API = {
  course_create: `/courses/create`,
  fetch_all_courses: `/courses/get-all`,
  fetch_courses_by_organization: (organizationId: string) =>
    `/courses/find-by-organization-id?organizationId=${organizationId}`,
  fetch_course_by_type: (courseType: string) => `/courses/get-by-type?courseType=${courseType}`,
  fetch_courses_by_instructor: (instructorId: string) => `/courses/get-by-instructor-id?instructorId=${instructorId}`,
  fetch_course_by_id: (courseId: string) => `/courses/${courseId}`,
  fetch_course_by_status: (status: string, courseType: string) =>
    `/courses/get-by-status?status=${status}&courseType=${courseType}`,
  edit_course: '/courses/edit',
  delete_course: '/courses/delete'
}
