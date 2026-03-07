import type { Course } from "../types/course.types"

export const mockCourses: Course[] = [
  {
    _id: "1",
    title: "Mastering Modern UI Design Systems",
    description: "Learn how to build scalable UI systems.",
    category: "UI/UX Design",
    courseType: "paid",
    price: 49,
    courseSkills: ["Figma", "Design Systems", "UI Architecture"],
    status: "published",
    courseLevel: "intermediate",
    thumbnailUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    ratingsAverage: 4.8,
    totalEnrollments: 124,
    contentModules: [
      {
        title: "Introduction to Design Systems",
        url: "video1",
        duration: 10
      },
      {
        title: "Component Architecture",
        url: "video2",
        duration: 15
      }
    ]
  },
  {
    _id: "2",
    title: "Advanced React Patterns",
    description: "Deep dive into advanced React architecture.",
    category: "Web Development",
    courseType: "paid",
    price: 59,
    courseSkills: ["React", "Hooks", "Performance"],
    status: "draft",
    courseLevel: "expert",
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    ratingsAverage: 4.6,
    totalEnrollments: 85,
    contentModules: [
      {
        title: "Compound Components",
        url: "video1",
        duration: 12
      },
      {
        title: "Render Props",
        url: "video2",
        duration: 18
      }
    ]
  },
  {
    _id: "3",
    title: "UX Research Fundamentals",
    description: "Learn user research methods.",
    category: "UX",
    courseType: "credit",
    creditCost: 30,
    courseSkills: ["User Research", "Interviews"],
    status: "pending",
    courseLevel: "beginner",
    thumbnailUrl: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    ratingsAverage: 4.5,
    totalEnrollments: 45,
    contentModules: [
      {
        title: "Research Basics",
        url: "video1",
        duration: 8
      }
    ]
  }
]