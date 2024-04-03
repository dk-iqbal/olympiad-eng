export const ASSIGNMENT_API = {
  assignment_create: `/assignments/create`,
  fetch_all_assignments: `/assignments/get-all`,
  fetch_assignment_by_id: (assignmentId: string) => `/assignments/get-by-id/${assignmentId}`,
  fetch_assignments_by_lesson: (lessonId: string) => `/assignments/get-by-lesson/${lessonId}`,
  edit_assignment: '/assignments/edit',
  delete_assignment: '/assignments/delete'
}
