import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://livechat-ehwt.onrender.com/api",
    withCredentials:true //To enable to send cookies with every single request
})

