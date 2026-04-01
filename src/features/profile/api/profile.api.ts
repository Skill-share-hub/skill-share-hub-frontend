import api from "../../../shared/services/axios";

export interface UpdateUserProfileDto {
    name?: string;
    avatarUrl?: string;
    avatarFile?: File | null;
    studentProfile?: {
        bio?: string;
        skills?: string[];
        interests?: string[];
    };
    tutorProfile?: {
        bio?: string;
        skills?: string[];
        experience?: string;
    };
}

// Backend wraps response as { success, data: User }
export const getProfile = async () => {
    const response = await api.get("/users/profile");
    console.log("Profile API response:", response.data);
    return response.data.data; // unwrap the nested .data
};

export const updateUserProfileApi = async (data: UpdateUserProfileDto) => {
    let payload: any = data;

    // If there's a file, we must use FormData
    if (data.avatarFile) {
        const formData = new FormData();
        if (data.name) formData.append("name", data.name);
        
        // Multer expects the file in the 'avatarUrl' field based on backend route
        formData.append("avatarUrl", data.avatarFile);
        
        if (data.studentProfile) {
            formData.append("studentProfile", JSON.stringify(data.studentProfile));
        }
        if (data.tutorProfile) {
            formData.append("tutorProfile", JSON.stringify(data.tutorProfile));
        }
        payload = formData;
    }

    const response = await api.put("/users/profile", payload, {
        headers: data.avatarFile ? { "Content-Type": "multipart/form-data" } : {}
    });
    return response.data.data; // unwrap the nested .data
};
