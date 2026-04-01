import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { RootState } from "../../../../store/store"
import { updateFields, nextStep, prevStep } from "../../slice/courseCreationSlice"

const pricingSchema = z.object({
    price: z.number().min(0, "Price cannot be negative"),
    creditCost: z.number().min(0, "Credits cannot be negative"),
})

type PricingFormValues = z.infer<typeof pricingSchema>

export default function CoursePricingStep() {
    const dispatch = useDispatch()
    const course = useSelector((state: RootState) => state.courseBuilder)
    const user = useSelector((state: RootState) => state.user.user)
    const isPremiumTutor = user?.role === "premiumTutor"

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<PricingFormValues>({
        resolver: zodResolver(pricingSchema),
        defaultValues: {
            price: course.price || 0,
            creditCost: course.creditCost || 0,
        },
    })

    // To help debug why the form might not be submitting
    if (Object.keys(errors).length > 0) {
        console.log("Pricing Form Errors:", errors)
    }

    useEffect(() => {
        setValue("price", course.price || (isPremiumTutor ? 49.99 : 0))
        setValue("creditCost", course.creditCost || (isPremiumTutor ? 12 : 0))
    }, [course, setValue, isPremiumTutor])

    const onSubmit = (data: PricingFormValues) => {
        dispatch(updateFields(data))
        dispatch(nextStep())
    }

    const handleBack = () => {
        const currentValues = watch()
        dispatch(updateFields(currentValues))
        dispatch(prevStep())
    }

    const currentPrice = watch("price") || 0
    const platformFee = currentPrice * 0.20
    const earnings = currentPrice - platformFee

    return (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Set your course pricing</h2>
                <p className="text-gray-500">Configure how students will access and pay for your expert content.</p>
                {!isPremiumTutor && (
                    <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-200 inline-block font-medium">
                        Pricing features are exclusively available to Premium Tutors. Your course will be free by default.
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`gap-8 ${course.courseType === 'paid' ? 'grid grid-cols-1 md:grid-cols-2' : 'max-w-xl mx-auto'}`}>

                    {/* Left Column - Input Fields */}
                    <div className="flex flex-col gap-6">

                        {/* Only show Marketplace Price if Paid Access selected */}
                        {course.courseType === "paid" && (
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Marketplace Price (USD)
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className={`font-medium ${isPremiumTutor ? "text-gray-500" : "text-gray-400"}`}>$</span>
                                    </div>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        disabled={!isPremiumTutor}
                                        {...register("price", { valueAsNumber: true })}
                                        className={`w-full border-0 rounded-lg pl-8 pr-4 py-4 font-medium focus:ring-2 focus:ring-green-600 transition-colors ${isPremiumTutor ? "bg-gray-50 text-gray-900 focus:bg-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            }`}
                                    />
                                </div>
                                {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
                                {isPremiumTutor && <p className="mt-2 text-xs text-gray-400">Standard market value for similar courses: $39 - $89</p>}
                            </div>
                        )}

                        {/* Only show Credit Cost if Credit Access selected */}
                        {course.courseType !== "paid" && (
                            <div className="bg-[#f2f8f5] rounded-xl p-8 border border-green-50">
                                <div className="mb-6 text-center">
                                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-lg">Define SkillShare Credits</h3>
                                    <p className="text-sm text-green-700 mt-1">Specify how many credits are required to access.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 mb-2 text-center">
                                        Required Credit Amount
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="number"
                                            min="0"
                                            {...register("creditCost", { valueAsNumber: true })}
                                            className="w-full border rounded-xl pl-12 pr-4 py-4 text-center font-bold text-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white border-gray-200 text-gray-900"
                                            placeholder="Example: 15"
                                        />
                                    </div>
                                    {errors.creditCost && <p className="mt-1 text-sm text-red-500 text-center">{errors.creditCost.message}</p>}
                                    <p className="mt-3 text-[11px] font-bold tracking-wider uppercase text-center text-green-700">1 CREDIT = $5.00 PLATFORM VALUE EQUIVALENT</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Breakdown (Only for Paid) */}
                    {course.courseType === "paid" && (
                        <div className={isPremiumTutor ? "opacity-100" : "opacity-60 pointer-events-none filter grayscale saturate-50"}>
                            <div className="bg-[#f9fafb] rounded-xl p-8 border border-gray-100 h-full flex flex-col">
                                <h3 className="font-bold text-gray-900 mb-6">Revenue Breakdown</h3>

                                <div className="space-y-4 flex-grow">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Student Price</span>
                                        <span className="font-semibold text-gray-900">${currentPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">Platform Fee (20%)</span>
                                        <span className="font-semibold text-red-500">-${platformFee.toFixed(2)}</span>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-900">Your Earnings</span>
                                            <span className="font-bold text-2xl text-green-700">${earnings.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 bg-white rounded-lg p-4 border border-gray-100 flex items-start space-x-3">
                                        <div className="bg-green-100 text-green-700 rounded-full p-1 shrink-0 mt-0.5">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Courses priced above $29.99 are eligible for our <span className="font-bold text-green-700">Global Promotion Program</span>, increasing your reach by up to 4x.
                                        </p>
                                    </div>

                                    <div className="mt-4 rounded-xl overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-[#16654e] to-[#208f6c] opacity-90"></div>
                                        <div className="relative p-6 text-center">
                                            <div className="inline-block bg-black/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/20 mb-2">
                                                Tier 1 Creator Perks Active
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 h-10 flex justify-center space-x-1 opacity-80">
                                            <div className="w-6 h-6 rounded-full bg-yellow-400 blur-sm"></div>
                                            <div className="w-6 h-6 rounded-full bg-yellow-500 blur-sm translate-y-2"></div>
                                            <div className="w-6 h-6 rounded-full bg-yellow-400 blur-sm"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                <div className="mt-10 flex items-center justify-between pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Previous Step
                    </button>

                    <div className="flex space-x-4 items-center">
                        <button
                            type="submit"
                            className="flex items-center px-6 py-2.5 bg-[#1F5E45] hover:bg-[#164733] text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                        >
                            Continue to Final Step
                            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
