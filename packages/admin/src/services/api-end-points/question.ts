export const QUESTION_API = {
  question_create: `/questions/create`,
  fetch_all_questions: `/questions/get-all`,
  fetch_question_by_id: (questionId: string) => `/questions/get-by-id/${questionId}`,
  fetch_questions_by_lesson: (lessonId: string) => `/questions/get-by-lesson/${lessonId}`,
  edit_question: '/questions/edit',
  delete_question: '/questions/delete'
}
