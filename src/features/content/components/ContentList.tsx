import { PlayCircle, CheckCircle2, Lock } from "lucide-react";
import type { ContentModules } from "../content.types";
import { useEffect } from "react";

export default function ContentList(
    {
        modules,
        setContent,
        completedModules,
        content
    }:
    {
        modules:ContentModules[],
        setContent : (content:ContentModules)=> void,
        completedModules : string[],
        content : ContentModules
    }
) {

    const handleSelect = (id:string) => {
        setContent(modules.find(v=>v._id === id) ?? modules[0]);
        localStorage.setItem('lastPlayed',id);
    }

    useEffect(()=>{
        const id = localStorage.getItem('lastPlayed');
        setContent(modules.find(v=>v._id === id) ?? modules[0]);
    },[]);

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">Course Content</h3>
                <span className="text-sm font-medium text-[#166534] bg-[#166534]/10 px-3 py-1 rounded-full">
                    {modules.length} Lessons
                </span>
            </div>

            <div className="divide-y divide-gray-200">
                <ul className="bg-white">

                    {
                        modules.map(v => (
                            <Content contentId={content._id} onSelect={handleSelect} completed={completedModules} data={v} />
                        ))
                    }

                </ul>
            </div>
        </div>
    );
}

interface ContentProps {
  data: ContentModules;
  completed: string[];
  contentId: string;
  onSelect: (id: string) => void;
}

function Content({ data, completed, contentId, onSelect }: ContentProps) {
  const isCompleted = completed.includes(data._id);
  const isSelected = contentId === data._id ;

  return (
    <li>
      <button
        onClick={() => onSelect(data._id)}
        className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all border-l-4 cursor-pointer 
          ${
            isSelected
              ? "bg-green-50 border-[#166534] shadow-sm"
              : "bg-white border-transparent hover:bg-gray-50 hover:pl-5"
          }`}
      >
        <div className="flex-shrink-0 relative w-16 h-10 bg-gray-200 rounded overflow-hidden border border-gray-100">
          {data.thumbnailUrl ? (
            <img 
              src={data.thumbnailUrl} 
              alt={data.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
               <PlayCircle className="w-4 h-4 text-gray-400" />
            </div>
          )}
          
          {isCompleted && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#166534]" />
            </div>
          )}
        </div>

        <div className="flex-grow min-w-0 flex flex-col">
          <p className={`text-sm font-semibold truncate ${isSelected ? "text-[#166534]" : "text-gray-800"}`}>
            {data.title}
          </p>
          <p className="text-xs text-gray-500 line-clamp-1">
            {data.subTitle ?? "No description available"}
          </p>
        </div>

        <div className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
          isSelected ? "bg-[#166534] text-white" : "bg-gray-100 text-gray-500"
        }`}>
          {data.duration}m
        </div>
      </button>
    </li>
  );
}
