import api from "../../../shared/services/axios"

export const createCourseApi = async (courseData: FormData) => {
    const response = await api.post("/courses", courseData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const updateCourseApi = async (id: string, courseData: FormData) => {
    const response = await api.put(`/courses/${id}`, courseData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const getTutorCoursesApi = async (page: number = 1, limit: number = 10) => {
    const response = await api.get(`/courses/tutor?page=${page}&limit=${limit}`)
    return response.data.data
}

export const publishCourseApi = async (id: string) => {
    const response = await api.patch(`/courses/${id}`, { status: "pending" })
    return response.data
}

export const getCourseByIdApi = async (id: string) => {
    const response = await api.get(`/courses/${id}`)
    return response.data
}