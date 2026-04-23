import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react"; 
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ChatContainer = ()=> {
    const {messages,getMessages,isMessagesLoading,selectedUser,setSelectedUser,subscribeToMessages,unsubscribeFromMessages }=useMessageStore();
    const{authUser}=useAuthStore();
    
    const messageEndRef = useRef(null);
    
    useEffect(()=>{
        getMessages(selectedUser._id);
        subscribeToMessages();
        return()=> unsubscribeFromMessages();
    },[selectedUser._id,getMessages]);

    useEffect(() => {
        setTimeout(() => {
            if (messageEndRef.current && messages) {
                messageEndRef.current.scrollIntoView({ 
                    behavior: "smooth"
                });
            }
        }, 100);
    }, [messages]);

    if(isMessagesLoading){
        return (
            <div className="flex-1 flex flex-col overflow-auto w-full">
                <ChatHeader/>
                <div className="flex-1 flex items-center justify-center bg-slate-50 transition-all duration-200">
                    <Loader2 className="size-8 animate-spin text-blue-600" />
                </div>
                <MessageInput/>
            </div>
            );
    }

    return(
        <div className="flex-1 flex flex-col overflow-auto w-full">
            <ChatHeader/>
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-6">
                
                {messages.map((message) => {
                const isOwnMessage = message.senderId === authUser._id;

                return (
                    <div
                    key={message._id}
                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                    >
                    <div className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[75%] lg:max-w-[65%] ${isOwnMessage ? "flex-row-reverse" : "flex-row"}`}>
        
                        <div className="shrink-0">
                        <img
                            src={isOwnMessage ? (authUser.profilePic || "/avatar.png") : (selectedUser.profilePic || "/avatar.png")}
                            alt="profile"
                            className="size-6 sm:size-8 rounded-full object-cover border border-slate-200 shadow-sm mt-auto"
                        />
                        </div>
                        <div className="flex flex-col gap-1 min-w-0">
                        
                        <div
                            className={`flex flex-col p-2.5 sm:p-3 shadow-sm
                            ${
                                isOwnMessage
                                ? "bg-blue-600 text-white rounded-2xl rounded-br-sm" 
                                : "bg-white text-slate-900 border border-slate-200 rounded-2xl rounded-bl-sm" 
                            }
                            `}
                        >
                            {message.image && (
                            <img
                                src={message.image}
                                alt="Attachment"
                                className="max-w-[160px] sm:max-w-[200px] rounded-xl mb-1 sm:mb-2 object-cover"
                            />
                            )}
                            
                            {message.text && (
                            <p className="text-sm sm:text-[15px] leading-relaxed break-words">
                                {message.text}
                            </p>
                            )}
                        </div>

                        <div
                            className={`text-[9px] sm:text-[10px] font-medium text-slate-400 ${
                            isOwnMessage ? "text-right" : "text-left"
                            } px-1`}
                        >
                            {formatTime(message.createdAt)}
                        </div>

                        </div>
                    </div>
                    </div>
                );
                })}

                <div ref={messageEndRef} />

            </div>
            <MessageInput/>
        </div>
    )
}

export default ChatContainer;
