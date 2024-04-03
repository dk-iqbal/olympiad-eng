import { AxiosResponse } from 'axios'
import { ASSIGNMENT_API } from 'src/services/api-end-points'
import baseAxios from 'src/services/config'

interface Assignment {
  assignmentName: string
  lessonId: string
  lessonName?: string
  totalMarks?: number
  answerOptions?: string
  deadLine?: Date
  answerFile?: string
  assignmentFile?: string
  info?: string
  createdAt?: Date
  updatedAt?: Date
}

export const createAssignment = async (assignment: Assignment): Promise<Assignment> => {
  try {
    const response: AxiosResponse<Assignment> = await baseAxios.post(ASSIGNMENT_API.assignment_create, assignment)

    return response.data
  } catch (error) {
    console.error('Error creating assignment:', error)
    throw error
  }
}

export const editAssignment = async (assignmentId: string, updatedAssignment: Assignment): Promise<Assignment> => {
  try {
    const response: AxiosResponse<Assignment> = await baseAxios.put(
      `${ASSIGNMENT_API.edit_assignment}/${assignmentId}`,
      updatedAssignment
    )

    return response.data
  } catch (error) {
    console.error('Error editing assignment:', error)
    throw error
  }
}

export const getAssignmentById = async (assignmentId: string): Promise<Assignment> => {
  try {
    const response: AxiosResponse<Assignment> = await baseAxios.get(ASSIGNMENT_API.fetch_assignment_by_id(assignmentId))

    return response.data
  } catch (error) {
    console.error('Error fetching assignment by ID:', error)
    throw error
  }
}

export const getAssignmentsByLessonId = async (lessonId: string): Promise<Assignment[]> => {
  try {
    const response: AxiosResponse<Assignment[]> = await baseAxios.get(
      ASSIGNMENT_API.fetch_assignments_by_lesson(lessonId)
    )

    return response.data
  } catch (error) {
    console.error('Error fetching assignments by lesson ID:', error)
    throw error
  }
}

export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  try {
    await baseAxios.delete(`${ASSIGNMENT_API.delete_assignment}/${assignmentId}`)
  } catch (error) {
    console.error('Error deleting assignment:', error)
    throw error
  }
}
