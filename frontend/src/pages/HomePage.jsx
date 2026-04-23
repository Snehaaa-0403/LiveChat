import { useMessageStore } from "../store/useMessageStore";
import Sidebar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

function HomePage() {
  const { selectedUser } = useMessageStore();

  return (
    <div className="fixed inset-0 pt-16 bg-slate-50 flex flex-col z-0">
      
      <div className="flex-1 flex items-center justify-center sm:p-4">
        
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

