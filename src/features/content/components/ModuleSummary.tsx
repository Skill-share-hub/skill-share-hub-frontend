export default function ModuleSummary({summary}:{summary:string}) {

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Module Summary</h3>
            <p className="text-gray-600 leading-relaxed text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
                {summary}
            </p>
        </div>
    );
}
