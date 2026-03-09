import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"

import CourseStepper from "../components/CreateCourse/CourseStepper"
import CourseBasicInfoStep from "../components/CreateCourse/CourseBasicInfoStep"
import CourseCategoryStep from "../components/CreateCourse/CourseCategoryStep"
import CoursePricingStep from "../components/CreateCourse/CoursePricingStep"
import CoursePublishStep from "../components/CreateCourse/CoursePublishStep"

export default function CreateCoursePage() {

    const step = useSelector(
        (state: RootState) => state.courseBuilder.step
    )

    return (
        <div className="bg-[#eff4f3] min-h-screen pb-20 pt-10 px-4 flex flex-col items-center font-sans">
            <div className="w-full max-w-4xl">
                <CourseStepper step={step} />

                <div className="mt-8">
                    {step === 1 && <CourseBasicInfoStep />}
                    {step === 2 && <CourseCategoryStep />}
                    {step === 3 && <CoursePricingStep />}
                    {step === 4 && <CoursePublishStep />}
                </div>
            </div>
        </div>
    )
}