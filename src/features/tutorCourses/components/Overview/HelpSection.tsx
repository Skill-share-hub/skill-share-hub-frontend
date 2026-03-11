import { HelpCircle } from "lucide-react"

const HelpSection = () => {
    return (
        <div className="bg-[#E7F3EF] rounded-3xl p-8 flex items-center justify-between border border-[#166534]/10">
            <div className="flex items-center gap-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <HelpCircle className="text-[#166534]" size={28} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Need help with your course?</h3>
                    <p className="text-sm text-green-800/70">Check our instructor guidelines or contact support.</p>
                </div>
            </div>
            <button className="bg-transparent text-[#166534] font-bold hover:underline">
                Support Center
            </button>
        </div>
    )
}

export default HelpSection
