export interface CourseBuilderState {
    step: number
    title: string
    description: string
    category: string
    courseLevel: "Beginner" | "Intermediate" | "Expert" | ""
    courseType: "paid" | "credit"
    price: number
    creditCost: number
    thumbnailUrl: string
    status: "draft" | "pending" | "published"
    isSubmitting?: boolean
}