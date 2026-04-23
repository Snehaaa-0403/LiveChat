import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    // Selecting the file which user has selected
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 bg-slate-50">
      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* Main Profile Card */}
        <div className="bg-white rounded-3xl p-8 space-y-8 shadow-xl border border-slate-100">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Profile
            </h1>
            <p className="mt-2 text-slate-500 font-medium">
              Your personal information
            </p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImage || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-white shadow-2xl transition-transform group-hover:scale-[1.02]"
              />
              {/* Camera Icon Overlay */}
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  bg-slate-900 hover:bg-blue-600 p-2.5
                  rounded-full cursor-pointer transition-all duration-300
                  shadow-lg border-4 border-white
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Click the camera icon to update your photo
            </p>
          </div>

          {/* Information Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <div className="px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 font-semibold shadow-sm">
                {authUser?.fullName}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <div className="px-5 py-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 font-semibold shadow-sm">
                {authUser?.email}
              </div>
            </div>
          </div>

          {/* Account Status Footer */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Account Status
              </span>
              <span className="text-sm font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;