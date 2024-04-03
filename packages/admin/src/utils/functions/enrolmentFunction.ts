import { ENROLMENT_API } from 'src/services/api-end-points'
import baseAxios from 'src/services/config'

interface Enrollment {
  studentId: string
  studentName: string
  courseId: string
  courseName: string
  instructorId: string
  organizationId: string
  studentMobileNumber: string
  amount: number
  transactionType?: string
  isAmountPaid?: boolean
  status: 'Pending' | 'Enrolled' | 'Completed'
  enrollmentDate: Date
  createdAt?: Date
  updatedAt?: Date
}

export const createEnrollment = async (enrollment: Enrollment): Promise<Enrollment> => {
  try {
    const response = await baseAxios.post(ENROLMENT_API.create_enrollment, enrollment)

    return response.data
  } catch (error) {
    console.error('Error creating enrollment:', error)
    throw error
  }
}

export const editEnrollment = async (enrollmentId: string, updatedEnrollment: Enrollment): Promise<Enrollment> => {
  try {
    const response = await baseAxios.put(`${ENROLMENT_API.edit_enrollment}/${enrollmentId}`, updatedEnrollment)

    return response.data
  } catch (error) {
    console.error('Error editing enrollment:', error)
    throw error
  }
}

export const getEnrollmentById = async (enrollmentId: string): Promise<Enrollment> => {
  try {
    const response = await baseAxios.get(ENROLMENT_API.get_enrollment_by_id(enrollmentId))

    return response.data
  } catch (error) {
    console.error('Error fetching enrollment by ID:', error)
    throw error
  }
}

export const getAllEnrollment = async (): Promise<any> => {
  try {
    const response = await baseAxios.get(ENROLMENT_API.get_all_enrollment)

    return response.data
  } catch (error) {
    console.error('Error fetching enrollments: ', error)
    throw error
  }
}

export const getEnrollmentsByStudentId = async (studentId: string): Promise<Enrollment[]> => {
  try {
    const response = await baseAxios.get(ENROLMENT_API.get_enrollments_by_student(studentId))

    return response.data
  } catch (error) {
    console.error('Error fetching enrollments by student ID:', error)
    throw error
  }
}

export const getEnrollmentsByCourseId = async (courseId: string): Promise<Enrollment[]> => {
  try {
    const response = await baseAxios.get(ENROLMENT_API.get_enrollments_by_course(courseId))

    return response.data
  } catch (error) {
    console.error('Error fetching enrollments by course ID:', error)
    throw error
  }
}

export const getEnrollmentsByInstructorId = async (instructorId: string): Promise<Enrollment[]> => {
  try {
    const response = await baseAxios.get(ENROLMENT_API.get_enrollments_by_instructor(instructorId))

    return response.data
  } catch (error) {
    console.error('Error fetching enrollments by instructor ID:', error)
    throw error
  }
}

export const getEnrollmentsByStudentAndCourseId = async (
  courseId: string,
  studentId: string
): Promise<Enrollment[]> => {
  try {
    const response = await baseAxios.get(ENROLMENT_API.get_enrollments_by_student_and_course(courseId, studentId))

    return response.data
  } catch (error) {
    console.error('Error fetching enrollments by student and course ID:', error)
    throw error
  }
}

export const deleteEnrollment = async (enrollmentId: string): Promise<void> => {
  try {
    await baseAxios.delete(`${ENROLMENT_API.delete_enrollment}/${enrollmentId}`)
  } catch (error) {
    console.error('Error deleting enrollment:', error)
    throw error
  }
}
