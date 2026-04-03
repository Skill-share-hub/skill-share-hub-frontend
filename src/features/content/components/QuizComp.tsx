import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle, Trophy } from 'lucide-react';
import type { QuizType } from '../content.types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizData: QuizType[];
  handleComplete: () => void;
}

const QuizModal = ({ isOpen, onClose, quizData, handleComplete }: QuizModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [result, setResult] = useState({
    score: 0,
    wrong: 0,
    showResult: false
  });

  if (!isOpen || !quizData || !quizData.length) return null;

  const handleOptionSelect = (option: string) => {
    setSelectedOptions({ ...selectedOptions, [currentQuestion]: option });
  };

  const calculateResults = () => {
    let correct = 0;
    let incorrect = 0;

    quizData.forEach((question, index) => {
      if (selectedOptions[index]?.toLowerCase() === question.answer.toLowerCase()) {
        correct++;
      } else {
        incorrect++;
      }
    });

    setResult({
      score: correct,
      wrong: incorrect,
      showResult: true
    });
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const onFinish = () => {
    onClose();
    handleComplete();
  };

  if (result.showResult) {
    const percentage = Math.round((result.score / quizData.length) * 100);
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-2xl">
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-50 rounded-full">
                <Trophy className="w-12 h-12 text-[#166534]" />
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">Quiz Completed!</h2>
            <p className="text-gray-500 mb-8">Here is how you performed:</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-gray-50">
                <div className="text-2xl font-bold text-[#166534]">{result.score}</div>
                <div className="text-xs font-medium text-gray-500 uppercase">Correct</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-50">
                <div className="text-2xl font-bold text-red-600">{result.wrong}</div>
                <div className="text-xs font-medium text-gray-500 uppercase">Wrong</div>
              </div>
            </div>

            <div className="relative w-full h-4 bg-gray-100 rounded-full mb-8">
              <div 
                className="absolute top-0 left-0 h-full bg-[#166534] rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <button
              onClick={onFinish}
              className="w-full cursor-pointer py-4 font-bold text-white transition-all bg-[#166534] rounded-xl hover:bg-[#114f27] shadow-lg shadow-green-900/20"
            >
              Finish & Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg  overflow-hidden bg-white rounded-xl shadow-2xl">
        
        <div className="relative">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <span className="text-sm font-bold tracking-wide text-[#166534] uppercase">
              Question {currentQuestion + 1} of {quizData.length}
            </span>
            <button 
              onClick={onClose}
              className="p-1 transition-colors cursor-pointer rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 h-[2px] bg-green-100 w-full">
            <div 
              className="h-full bg-[#166534] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-800 leading-tight">
            {quizData[currentQuestion]?.question}
          </h2>

          <div className="space-y-3">
            {quizData[currentQuestion].options.map((option, index) => {
              const isSelected = selectedOptions[currentQuestion] === option;
              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full p-4 cursor-pointer text-left transition-all border-2 rounded-xl font-medium flex items-center group ${
                    isSelected
                      ? 'border-[#166534] bg-green-50 text-[#166534]'
                      : 'border-gray-100 hover:border-green-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className={`flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold border-2 rounded-lg transition-colors ${
                    isSelected 
                      ? 'bg-[#166534] border-[#166534] text-white' 
                      : 'border-gray-200 text-gray-400 group-hover:border-green-300'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between px-8 py-6 bg-gray-50">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center cursor-pointer px-4 py-2 text-sm font-bold text-gray-500 transition-opacity disabled:opacity-0 hover:text-gray-800"
          >
            <ChevronLeft size={18} className="mr-1" /> Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!selectedOptions[currentQuestion]}
            className="flex items-center cursor-pointer px-6 py-2.5 text-sm font-bold text-white transition-all bg-[#166534] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#114f27] shadow-md"
          >
            {currentQuestion === quizData.length - 1 ? (
              <>Finish <CheckCircle className="ml-2 w-4 h-4" /></>
            ) : (
              <>Next <ChevronRight size={18} className="ml-1" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;