import { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { Users, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const SideBar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useMessageStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Loading State
  if (isUserLoading) {
    return (
      <aside className="h-full w-20 lg:w-72 border-r border-slate-200 flex flex-col items-center justify-center bg-white transition-all duration-200">
        <Loader2 className="size-8 animate-spin text-blue-600" />
      </aside>
    );
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-slate-200 flex flex-col bg-white transition-all duration-200">
      {/* Header Area */}
      <div className="p-5 border-b border-slate-200 w-full flex items-center gap-3">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
          <Users className="size-5" />
        </div>
        <span className="font-bold text-slate-900 hidden lg:block tracking-tight text-lg">
          Contacts
        </span>
      </div>

      {/* Scrollable User List */}
      <div className="overflow-y-auto w-full py-2">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-4 flex items-center gap-4
              hover:bg-slate-50 transition-all duration-200
              ${
                selectedUser?._id === user._id
                  ? "bg-blue-50/80 ring-1 ring-inset ring-blue-100"
                  : ""
              }
            `}
          >
            {/* User Avatar */}
            <div className="relative mx-auto lg:mx-0 shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full border border-slate-200 shadow-sm"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white" />
              )}
            </div>

            {/* User Info - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-bold text-slate-900 truncate">{user.fullName}</div>
              <div className="text-xs text-slate-500 font-medium truncate mt-0.5">
                <p className="text-xs text-slate-500 font-medium">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </button>
        ))}

        {/* Empty State Fallback (If no users exist in database) */}
        {users.length === 0 && (
          <div className="text-center text-slate-500 py-10 px-4 hidden lg:block font-medium">
            No contacts found.
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideBar;