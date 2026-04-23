import { useRef, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { Image, Send } from "lucide-react";
import { toast } from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useMessageStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Safety check for large files
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      toast.success("Image attached!");
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !selectedImage) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: selectedImage,
      });

      // Clear the form after sending
      setText("");
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-4 w-full border-t border-slate-200 bg-white z-10">
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-3 w-full"
      >
        {/* Input Wrapper */}
        <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-full px-4 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent py-3.5 outline-none text-slate-900 placeholder:text-slate-400 font-medium"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Image Attachment Button */}
          <button
            type="button"
            className={`p-2 rounded-full transition-colors flex items-center justify-center
              ${
                selectedImage
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
              }`}
            onClick={() => fileInputRef.current?.click()}
            title={
              selectedImage ? "Image attached (Click to change)" : "Attach image"
            }
          >
            <Image className="size-5" />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !selectedImage}
          className="size-12 shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none"
        >
          <Send className="size-5 ml-1" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;