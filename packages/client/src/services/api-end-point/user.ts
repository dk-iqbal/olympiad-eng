export const USER_API = {
  fetch_user_by_id: (userId?: string | null) => `/users/get-by-id?id=${userId}`,
  user_edit: (userId?: string | null) =>`/users/edit/${userId}`,
  fetch_user_enrollment_by_id: (userId?: string | null) =>
    `/enrollments/get-by-student/${userId}`,
  fetch_user_payment_by_id: (userId?: string | null) =>
    `/payment/get-by-student/${userId}`,
  user_reset_password_by_id: (userId?: string | null) =>
    `/users/reset-password/${userId}`,
  user_sign_up: () => `/users/create`,
};
