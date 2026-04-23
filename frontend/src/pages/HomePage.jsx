import { useMessageStore } from "../store/useMessageStore";
import Sidebar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

function HomePage() {
  const { selectedUser } = useMessageStore();

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">

      <div className="flex-1 flex sm:p-4 overflow-hidden">
        
        <div className="bg-white w-full max-w-7xl mx-auto h-full flex flex-row overflow-hidden
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

