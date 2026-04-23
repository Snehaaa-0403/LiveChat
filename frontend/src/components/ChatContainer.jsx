import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef } from "react"; 
import { Loader2 } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
    const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
    const {authUser} = useAuthStore();
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
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <ChatHeader />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="size-8 animate-spin text-blue-600" />
                </div>
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden h-full">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-6 min-h-0">
                {messages.map((message) => {
                    const isOwnMessage = message.senderId === authUser._id;
                    return (
                        <div key={message._id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                            <div className={`flex gap-3 max-w-[85%] lg:max-w-[70%] ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
                                <div className="shrink-0">
                                    <img
                                        src={isOwnMessage ? (authUser.profilePic || "/avatar.png") : (selectedUser.profilePic || "/avatar.png")}
                                        className="size-8 rounded-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className={`p-3 shadow-sm rounded-2xl ${isOwnMessage ? "bg-blue-600 text-white rounded-br-sm" : "bg-white border border-slate-200 rounded-bl-sm"}`}>
                                        {message.image && <img src={message.image} className="max-w-[200px] rounded-xl mb-2" />}
                                        {message.text && <p className="text-[15px]">{message.text}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messageEndRef} />
            </div>

            <div className="shrink-0">
                <MessageInput />
            </div>
        </div>
    );
};

export default ChatContainer;
