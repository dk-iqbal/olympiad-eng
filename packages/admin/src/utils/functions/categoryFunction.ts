import { AxiosResponse } from 'axios'
import { CATEGORY_API } from 'src/services/api-end-points'
import baseAxios from 'src/services/config'

interface Category {
  name: string
  status?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export const createCategory = async (category: Category): Promise<Category> => {
  try {
    const response: AxiosResponse<Category> = await baseAxios.post(CATEGORY_API.category_create, category)

    return response.data
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}

export const editCategory = async (categoryId: string, updatedCategory: Category): Promise<Category> => {
  try {
    const response: AxiosResponse<Category> = await baseAxios.put(
      `${CATEGORY_API.edit_category}/${categoryId}`,
      updatedCategory
    )

    return response.data
  } catch (error) {
    console.error('Error editing category:', error)
    throw error
  }
}

export const getCategoryById = async (categoryId: string): Promise<Category> => {
  try {
    const response: AxiosResponse<Category> = await baseAxios.get(CATEGORY_API.fetch_category_by_id(categoryId))

    return response.data
  } catch (error) {
    console.error('Error fetching category by ID:', error)
    throw error
  }
}

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await baseAxios.get(CATEGORY_API.fetch_all_category)

    return response.data
  } catch (error) {
    console.error('Error fetching all categories:', error)
    throw error
  }
}

export const getCategoriesByStatus = async (status: any): Promise<Category[]> => {
  try {
    const response: AxiosResponse<Category[]> = await baseAxios.get(CATEGORY_API.fetch_categories_by_status(status))

    return response.data
  } catch (error) {
    console.error('Error fetching categories by status:', error)
    throw error
  }
}

export const deleteCategory = async (categoryId: string): Promise<void> => {
  try {
    await baseAxios.delete(`${CATEGORY_API.delete_category}/${categoryId}`)
  } catch (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}
