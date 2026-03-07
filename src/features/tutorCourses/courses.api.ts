import api from "../../shared/services/axios"

export const createCourse = async (courseData: FormData) => {
    const response = await api.post("/courses", courseData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response.data
}

export const getTutorCourses = async () => {
    const response = await api.get("/tutor/courses")
    return response.data
}