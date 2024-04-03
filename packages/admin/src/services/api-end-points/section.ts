export const SECTION_API = {
  section_create: `/sections/create`,
  fetch_all_sections: `/sections/get-all`,
  fetch_section_by_id: (sectionId: string) => `/sections/get-by-id/${sectionId}`,
  fetch_sections_by_course: (courseId: string) => `/sections/get-by-course/${courseId}`,
  fetch_sections_by_status: (isActive: boolean) => `/sections/get-by-status/${isActive}`,
  fetch_sections_by_course_and_status: (courseId: string, isActive: boolean) => `/sections/get-by-course-and-status/${courseId}/${isActive}`,
  edit_section: '/sections/edit',
  delete_section: '/sections/delete'
}
