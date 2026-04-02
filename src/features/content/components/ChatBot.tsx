import { useEffect, useRef, useState } from "react";
import api from "../../../shared/services/axios";
import type { ChatType } from "../content.types";
import { BotMessageSquare, SendHorizontal, X } from "lucide-react";

export default function ChatBot({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState<ChatType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if(open){
      scrollToBottom();
    }
  }, [sending,open]);

  const fetchChats = async () => {
    setLoading(true);
    try {
      const { data: chatData } = await api.get(`/chatbot/${id}`);
      setChats(chatData.data);
    } catch (error) {
      console.error("Failed to fetch chats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && !chats) {
      fetchChats();
    }
  }, [open, id]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || sending) return;

    const question = inputValue;
    setChats((pre) => [...(pre || []), { role: "user", content: question }]);
    setInputValue("");

    try {
      setSending(true);
      const { data: chatData } = await api.post("/chatbot", {
        contentId: id,
        question,
      });
      if (chatData.success) {
        setChats((pre) => [...(pre || []), chatData.data]);
      }
    } catch (error) {
      fetchChats();
      setInputValue(question);
      console.log(error, "failed to send");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {open && (
        <div className="mb-4 w-[85vw] md:w-96 h-[500px] bg-white rounded-2xl shadow-3xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-4 bg-[#166534] text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <BotMessageSquare size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none">Mentor Max</h3>
                <span className="text-[10px] text-green-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setOpen(false);
                setChats(null);
              }}
              className="p-1 hover:bg-white/10 rounded-full cursor-pointer transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="
            flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
          ">
            {loading ? (
              <ChatSkeleton />
            ) : (
              <>
                {chats?.map((chat, index) => (
                  <div
                    key={index}
                    className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm transition-all ${
                      chat.role === "user"
                        ? "ml-auto bg-[#166534] text-white rounded-br-none"
                        : "mr-auto bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                    }`}
                  >
                    {chat.content}
                  </div>
                ))}

                {sending && (
                  <div className="mr-auto bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-bl-none p-3 shadow-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                disabled={sending}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={sending ? "Mentor Max is typing..." : "Ask me anything..."}
                className="w-full pl-4 pr-12 py-3 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#166534]/20 outline-none transition-all disabled:opacity-70"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || sending}
                className="absolute right-1.5 p-2 bg-[#166534] text-white rounded-lg hover:bg-[#105229] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
              >
                <SendHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          if(open){
            setChats(null)
          }
          setOpen(!open);
        }}
        className="w-14 h-14 cursor-pointer bg-[#166534] rounded-full flex items-center justify-center shadow-xl hover:bg-[#105229] transition-all transform hover:scale-110 active:scale-95"
      >
        {open ? (
          <span className="text-white font-bold text-xl">✕</span>
        ) : (
          <BotMessageSquare color="white" size={28} />
        )}
      </button>
    </div>
  );
}

function ChatSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-10 w-2/3 bg-gray-200 rounded-2xl rounded-bl-none"></div>
        <div className="h-14 w-3/4 bg-gray-200 rounded-2xl rounded-bl-none"></div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <div className="h-10 w-1/2 bg-gray-300 rounded-2xl rounded-br-none"></div>
      </div>
      <div className="h-10 w-2/3 bg-gray-200 rounded-2xl rounded-bl-none"></div>
    </div>
  );
}