import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-slate-50/50">
      <div className="max-w-md text-center space-y-6">
        
        {/* 1. Interactive Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center
             justify-center animate-bounce transition-all duration-1000"
            >
              <MessageSquare className="w-8 h-8 text-blue-600 " />
            </div>
          </div>
        </div>

        {/* 2. Welcome Text */}
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Welcome to Chatty!
        </h2>
        
        {/* 3. Instructions */}
        <p className="text-slate-500 font-medium leading-relaxed">
          Select a conversation from the sidebar to start chatting. <br/>
          Stay connected with the people who matter most.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;