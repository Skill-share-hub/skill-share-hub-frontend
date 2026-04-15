import { useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { ChevronDown, ChevronUp, Trash2, Plus } from "lucide-react";

export function QuestionCard({
  qIndex,
  control,
  register,
  errors,
  remove,
  totalQuestions,
}: {
  qIndex: number;
  control: any;
  register: any;
  errors: any;
  remove: (i: number) => void;
  totalQuestions: number;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const { fields: optFields, append: appendOpt, remove: removeOpt } = useFieldArray({
    control,
    name: `quizData.${qIndex}.options`,
  });

  const watchedOptions = useWatch({ control, name: `quizData.${qIndex}.options` }) as { value: string }[] | undefined;
  const qErrors = errors?.quizData?.[qIndex];

  return (
    <div className="rounded-2xl border border-green-100 bg-white overflow-hidden shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#166534]/5">
        <span className="text-sm font-bold text-[#166534]">Question {qIndex + 1}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="p-1 rounded-lg hover:bg-[#166534]/10 transition-colors text-[#166534]"
          >
            {collapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
          {totalQuestions > 1 && (
            <button
              type="button"
              onClick={() => remove(qIndex)}
              className="p-1 rounded-lg hover:bg-red-50 transition-colors text-red-500"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Card Body */}
      {!collapsed && (
        <div className="p-4 space-y-4">
          {/* Question Text */}
          <div>
            <label className="block text-xs font-bold text-[#166534] mb-1.5 uppercase tracking-wider">
              Question
            </label>
            <textarea
              {...register(`quizData.${qIndex}.question`)}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-green-100 focus:ring-2 focus:ring-[#166534] outline-none transition-all resize-none bg-white font-medium text-sm"
              placeholder="Enter the quiz question..."
            />
            {qErrors?.question && (
              <p className="mt-1 text-xs text-red-500">{qErrors.question.message}</p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#166534] uppercase tracking-wider">
                Answer Options
              </label>
              {optFields.length < 4 && (
                <button
                  type="button"
                  onClick={() => appendOpt({ value: "" })}
                  className="text-[10px] font-bold bg-[#166534] text-white px-2 py-1 rounded-lg hover:bg-[#14532D] transition-colors flex items-center gap-1"
                >
                  <Plus size={10} /> Add Option
                </button>
              )}
            </div>

            {optFields.map((optField, oIdx) => (
              <div key={optField.id} className="flex gap-2">
                <input
                  {...register(`quizData.${qIndex}.options.${oIdx}.value`)}
                  className="flex-1 px-4 py-2 rounded-lg border border-green-100 focus:ring-2 focus:ring-[#166534] outline-none transition-all bg-white text-sm"
                  placeholder={`Option ${oIdx + 1}`}
                />
                {optFields.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOpt(oIdx)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            {qErrors?.options && (
              <p className="mt-1 text-xs text-red-500">
                {typeof qErrors.options.message === "string"
                  ? qErrors.options.message
                  : "Please fill in all options"}
              </p>
            )}
          </div>

          {/* Correct Answer */}
          <div>
            <label className="block text-xs font-bold text-[#166534] mb-1.5 uppercase tracking-wider">
              Correct Answer
            </label>
            <select
              {...register(`quizData.${qIndex}.answer`)}
              className="w-full px-4 py-3 rounded-xl border border-green-100 focus:ring-2 focus:ring-[#166534] outline-none transition-all bg-white font-medium text-sm"
            >
              <option value="">Select the correct option</option>
              {watchedOptions?.map((opt, idx) =>
                opt.value ? (
                  <option key={idx} value={opt.value}>
                    {opt.value}
                  </option>
                ) : null
              )}
            </select>
            {qErrors?.answer && (
              <p className="mt-1 text-xs text-red-500">{qErrors.answer.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
