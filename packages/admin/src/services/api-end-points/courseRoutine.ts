export const COURSE_ROUTINE_API = {
  create: `/course-routines/create`,
  edit: (id: string) => `/course-routines/edit/${id}`,
  getAll: `/course-routines/get-all`,
  getById: (id: string) => `/course-routines/get-by-id/${id}`,
  getByCoureId: (courseId: string) => `/course-routines/get-by-courseId/${courseId}`,
  delete: (id: string) => `/course-routines/delete/${id}`,
};
