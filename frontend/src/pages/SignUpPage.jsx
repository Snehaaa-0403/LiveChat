import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, User, Lock, EyeOff, Eye, Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
        toast.error("Full name is required");
        return false;
    }
    if (!formData.email.trim()) {
        toast.error("Email is required");
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error("Invalid email format");
        return false;
    }
    if (!formData.password) {
        toast.error("Password is required");
        return false;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    
    if (!passwordRegex.test(formData.password)) {
        toast.error("Password must be at least 8 characters long and include a letter, a number, and a special character.");
        return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) signup(formData);
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative overflow-hidden">
        
        {/* Subtle background blurs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-40" />

        <div className="w-full max-w-[540px] mx-auto relative z-10">
          
          <div className="mb-10 text-left">
            <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-3">
              Create your account
            </h1>
            <p className="text-slate-500 text-xl font-medium">
              Join the community and start chatting.
            </p>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              
              {/* Full Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 ml-1 uppercase tracking-widest">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <User className="size-5" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 ml-1 uppercase tracking-widest">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail className="size-5" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-800 ml-1 uppercase tracking-widest">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Lock className="size-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="••••••••"
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

            {/* Premium Submit Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-3 mt-6"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-6 animate-spin" />
                  <span>Creating your account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <Sparkles className="size-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-slate-500 font-medium text-lg mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-[45%] relative items-center justify-center p-12 bg-[#0F172A] overflow-hidden">
        
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-indigo-950 to-[#0F172A]" />
        
        {/* Animated Orbs */}
        <div className="absolute top-0 right-0 w-full h-full">
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse delay-700" />
        </div>

        <div className="relative z-10 text-center space-y-10">
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-5">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`size-20 rounded-3xl border border-white/10 flex items-center justify-center transition-all duration-500 shadow-2xl ${
                    i % 2 === 0 
                    ? "bg-white/10 scale-110 shadow-blue-500/20 border-white/20" 
                    : "bg-white/5 opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-4 max-w-sm mx-auto text-white">
            <h2 className="text-4xl font-bold tracking-tight">Join our community</h2>
            <p className="text-blue-100/60 text-lg font-medium leading-relaxed">
              Connect with friends, share moments, and stay in touch with the people who matter most.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;