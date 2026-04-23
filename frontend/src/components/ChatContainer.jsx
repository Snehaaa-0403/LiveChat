import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react"; 
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);
    
    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col h-full">
                <ChatHeader />
                <div className="flex-1 flex items-center justify-center"><Loader2 className="animate-spin" /></div>
                <MessageInput />
            </div>
        );
    }

    return (
        // 🛠️ THE FIX: 'max-h-full' and 'relative' ensures the container never grows larger than its parent.
        <div className="flex-1 flex flex-col h-full max-h-full min-h-0 relative overflow-hidden">
            <ChatHeader />
            
            {/* 🛠️ IMPORTANT: Added 'overflow-y-auto' and 'flex-1' with 'min-h-0' */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {messages.map((message) => {
                    const isOwnMessage = message.senderId === authUser._id;
                    return (
                        <div key={message._id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                            <div className={`flex gap-3 max-w-[85%] ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
                                <div className="flex flex-col">
                                    <div className={`p-3 rounded-2xl ${isOwnMessage ? "bg-blue-600 text-white" : "bg-white border"}`}>
                                        {message.image && <img src={message.image} className="max-w-xs rounded-lg mb-2" onLoad={() => messageEndRef.current?.scrollIntoView()} />}
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messageEndRef} />
            </div>

            {/* 🛠️ FOOTER: This is now firmly part of the flex-col and won't be pushed out */}
            <div className="shrink-0 bg-white">
                <MessageInput />
            </div>
        </div>
    );
};

export default ChatContainer;
