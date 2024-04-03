import { COURSE_ROUTINE_API } from 'src/services/api-end-points';
import baseAxios from 'src/services/config'

export const createCourseRoutine = async (courseRoutine: any): Promise<any> => {
  try {
    const response = await baseAxios.post(COURSE_ROUTINE_API.create, courseRoutine);

    return response.data;
  } catch (error) {
    console.error('Error creating course routine:', error);
    throw error;
  }
}

export const editCourseRoutine = async (id: string, updatedCourseRoutine: any): Promise<any> => {
  try {
    const response = await baseAxios.put(COURSE_ROUTINE_API.edit(id), updatedCourseRoutine);

    return response.data;
  } catch (error) {
    console.error('Error editing course routine:', error);
    throw error;
  }
}

export const getAllCourseRoutines = async (): Promise<any> => {
  try {
    const response = await baseAxios.get(COURSE_ROUTINE_API.getAll);

    return response.data;
  } catch (error) {
    console.error('Error fetching all course routines:', error);
    throw error;
  }
}

export const getCourseRoutineById = async (id: string): Promise<any> => {
  try {
    const response = await baseAxios.get(COURSE_ROUTINE_API.getById(id));

    return response.data;
  } catch (error) {
    console.error('Error fetching course routine by ID:', error);
    throw error;
  }
}

export const getCourseRoutinesByCourseId = async (courseId: string): Promise<any> => {
  try {
    const response = await baseAxios.get(COURSE_ROUTINE_API.getByCoureId(courseId));

    return response.data;
  } catch (error) {
    console.error('Error fetching course routines by course ID:', error);
    throw error;
  }
}

export const deleteCourseRoutine = async (id: string): Promise<void> => {
  try {
    await baseAxios.delete(COURSE_ROUTINE_API.delete(id));
  } catch (error) {
    console.error('Error deleting course routine:', error);
    throw error;
  }
}
