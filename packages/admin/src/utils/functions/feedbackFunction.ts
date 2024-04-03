import { AxiosResponse } from 'axios'
import { FEEDBACK_API } from 'src/services/api-end-points'
import baseAxios from 'src/services/config'

interface Feedback {
  feedbackText: string
  courseId: string
  courseName?: string
  userId: string
  userName?: string
  rate?: number
  status?: any
  createdAt?: Date
  updatedAt?: Date
}

export const createFeedback = async (feedback: Feedback): Promise<Feedback> => {
  try {
    const response: AxiosResponse<Feedback> = await baseAxios.post(FEEDBACK_API.feedback_create, feedback)

    return response.data
  } catch (error) {
    console.error('Error creating feedback:', error)
    throw error
  }
}

export const editFeedback = async (feedbackId: string, updatedFeedback: Feedback): Promise<Feedback> => {
  try {
    const response: AxiosResponse<Feedback> = await baseAxios.put(
      `${FEEDBACK_API.edit_feedback}/${feedbackId}`,
      updatedFeedback
    )

    return response.data
  } catch (error) {
    console.error('Error editing feedback:', error)
    throw error
  }
}

export const getFeedbackById = async (feedbackId: string): Promise<Feedback> => {
  try {
    const response: AxiosResponse<Feedback> = await baseAxios.get(FEEDBACK_API.fetch_feedback_by_id(feedbackId))

    return response.data
  } catch (error) {
    console.error('Error fetching feedback by ID:', error)
    throw error
  }
}

export const getAllFeedbacks = async (): Promise<Feedback[]> => {
  try {
    const response: AxiosResponse<Feedback[]> = await baseAxios.get(FEEDBACK_API.fetch_all_feedbacks)

    return response.data
  } catch (error) {
    console.error('Error fetching all feedbacks:', error)
    throw error
  }
}

export const getFeedbacksByUser = async (userId: string): Promise<Feedback[]> => {
  try {
    const response: AxiosResponse<Feedback[]> = await baseAxios.get(FEEDBACK_API.fetch_feedbacks_by_user(userId))

    return response.data
  } catch (error) {
    console.error('Error fetching feedbacks by user ID:', error)
    throw error
  }
}

export const getFeedbacksByCourse = async (courseId: string): Promise<Feedback[]> => {
  try {
    const response: AxiosResponse<Feedback[]> = await baseAxios.get(FEEDBACK_API.fetch_feedbacks_by_course(courseId))

    return response.data
  } catch (error) {
    console.error('Error fetching feedbacks by user ID:', error)
    throw error
  }
}

export const getFeedbacksByStatus = async (status: boolean): Promise<Feedback[]> => {
  try {
    const response: AxiosResponse<Feedback[]> = await baseAxios.get(FEEDBACK_API.fetch_feedbacks_by_status(status))

    return response.data
  } catch (error) {
    console.error('Error fetching feedbacks by user ID:', error)
    throw error
  }
}

export const deleteFeedback = async (feedbackId: string): Promise<void> => {
  try {
    await baseAxios.delete(`${FEEDBACK_API.delete_feedback}/${feedbackId}`)
  } catch (error) {
    console.error('Error deleting feedback:', error)
    throw error
  }
}
