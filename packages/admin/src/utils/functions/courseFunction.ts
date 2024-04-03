import { AxiosResponse } from 'axios'
import { COURSE_API } from 'src/services/api-end-points'
import baseAxios from 'src/services/config'

interface Course {
  name: string
  categoryId: string
  categoryName?: string
  instructorId: string
  instructorName?: string
  organizationId: string
  price: number
  description?: string
  isDiscount?: boolean
  discount?: number
  courseProvider?: string
  courseOverview?: string
  thumbnail?: string
  status?: string
  info?: string
  courseType: 'COURSE' | 'MODEL_TEST'
  createdAt?: Date
  updatedAt?: Date
}

export const createCourse = async (course: Course): Promise<Course> => {
  try {
    const response: AxiosResponse<Course> = await baseAxios.post(COURSE_API.course_create, course)

    return response.data
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

export const editCourse = async (courseId: string, updatedCourse: Course): Promise<Course> => {
  try {
    const response: AxiosResponse<Course> = await baseAxios.put(`${COURSE_API.edit_course}/${courseId}`, updatedCourse)

    return response.data
  } catch (error) {
    console.error('Error editing course:', error)
    throw error
  }
}

export const getCourseById = async (courseId: string): Promise<Course> => {
  try {
    const response: AxiosResponse<Course> = await baseAxios.get(COURSE_API.fetch_course_by_id(courseId))

    return response.data
  } catch (error) {
    console.error('Error fetching course by ID:', error)
    throw error
  }
}

export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const response: AxiosResponse<Course[]> = await baseAxios.get(COURSE_API.fetch_all_courses)

    return response.data
  } catch (error) {
    console.error('Error fetching all courses:', error)
    throw error
  }
}

export const getCoursesByOrganization = async (organizationId: string): Promise<Course[]> => {
  try {
    const response: AxiosResponse<Course[]> = await baseAxios.get(
      COURSE_API.fetch_courses_by_organization(organizationId)
    )

    return response.data
  } catch (error) {
    console.error('Error fetching courses by organization ID:', error)
    throw error
  }
}

export const getCoursesByInstructor = async (instructorId: string): Promise<Course[]> => {
  try {
    const response: AxiosResponse<Course[]> = await baseAxios.get(COURSE_API.fetch_courses_by_instructor(instructorId))

    return response.data
  } catch (error) {
    console.error('Error fetching courses by instructor ID:', error)
    throw error
  }
}

export const fetchCoursesByCourseType = async (courseType: string): Promise<Course[]> => {
  try {
    const response: AxiosResponse<Course[]> = await baseAxios.get(COURSE_API.fetch_course_by_type(courseType))

    return response.data
  } catch (error) {
    console.error('Error fetching courses by instructor ID:', error)
    throw error
  }
}

export const getCoursesByStatus = async (status: string, courseType: string): Promise<Course[]> => {
  try {
    const response: AxiosResponse<Course[]> = await baseAxios.get(COURSE_API.fetch_course_by_status(status, courseType))

    return response.data
  } catch (error) {
    console.error('Error fetching courses by status:', error)
    throw error
  }
}

export const deleteCourse = async (courseId: string): Promise<void> => {
  try {
    await baseAxios.delete(`${COURSE_API.delete_course}/${courseId}`)
  } catch (error) {
    console.error('Error deleting course:', error)
    throw error
  }
}
