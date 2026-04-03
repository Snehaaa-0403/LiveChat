import { Routes,Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import { Toaster } from "react-hot-toast";

function App(){
    const { checkAuth,authUser,isCheckingAuth,onlineUsers } = useAuthStore();
    console.log(onlineUsers);
    useEffect(()=>{
      checkAuth();
    },[checkAuth]);

    console.log({authUser});
    if(isCheckingAuth){
      return(
          <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>
          </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-center" reverseOrder={false} />
        <NavBar />
        {/* Adding a top margin here ensures the page content starts AFTER the 16px (h-16) Navbar */}
        <main className="flex-1 pt-16"> 
          <Routes>
            <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route 
              path="/profile" 
              element={authUser ? <ProfilePage /> : <Navigate to="/login" replace />} 
            />
          </Routes>
        </main>
      </div>
    );
}

export default App;
