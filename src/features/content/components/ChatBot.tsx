import { useEffect, useRef, useState, useCallback } from "react";
import api from "../../../shared/services/axios";
import type { ChatType, RoomChatType } from "../content.types";
import { BotMessageSquare, SendHorizontal, X, Users } from "lucide-react";
import socket from "../../../services/socket";
import { useAppSelector } from "../../../shared/hooks/redux";

export default function ChatBot({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState<ChatType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sending, setSending] = useState(false);
  const [toggle, setToggle] = useState(false); // false = AI, true = Room
  const [roomChats, setRoomChats] = useState<RoomChatType[]>([]);

  const { user } = useAppSelector((state) => state.user);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  // 1. Socket Setup (Only on mount/id change)
  useEffect(() => {
    socket.emit("join_room", id); // Ensure user is in the room

    const handleNewMessage = (data: RoomChatType) => {
      setRoomChats((prev) => [...prev, data]);
    };

    socket.on("receive_chatbot_message", handleNewMessage);

    return () => {
      socket.off("receive_chatbot_message", handleNewMessage);
    };
  }, [id]);

  useEffect(() => {
    if (!open) return;

    if (!toggle && !chats) {
      fetchAIChats();
    } else if (toggle && roomChats.length === 0) {
      fetchRoomMessages();
    }
  }, [open, toggle , id]);

  useEffect(() => {
    scrollToBottom();
  }, [chats, roomChats, sending, open]);

  const fetchAIChats = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/chatbot/${id}`);
      setChats(data.data);
    } catch (error) {
      console.error("Failed to fetch AI chats", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoomMessages = async () => {
    setLoading(true);
    try {
      const { data:peerMessages } = await api.get(`/chatbot/messages/${id}?limit=20`);
      setRoomChats(peerMessages.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMainSend = async () => {
    if (!inputValue.trim()) return;

    if (toggle) {
      socket.emit("send_chatbot_message", { contentId: id, message: inputValue });
      setInputValue("");
    } else {
      if (sending) return;
      const question = inputValue;
      setChats((pre) => [...(pre || []), { role: "user", content: question }]);
      setInputValue("");
      setSending(true);
      try {
        const { data } = await api.post("/chatbot", { contentId: id, question });
        if (data.success) setChats((pre) => [...(pre || []), data.data]);
      } catch (error) {
        console.error(error);
      } finally {
        setSending(false);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {open && (
        <div className="mb-4 w-[85vw] md:w-96 h-[500px] bg-white rounded-2xl shadow-3xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-3 bg-[#166534] text-white">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                {toggle ? <Users size={18} /> : <BotMessageSquare size={18} />}
                <span className="font-bold text-sm">{toggle ? "Group Chat" : "Mentor Max AI"}</span>
              </div>
              <button onClick={() => setOpen(false)} className="hover:bg-white/10 p-1 cursor-pointer rounded-full"><X size={20} /></button>
            </div>

            <div className="flex bg-black/20 p-1 rounded-lg">
              <button 
                onClick={() => setToggle(false)}
                className={`flex-1 text-xs py-1.5 cursor-pointer rounded-md transition-all ${!toggle ? 'bg-white text-[#166534] shadow-sm' : 'text-white/70'}`}
              >
                AI Mentor
              </button>
              <button 
                onClick={() => setToggle(true)}
                className={`flex-1 text-xs py-1.5 cursor-pointer rounded-md transition-all ${toggle ? 'bg-white text-[#166534] shadow-sm' : 'text-white/70'}`}
              >
                Peer Room
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {loading ? (
              <ChatSkeleton />
            ) : !toggle ? (
              chats?.map((chat, i) => (
                <div key={i} className={`max-w-[85%] p-3 rounded-2xl text-sm ${chat.role === "user" ? "ml-auto bg-[#166534] text-white rounded-br-none" : "mr-auto bg-white text-gray-800 border border-gray-100 rounded-bl-none"}`}>
                  {chat.content}
                </div>
              ))
            ) : (
              roomChats?.map((v) => (
                <div key={v._id} className={`max-w-[85%] p-3 rounded-2xl text-sm ${v.sender?._id === user?._id ? "ml-auto bg-[#166534] text-white rounded-br-none" : "mr-auto bg-white text-gray-800 border border-gray-100 rounded-bl-none"}`}>
                  {v.sender?._id !== user?._id && <p className="text-[10px] font-bold mb-1 text-gray-500">{v.sender?.name}</p>}
                  {v.message}
                </div>
              ))
            )}
            {sending && <TypingIndicator />}
          </div>

          <div className="p-4 bg-white border-t">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleMainSend()}
                placeholder={toggle ? "Message group..." : "Ask Mentor Max..."}
                className="w-full pl-4 pr-12 py-3 bg-gray-100 rounded-xl text-sm outline-none"
              />
              <button onClick={handleMainSend} disabled={!inputValue.trim()} className="absolute right-1.5 p-2 bg-[#166534] text-white rounded-lg disabled:opacity-50">
                <SendHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(!open)} className="w-14 h-14 cursor-pointer bg-[#166534] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
        {open ? <X color="white" size={24} /> : <BotMessageSquare color="white" size={28} />}
      </button>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="mr-auto bg-white p-3 rounded-2xl rounded-bl-none border flex gap-1 items-center">
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
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