
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, EyeOff, Eye, Loader2, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-full lg:w-[60%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative overflow-hidden">
        
        {/* Subtle background blurs - pointer-events-none is key here! */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="w-full max-w-[480px] mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-10 text-left">
            <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-blue-600 shadow-xl shadow-blue-100 mb-5">
              <LogIn className="size-7 text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
              Welcome back
            </h1>
            <p className="text-slate-500 text-lg font-medium">
              Log in to your account to continue chatting.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 ml-1 uppercase tracking-widest">
                    Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail className="size-5" />
                  </div>
                  <input
                    type="email"
                    autoComplete="off"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                    <label className="text-sm font-bold text-slate-800 uppercase tracking-widest">
                        Password
                    </label>
                    
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock className="size-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white py-4.5 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-3 mt-4"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-6 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-slate-500 font-medium text-lg mt-8">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden lg:flex w-[40%] relative items-center justify-center p-12 bg-slate-900 overflow-hidden">
        
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-slate-900 to-black" />
        
        <div className="relative z-10 text-center space-y-10">
          {/* Animated UI Elements */}
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-5">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`size-16 sm:size-20 rounded-3xl border border-white/10 flex items-center justify-center transition-all duration-500 ${
                    i % 2 !== 0 
                    ? "bg-white/10 scale-110 shadow-2xl shadow-indigo-500/20 border-white/20" 
                    : "bg-white/5 opacity-30"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-4 max-w-sm mx-auto text-white">
            <h2 className="text-4xl font-bold tracking-tight">Stay connected.</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Every conversation matters. Join thousands of users sharing moments in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;