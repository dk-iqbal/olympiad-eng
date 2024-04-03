import { AxiosResponse } from 'axios'
import { USER_API } from 'src/services/api-end-points'
import baseAxios from 'src/services/config'

interface User {
  name: string
  username?: string
  email?: string
  phone: string
  organizationId: string
  role: string
  status?: boolean
  password: string
  info?: string
  address?: string
  image?: string
  refreshToken?: string
  macAddress?: string | string[]
  createdAt?: Date
  updatedAt?: Date
}

export const createUser = async (user: User): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await baseAxios.post(USER_API.user_create, user)

    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const editUser = async (userId: string, updatedUser: User): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await baseAxios.put(`${USER_API.edit_user}/${userId}`, updatedUser)

    return response.data
  } catch (error) {
    console.error('Error editing user:', error)
    throw error
  }
}

export const updateUser = async (userId: string, updatedUser: Partial<User>): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await baseAxios.patch(`${USER_API.update_user}/${userId}`, updatedUser)

    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await baseAxios.delete(`${USER_API.delete_user}/${userId}`)
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

export const activateUser = async (userId: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await baseAxios.post(`${USER_API.activate_user}/${userId}`)

    return response.data
  } catch (error) {
    console.error('Error activating user:', error)
    throw error
  }
}

export const resetPassword = async (userId: string): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await baseAxios.post(`${USER_API.reset_password}/${userId}`)

    return response.data
  } catch (error) {
    console.error('Error resetting password for user:', error)
    throw error
  }
}

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await baseAxios.get(USER_API.fetch_all_user)

    return response.data
  } catch (error) {
    console.error('Error fetching all users:', error)
    throw error
  }
}

export const getUsersByRoleAndStatus = async (role: string, status: boolean): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await baseAxios.get(
      `${USER_API.find_by_role_and_status}?role=${role}&status=${status}`
    )

    return response.data
  } catch (error) {
    console.error('Error fetching users by role and status:', error)
    throw error
  }
}
