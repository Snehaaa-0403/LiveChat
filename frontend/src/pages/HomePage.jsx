import { useMessageStore } from "../store/useMessageStore";
import Sidebar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

function HomePage() {
  const { selectedUser } = useMessageStore();

  return (
    <div className="absolute top-16 bottom-0 left-0 right-0 bg-slate-50 flex flex-col overflow-hidden">
      
      <div className="flex-1 flex items-center justify-center sm:p-4 overflow-hidden">
        
        <div className="bg-white w-full max-w-7xl h-full flex flex-row overflow-hidden
                        rounded-none sm:rounded-3xl
                        border-0 sm:border sm:border-slate-100
                        shadow-none sm:shadow-2xl">
          
          <Sidebar />

          {!selectedUser ? (
            <NoChatSelected />
          ) : (
            <ChatContainer />
          )}

        </div>
      </div>
    </div>
  );
}

export default HomePage;

