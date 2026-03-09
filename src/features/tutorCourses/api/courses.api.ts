import api from "../../../shared/services/axios"

export const createCourse = async (courseData: FormData) => {
    const response = await api.post("/courses", courseData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const updateCourse = async (id: string, courseData: FormData) => {
    const response = await api.put(`/courses/${id}`, courseData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const getTutorCourses = async () => {
    const response = await api.get("/courses")
    return response.data.data
}

export const getCourseById = async (id: string) => {
    const response = await api.get(`/courses/${id}`)
    return response.data
}