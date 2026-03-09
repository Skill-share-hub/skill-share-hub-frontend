interface Props {
  step: number
}

const steps = ["Basic Info", "Category", "Pricing", "Publish"]

export default function CourseStepper({ step }: Props) {

  return (
    <div className="flex justify-between mb-10">

      {steps.map((label, index) => {

        const number = index + 1

        return (
          <div key={label} className="flex flex-col items-center">

            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
              ${step >= number ? "bg-green-700 text-white" : "bg-gray-200"}
              `}
            >
              {step > number ? "✓" : number}
            </div>

            <span className="text-sm mt-2">
              {label}
            </span>

          </div>
        )
      })}

    </div>
  )
}