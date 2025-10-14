import axios from "axios";
import {BASE_URL} from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,    
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
// Request Interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("token");
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response)
    {
       if(error.response.status === 401) {
          // Handle unauthorized access, e.g., redirect to login
          console.error("Unauthorized access - redirecting to login");
          window.location.href = "/login"; // Adjust the path as needed
       }
       else if(error.response.status==500)
       {
          // Handle server error
          console.error("Server error occurred");
       }
       else if(error.code=="ECONNABORTED")
       {
          // Handle request timeout
          console.error("Request timed out");
       }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;