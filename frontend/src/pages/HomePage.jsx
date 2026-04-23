import { useMessageStore } from "../store/useMessageStore";
import Sidebar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

function HomePage() {
  const { selectedUser } = useMessageStore();

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      
      <div className="flex-1 flex items-center justify-center pt-20 pb-4 sm:px-4">
        
        <div className="bg-white w-full max-w-7xl h-full overflow-hidden
                        rounded-none sm:rounded-3xl
                        border-0 sm:border sm:border-slate-100
                        shadow-none sm:shadow-2xl">
          
          <div className="flex h-full sm:rounded-3xl overflow-hidden">
            
            <Sidebar />

            {!selectedUser ? (
              <NoChatSelected />
            ) : (
              <ChatContainer />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

