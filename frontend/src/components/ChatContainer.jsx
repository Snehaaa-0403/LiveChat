import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef } from "react"; // 🛠️ 1. Imported useRef
import { Users, Loader2 } from "lucide-react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    setSelectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessageStore();
  const { authUser } = useAuthStore();

  // 🛠️ 2. Create the reference anchor
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages]);

  // 🛠️ 3. Add the auto-scroll effect
  useEffect(() => {
    // A tiny timeout ensures the DOM has painted the new messages before trying to scroll
    setTimeout(() => {
      if (messageEndRef.current && messages) {
        messageEndRef.current.scrollIntoView({
          behavior: "smooth", // Note: Change "smooth" to "auto" if you want an instant, jump-like scroll instead of a gliding animation
        });
      }
    }, 100);
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div>
        <ChatHeader />
        <aside className="h-full w-20 lg:w-72 border-r border-slate-200 flex flex-col items-center justify-center bg-white transition-all duration-200">
          <Loader2 className="size-8 animate-spin text-blue-600" />
        </aside>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      {/* Displaying Messages */}
      {/* Messages Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => {
          // Check if the logged-in user sent this specific message
          const isOwnMessage = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[75%] lg:max-w-[65%] ${
                  isOwnMessage ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* 1. Avatar */}
                <div className="shrink-0">
                  <img
                    src={
                      isOwnMessage
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile"
                    className="size-8 rounded-full object-cover border border-slate-200 shadow-sm mt-auto"
                  />
                </div>

                {/* 2. Message Content */}
                <div className="flex flex-col gap-1">
                  {/* Bubble */}
                  <div
                    className={`flex flex-col p-3 shadow-sm
                    ${
                      isOwnMessage
                        ? "bg-blue-600 text-white rounded-2xl rounded-br-sm" // Sender styling
                        : "bg-white text-slate-900 border border-slate-200 rounded-2xl rounded-bl-sm" // Receiver styling
                    }
                    `}
                  >
                    {/* Render Image if it exists */}
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-xl mb-2 object-cover"
                      />
                    )}

                    {/* Render Text if it exists */}
                    {message.text && (
                      <p className="text-[15px] leading-relaxed">
                        {message.text}
                      </p>
                    )}
                  </div>

                  {/* 3. Timestamp */}
                  <div
                    className={`text-[10px] font-medium text-slate-400 ${
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

        {/* 🛠️ 4. The invisible anchor point */}
        <div ref={messageEndRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
