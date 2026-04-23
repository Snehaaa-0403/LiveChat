import { useMessageStore } from "../store/useMessageStore";
import SideBar from "../components/SideBar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

function HomePage() {
  const { selectedUser } = useMessageStore();

  return (
    <div className="h-full w-full bg-slate-50 overflow-hidden">
      <div className="flex items-center justify-center p-4 h-full">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-7xl h-full overflow-hidden">
          <div className="flex h-full">
            <SideBar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

