import { useAuthStore } from "../store/useAuthStore";
import { useMessageStore } from "../store/useMessageStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useMessageStore();
  const{onlineUsers} = useAuthStore();  

  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm z-10">
      
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Avatar */}
        <div className="relative shrink-0">
          <img
            src={selectedUser?.profilePic || "/avatar.png"}
            alt={selectedUser?.fullName}
            className="size-10 sm:size-12 object-cover rounded-full border border-slate-200 shadow-sm"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <span className="absolute bottom-0 right-0 size-2.5 sm:size-3 bg-green-500 rounded-full ring-2 ring-white" />
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="font-bold text-slate-900 tracking-tight text-base sm:text-lg truncate">
            {selectedUser?.fullName}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <button
        onClick={() => setSelectedUser(null)}
        className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
        aria-label="Close chat"
      >
        <X className="size-5 sm:size-6" />
      </button>
      
    </div>
  );
};

export default ChatHeader;