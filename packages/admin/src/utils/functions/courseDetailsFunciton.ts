
import { COURSE_DETAILS_API } from "src/services/api-end-points/courseDetails"
import baseAxios from "src/services/config"

export interface CourseSummary {
  totalCourse: number
  totalLesson: number
  totalEnrollment : number
  totalStudent: number
  totalActiveCourse: number
  totalPendingCourse: number
  totalFreeCourse: number
  totalPaidCourse: number
};


export const getCourseSummaryByCourseType = async (courseType: string): Promise<CourseSummary> => {
  try {
    const response = await baseAxios.get(COURSE_DETAILS_API.get_course_summary(courseType))

    return response.data
  } catch (error) {
    console.error('Error fetching courseType by:', error)
    throw error
  }
}
