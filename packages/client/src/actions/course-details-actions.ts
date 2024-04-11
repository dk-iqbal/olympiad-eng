import { COURSE_DETAILS_API } from "@/services/api-end-point/courseDetails";
import { COURSE_API } from "@/services/api-end-point/courses";
import clientAxios from "@/services/config";

type queryDataProps = {
  courseId: string;
  studentId?: string;
};

export async function fetchCourseDetails(queryData: queryDataProps) {
  try {
    const res = await clientAxios.get(`${COURSE_API.fetch_course_by_id}`, {
      params: queryData,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCourseDetailsById(courseId: string) {
  try {
    const res = await clientAxios.get(`${COURSE_DETAILS_API.fetch_course_details_by_id(courseId)}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchReportDetails(queryData: queryDataProps) {
  try {
    const res = await clientAxios.get(
      `${COURSE_API.fetch_student_course_report_details(
        queryData.courseId,
        queryData.studentId
      )}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchReportByCourseAndStudent(queryData: queryDataProps) {
  try {
    const res = await clientAxios.get(
      `${COURSE_API.fetch_report_by_course_and_student(
        queryData.courseId,
        queryData.studentId
      )}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchHigestStudent(queryData: queryDataProps) {
  try {
    const res = await clientAxios.get(
      `${COURSE_API.fetch_highest_student_by_course(queryData.courseId)}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
