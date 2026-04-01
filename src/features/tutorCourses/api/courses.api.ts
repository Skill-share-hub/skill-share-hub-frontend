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

export const getTutorCoursesApi = async (page?: number, limit?: number, search?: string, category?: string, type?: string) => {
    let url = `/courses/tutor?page=${page || 1}&limit=${limit || 10}`;
    if (search) url += `&q=${encodeURIComponent(search)}`;
    if (category) url += `&c=${encodeURIComponent(category)}`;
    if (type) url += `&type=${encodeURIComponent(type)}`;

    const response = await api.get(url)
    console.log(response.data.data)
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

export const addCourseContentApi = async (id: string, contentData: FormData) => {
    const response = await api.post(`/courses/${id}/content`, contentData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const updateCourseContentApi = async (contentId: string, contentData: FormData) => {
    const response = await api.put(`/courses/content/${contentId}`, contentData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const deleteCourseContentApi = async (courseId: string, contentId: string) => {
    const response = await api.delete(`/courses/${courseId}/content/${contentId}`)
    return response.data
}

export const deleteCourseApi = async (id: string) => {
    const response = await api.delete(`/courses/${id}`)
    return response.data
}

export const updateCourseStatusApi = async (id: string, status: string) => {
    const response = await api.patch(`/courses/${id}`, { status })
    return response.data
}