import { HelpCircle, ArrowUpRight } from "lucide-react"

const HelpSection = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-8">

            {/* Top meta bar */}
            <div className="flex items-center gap-2 px-7 py-3 border-b border-gray-100 bg-gray-50/60">
                <HelpCircle size={12} strokeWidth={2.5} className="text-gray-400" />
                <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-400">
                    Support
                </span>
            </div>

            {/* Body */}
            <div className="flex items-center justify-between gap-6 px-7 py-5">
                <div>
                    <p className="text-[14px] font-bold text-gray-900">Need help with your course?</p>
                    <p className="text-[13px] text-gray-400 mt-0.5">
                        Check our instructor guidelines or reach out to the support team.
                    </p>
                </div>

                <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-4 py-2.5 rounded-xl transition-colors duration-150 shrink-0 active:scale-[0.97]"
                >
                    Support Center
                    <ArrowUpRight size={13} strokeWidth={2.5} />
                </a>
            </div>
        </div>
    )
}

export default HelpSection