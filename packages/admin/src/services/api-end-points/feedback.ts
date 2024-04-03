export const FEEDBACK_API = {
  feedback_create: `/feedbacks/create`,
  fetch_all_feedbacks: `/feedbacks/get-all`,
  fetch_feedback_by_id: (feedbackId: string) => `/feedbacks/get-by-id/${feedbackId}`,
  fetch_feedbacks_by_user: (userId: string) => `/feedbacks/get-by-user/${userId}`,
  fetch_feedbacks_by_course: (courseId: string) => `/feedbacks/get-by-course/${courseId}`,
  fetch_feedbacks_by_status: (status: boolean) => `/feedbacks/get-feedback-by-status/${status}`,
  edit_feedback: '/feedbacks/edit',
  delete_feedback: '/feedbacks/delete'
}
