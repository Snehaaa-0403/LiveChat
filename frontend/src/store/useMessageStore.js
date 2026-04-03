import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { Socket } from "socket.io-client";

export const useMessageStore = create((set,get)=>({
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    messages:[],
    isMessagesLoading:false,

    getUsers: async()=>{
        set({isUsersLoading:true});
        try{
            const res=await axiosInstance.get("/message/users");
            set({users:res.data});
        }
        catch(error){
            console.log("Error in fetching users :",error);
            toast.error(error.response.data.message);
        }
        finally{
            set({isUsersLoading:false});
        }
    },

    getMessages : async(userId)=>{
        set({isMessagesLoading:true});
        try{
            const res=await axiosInstance.get(`/message/${userId}`);
            set({messages:res.data})
        }
        catch(error){
            console.log("Error in fetching messages :",error);
            toast.error(error.response.data.message);
        }
        finally{
            set({isMessagesLoading:false});
        }
    },

    setSelectedUser : (selectedUser) => set({selectedUser}),

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = useMessageStore.getState();

        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
            toast.success("Sent Message Successfully");
            
        } catch (error) {
            console.log("Error in sending messages:", error);
            toast.error(error.response?.data?.message || "Internal Server Error");
        }
    },

    subscribeToMessages : () => {
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on("newMessage",(newMessage)=>{
            if(newMessage.senderId!==selectedUser._id) return;
            set({
                messages:[...get().messages,newMessage]
            })
        })
    },

    unsubscribeFromMessages : ()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }
}))

