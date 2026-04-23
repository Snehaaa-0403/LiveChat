import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return(

    <div className="w-full flex flex-1 flex-col items-center justify-center p-6 sm:p-8 lg:p-16 bg-slate-50/50">
      
      <div className="max-w-md text-center space-y-4 sm:space-y-6">
        
        <div className="flex justify-center gap-4 mb-2 sm:mb-4">
          <div className="relative">
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-50 flex items-center
             justify-center animate-bounce transition-all duration-1000"
            >
              <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 " />
            </div>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Welcome to LiveChat!
        </h2>

        <p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed px-2 sm:px-0">
          Select a conversation from the sidebar to start chatting. <br className="hidden sm:block" />
          Stay connected with the people who matter most.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;