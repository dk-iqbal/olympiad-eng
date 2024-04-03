export const LESSON_API = {
  lesson_create: `/lessons/create`,
  fetch_all_lessons: `/lessons/get-all`,
  fetch_lesson_by_id: (lessonId: string) => `/lessons/get-by-id/${lessonId}`,
  fetch_lessons_by_section: (sectionId: string) => `/lessons/get-by-section/${sectionId}`,
  edit_lesson: '/lessons/edit',
  delete_lesson: '/lessons/delete'
}
