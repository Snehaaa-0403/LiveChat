import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials:true //To enable to send cookies with every single request
})

