import { AxiosResponse } from 'axios'
import { LESSON_API } from 'src/services/api-end-points'
import baseAxios from 'src/services/config'

interface Lesson {
  name: string
  sectionId: string
  sectionName?: string
  lessonURL?: string
  thumbnail?: string
  duration?: number
  isFree: boolean
  positions?: number
  isModelTest?: boolean
  passingMarks?: number
  examTime?: number
  isNegativeMarks?: boolean
  negativeMarks?: number
  isActive?: boolean
  info?: string
  createdAt?: Date
  updatedAt?: Date
}

export const createLesson = async (lesson: Lesson): Promise<Lesson> => {
  try {
    const response: AxiosResponse<Lesson> = await baseAxios.post(LESSON_API.lesson_create, lesson)

    return response.data
  } catch (error) {
    console.error('Error creating lesson:', error)
    throw error
  }
}

export const editLesson = async (lessonId: string, updatedLesson: Lesson): Promise<Lesson> => {
  try {
    const response: AxiosResponse<Lesson> = await baseAxios.put(`${LESSON_API.edit_lesson}/${lessonId}`, updatedLesson)

    return response.data
  } catch (error) {
    console.error('Error editing lesson:', error)
    throw error
  }
}

export const getLessonById = async (lessonId: string): Promise<Lesson> => {
  try {
    const response: AxiosResponse<Lesson> = await baseAxios.get(LESSON_API.fetch_lesson_by_id(lessonId))

    return response.data
  } catch (error) {
    console.error('Error fetching lesson by ID:', error)
    throw error
  }
}

export const getLessonsBySectionId = async (sectionId: string): Promise<Lesson[]> => {
  try {
    const response: AxiosResponse<Lesson[]> = await baseAxios.get(LESSON_API.fetch_lessons_by_section(sectionId))

    return response.data
  } catch (error) {
    console.error('Error fetching lessons by section ID:', error)
    throw error
  }
}

export const deleteLesson = async (lessonId: string): Promise<void> => {
  try {
    await baseAxios.delete(`${LESSON_API.delete_lesson}/${lessonId}`)
  } catch (error) {
    console.error('Error deleting lesson:', error)
    throw error
  }
}
