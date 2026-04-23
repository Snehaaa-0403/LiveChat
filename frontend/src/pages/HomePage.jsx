import { useMessageStore } from "../store/useMessageStore";
import Sidebar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
function HomePage() {
    const { selectedUser } = useMessageStore();
    return (
        <div className="h-screen bg-slate-50">
          <div className="flex items-center justify-center pt-20 px-4">
          {/* Main Dashboard Container */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl h-[calc(100vh-8rem)] border border-slate-100 overflow-hidden">
              <div className="flex h-full rounded-3xl">
                <Sidebar />
                {/* 2. Chat Area - Dynamic Content */}
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


