"use server";

import { COURSE_API } from "@/services/api-end-point/courses";
import clientAxios from "@/services/config";

type queryDataProps = {
    status: string,
    courseType: string,
}

export async function fetchHomePageCourse(queryData: queryDataProps) {
    // const res = (await fetch(`/courses/get-by-status`)).json();
    try {
        const res = await clientAxios.get(`${COURSE_API.fetch_course_by_status(queryData.status, queryData.courseType)}`)
        return res.data
    } catch (error) {
        console.log(error);
        
    }
}
