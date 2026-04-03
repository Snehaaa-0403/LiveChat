import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Home, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-white/80 border-b border-slate-200 fixed w-full top-0 z-40 
    backdrop-blur-lg transition-all duration-300"
    >
      <div className="container mx-auto px-4 h-16">
        
        {/* 🛠️ THE FIX: Dynamic Layout based on Auth State */}
        <div className={`flex items-center h-full ${authUser ? "justify-between" : "justify-center"}`}>
          
          {/* Logo - Stays on the left for users, moves to center for guests */}
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <div className="size-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Chatty
              </h1>
          </Link>

          {/* RIGHT SIDE - Actions (Only renders if authenticated) */}
          {authUser && (
            <div className="flex items-center gap-2">
              <Link to={"/"} className="btn btn-sm gap-2 p-2 hover:bg-slate-100 rounded-lg flex items-center transition-colors">
                <Home className="size-5 text-slate-600" />
                <span className="hidden sm:inline text-slate-700 font-medium text-sm">Home</span>
              </Link>

              <Link to={"/profile"} className="btn btn-sm gap-2 p-2 hover:bg-slate-100 rounded-lg flex items-center transition-colors">
                <User className="size-5 text-slate-600" />
                <span className="hidden sm:inline text-slate-700 font-medium text-sm">Profile</span>
              </Link>

              <button 
                  className="flex items-center gap-2 p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" 
                  onClick={logout}
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline font-medium text-sm">Logout</span>
              </button>
            </div>
          )}
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;