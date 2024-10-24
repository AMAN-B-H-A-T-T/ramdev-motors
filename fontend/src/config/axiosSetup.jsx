import axios from "axios";

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: 'your_base_url',  // Replace with your base URL
  });
  
  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Show loader when the request starts
      window.dispatchEvent(new CustomEvent("loading", { detail: true }));
      return config;
    },
    (error) => {
      window.dispatchEvent(new CustomEvent("loading", { detail: false }));
      return Promise.reject(error);
    }
  );
  
  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Hide loader when the response arrives
      window.dispatchEvent(new CustomEvent("loading", { detail: false }));
      return response;
    },
    (error) => {
      window.dispatchEvent(new CustomEvent("loading", { detail: false }));
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;