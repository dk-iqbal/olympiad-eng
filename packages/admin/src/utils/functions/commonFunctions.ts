import { ASSIGNMENT_API, LESSON_API, QUESTION_API } from 'src/services/api-end-points'
import { COURSE_DETAILS_API } from 'src/services/api-end-points/courseDetails'
import { SECTION_API } from 'src/services/api-end-points/section'
import baseAxios from 'src/services/config'
import { COURSE_API } from '../../services/api-end-points/course'

//#region Start
// Lesson: For Lesson related Functions
export const createNewLesson = async (lesson: any) => {
  try {
    const response = await baseAxios.post(LESSON_API.lesson_create, lesson)

    return response.data
  } catch (error) {
    console.error('Error creating lesson:', error)
    throw error
  }
}

export const updatedNewLesson = async (updatedLesson: any, id: string) => {
  try {
    const response = await baseAxios.put(`${LESSON_API.edit_lesson}/${id}`, updatedLesson)

    return response.data
  } catch (error) {
    console.error('Error editing lesson:', error)
    throw error
  }
}

//#endregion

//#region Start
// Question: For Question related Functions
export const createNewQuestions = async (question: any) => {
  try {
    const response = await baseAxios.post(QUESTION_API.question_create, question)

    return response.data
  } catch (error) {
    console.error('Error creating question:', error)
    throw error
  }
}

export const updatedNewQuestions = async (updatedQuestions: any) => {
  try {
    const response = await baseAxios.put(`${QUESTION_API.edit_question}`, updatedQuestions)

    return response.data
  } catch (error) {
    console.error('Error editing questions:', error)
    throw error
  }
}

//#endregion

//#region Start
// Assignment: For Assignment related Functions

export const createNewAssignment = async (data: any) => {
  try {
    const response = await baseAxios.post(ASSIGNMENT_API.assignment_create, data)

    return response.data
  } catch (error) {
    console.error('Error creating lesson:', error)
    throw error
  }
}

export const updatedNewAssignment = async (data: any, id: string) => {
  try {
    const response = await baseAxios.put(`${ASSIGNMENT_API.edit_assignment}/${id}`, data)

    return response.data
  } catch (error) {
    console.error('Error editing lesson:', error)
    throw error
  }
}

export const createNewSection = async (section: any) => {
  try {
    const response = await baseAxios.post(SECTION_API.section_create, section)

    return response.data
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

export const fetchSectionByCourseId = async (courseId: string) => {
  try {
    const response = await baseAxios.get(SECTION_API.fetch_sections_by_course(courseId))

    return response.data
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

export const fetchCourseByStatus = async (status: string, courseType: string) => {
  try {
    const response = await baseAxios.get(COURSE_API.fetch_course_by_status(status, courseType))

    return response.data
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

export const fetchCourseDetailsByCourseId = async (courseId: string) => {
  try {
    const response = await baseAxios.get(COURSE_DETAILS_API.get_course_details(courseId))

    return response.data
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

export const deleteLessonDetailsById = async (lessonId: string) => {
  try {
    const response = await baseAxios.delete(COURSE_DETAILS_API.delete_lesson_details(lessonId))

    return response.data
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}
