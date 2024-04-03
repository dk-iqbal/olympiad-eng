import { USER_API } from './api-end-points'
import baseAxios from './config'

export const fetchUsers = async (role: string, status: any) => {
  try {
    const response = await baseAxios.get(USER_API.find_by_role_and_status, {
      params: { role, status }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const createUser = async (user: any) => {
  try {
    const response = await baseAxios.post(USER_API.user_create, user)

    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const editUser = async (userId: string, updatedUser: any) => {
  try {
    const response = await baseAxios.put(`${USER_API.edit_user}/${userId}`, updatedUser)

    return response.data
  } catch (error) {
    console.error('Error editing user:', error)
    throw error
  }
}

export const deleteUser = async (userId: string) => {
  try {
    await baseAxios.delete(`${USER_API.delete_user}/${userId}`)
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

export const activateUser = async (userId: string, status: any) => {
  try {
    const response = await baseAxios.put(`${USER_API.activate_user}/${userId}`, { status })

    return response.data
  } catch (error) {
    console.error('Error activating user:', error)
    throw error
  }
}

export const resetPassowrd = async (userId: string, password: string) => {
  try {
    const response = await baseAxios.put(`${USER_API.reset_password}/${userId}`, { password })

    return response.data
  } catch (error) {
    console.error('Error activating user:', error)
    throw error
  }
}
