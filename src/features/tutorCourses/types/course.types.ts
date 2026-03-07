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

export interface Course {
  _id: string
  title: string
  description: string
  category: string
  courseType: "credit" | "paid"
  courseSkills: string[]
  status: "pending" | "published" | "draft"
  courseLevel: "beginner" | "intermediate" | "expert"
  price?: number
  creditCost?: number
  thumbnailUrl?: string
  ratingsAverage?: number
  totalEnrollments?: number
  createdAt?: string
  updatedAt?: string
  contentModules?: {
    title: string
    url: string
    duration: number
    summary?: string
    thumbnail?: string
  }[]
}
