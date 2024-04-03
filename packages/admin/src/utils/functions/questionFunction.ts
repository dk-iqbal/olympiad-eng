import { AxiosResponse } from 'axios'
import { QUESTION_API } from 'src/services/api-end-points'
import baseAxios from 'src/services/config'

interface Question {
  questionName: string
  lessonId: string
  lessonName?: string
  answerOptions?: string
  correctAnswer?: string
  info?: string
  createdAt?: Date
  updatedAt?: Date
}

export const createQuestion = async (question: Question): Promise<Question> => {
  try {
    const response: AxiosResponse<Question> = await baseAxios.post(QUESTION_API.question_create, question)

    return response.data
  } catch (error) {
    console.error('Error creating question:', error)
    throw error
  }
}

export const editQuestion = async (questionId: string, updatedQuestion: Question): Promise<Question> => {
  try {
    const response: AxiosResponse<Question> = await baseAxios.put(
      `${QUESTION_API.edit_question}/${questionId}`,
      updatedQuestion
    )

    return response.data
  } catch (error) {
    console.error('Error editing question:', error)
    throw error
  }
}

export const getQuestionById = async (questionId: string): Promise<Question> => {
  try {
    const response: AxiosResponse<Question> = await baseAxios.get(QUESTION_API.fetch_question_by_id(questionId))

    return response.data
  } catch (error) {
    console.error('Error fetching question by ID:', error)
    throw error
  }
}

export const getAllQuestions = async (): Promise<Question[]> => {
  try {
    const response: AxiosResponse<Question[]> = await baseAxios.get(QUESTION_API.fetch_all_questions)

    return response.data
  } catch (error) {
    console.error('Error fetching all questions:', error)
    throw error
  }
}

export const getQuestionsByLesson = async (lessonId: string): Promise<Question[]> => {
  try {
    const response: AxiosResponse<Question[]> = await baseAxios.get(QUESTION_API.fetch_questions_by_lesson(lessonId))

    return response.data
  } catch (error) {
    console.error('Error fetching questions by lesson ID:', error)
    throw error
  }
}

export const deleteQuestion = async (questionId: string): Promise<void> => {
  try {
    await baseAxios.delete(`${QUESTION_API.delete_question}/${questionId}`)
  } catch (error) {
    console.error('Error deleting question:', error)
    throw error
  }
}
