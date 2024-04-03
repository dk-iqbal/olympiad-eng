import { AxiosResponse } from 'axios'
import { SECTION_API } from 'src/services/api-end-points'
import baseAxios from 'src/services/config'

interface Section {
  name?: string
  courseId?: string
  courseName?: string
  positions?: number
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export const createSection = async (section: Section): Promise<Section> => {
  try {
    const response: AxiosResponse<Section> = await baseAxios.post(SECTION_API.section_create, section)

    return response.data
  } catch (error) {
    console.error('Error creating section:', error)
    throw error
  }
}

export const editSection = async (sectionId: string, updatedSection: Section): Promise<Section> => {
  try {
    const response: AxiosResponse<Section> = await baseAxios.put(
      `${SECTION_API.edit_section}/${sectionId}`,
      updatedSection
    )

    return response.data
  } catch (error) {
    console.error('Error editing section:', error)
    throw error
  }
}

export const getSectionById = async (sectionId: string): Promise<Section> => {
  try {
    const response: AxiosResponse<Section> = await baseAxios.get(SECTION_API.fetch_section_by_id(sectionId))

    return response.data
  } catch (error) {
    console.error('Error fetching section by ID:', error)
    throw error
  }
}

export const getAllSections = async (): Promise<Section[]> => {
  try {
    const response: AxiosResponse<Section[]> = await baseAxios.get(SECTION_API.fetch_all_sections)

    return response.data
  } catch (error) {
    console.error('Error fetching all sections:', error)
    throw error
  }
}

export const getSectionsByCourse = async (courseId: string): Promise<Section[]> => {
  try {
    const response: AxiosResponse<Section[]> = await baseAxios.get(SECTION_API.fetch_sections_by_course(courseId))

    return response.data
  } catch (error) {
    console.error('Error fetching sections by course ID:', error)
    throw error
  }
}

export const getSectionsByStatus = async (isActive: boolean): Promise<Section[]> => {
  try {
    const response: AxiosResponse<Section[]> = await baseAxios.get(SECTION_API.fetch_sections_by_status(isActive))

    return response.data
  } catch (error) {
    console.error('Error fetching sections by course ID:', error)
    throw error
  }
}

export const getSectionsByCourseAndStatus = async (courseId: string, isActive: boolean): Promise<Section[]> => {
  try {
    const response: AxiosResponse<Section[]> = await baseAxios.get(SECTION_API.fetch_sections_by_course_and_status(courseId,isActive))

    return response.data
  } catch (error) {
    console.error('Error fetching sections by course ID:', error)
    throw error
  }
}

export const deleteSection = async (sectionId: string): Promise<void> => {
  try {
    await baseAxios.delete(`${SECTION_API.delete_section}/${sectionId}`)
  } catch (error) {
    console.error('Error deleting section:', error)
    throw error
  }
}
