export const CATEGORY_API = {
  category_create: `/categories/create`,
  fetch_all_category: `/categories/get-all`,
  fetch_categories_by_status: (status: any) => `/categories/status/${status}`,
  fetch_category_by_id: (id: string) => `/categories/get-by-id/${id}`,
  edit_category: '/categories/edit',
  delete_category: '/categories/delete'
}
