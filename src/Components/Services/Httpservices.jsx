
// httpsservices.js
// import axios from "axios";
// import auth from "../Httpservices/auth."; 

// // Base API URL
// const baseApiUrl = "https://13.127.161.242:8001/kimi/";

// // Create Axios instance
// const axiosInstance = axios.create({
//   baseURL: baseApiUrl,
// });

// // Add Authorization header using Axios interceptors
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const authData = auth.getAuthData();
//     if (authData && authData.token) {
//       config.headers.Authorization = `Bearer ${authData.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );

// // Define HTTP methods
// const get = (url, config = {}) => axiosInstance.get(url, config);

// const post = (url, body, config = {}) => axiosInstance.post(url, body, config);

// const put = (url, body, config = {}) => axiosInstance.put(url, body, config);

// const deleteReq = (url, config = {}) => axiosInstance.delete(url, config);

// // Export the HTTP methods
// const Httpservices = {
//   get,
//   post,
//   put,
//   deleteReq,
// };

// export default Httpservices;





// import axios from "axios";
// import Auth from "../Services/Auth.js"; 

// // Base API URL
// const baseApiUrl = "https://13.127.161.242:8001/kimi/";

// // Create Axios instance
// const axiosInstance = axios.create({
//   baseURL: baseApiUrl,
// });

// // Add Authorization header using Axios interceptors
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const AuthData = Auth.getAuthData();
//     if (AuthData && AuthData.token) {
//       config.headers.Authorization = `Bearer ${AuthData.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );

// // Define HTTP methods
// const get = (url, config = {}) => axiosInstance.get(url, config);

// const post = (url, body, config = {}) => axiosInstance.post(url, body, config);

// const put = (url, body, config = {}) => axiosInstance.put(url, body, config);

// const deleteReq = (url, config = {}) => axiosInstance.delete(url, config);

// // Export the HTTP methods
// const Httpservices = {
//   get,
//   post,
//   put,
//   deleteReq,
// };

// export default Httpservices;




import axios from "axios";
import Auth from "../Services/Auth.js";

// Base API URL
const baseApiUrl = "http://13.127.161.242:8001/kimi/";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: baseApiUrl,
  timeout: 10000, // Set a 10-second timeout
});

// Add Authorization header using Axios interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const authData = Auth.getAuthData();
    if (authData && authData.token) {
      config.headers.Authorization = `Bearer ${authData.token}`;
    }
    console.log("Request Config:", config); // Log outgoing request config
    return config;
  },
  (error) => {
    console.error("Request Error:", error.toJSON()); // Log error during request configuration
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling and debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Data:", response); // Log successful response data
    return response;
  },
  (error) => {
    if (error.response) {
      // Server-side error
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      // No response received
      console.error("No Response Error:", error.request);
    } else {
      // Error in setting up the request
      console.error("Axios Configuration Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Define HTTP methods
const get = (url, config = {}) => axiosInstance.get(url, config);

const post = (url, body, config = {}) => axiosInstance.post(url, body, config);

const put = (url, body, config = {}) => axiosInstance.put(url, body, config);

const deleteReq = (url, config = {}) => axiosInstance.delete(url, config);

// Export the HTTP methods
const Httpservices = {
  get,
  post,
  put,
  deleteReq,
};

export default Httpservices;












// import axios from "axios";
// import Auth from "../Services/Auth.js";

// // Base API URL
// const baseApiUrl = "https://13.127.161.242:8001/kimi/";

// // Create Axios instance
// const axiosInstance = axios.create({
//   baseURL: baseApiUrl,
// });

// // Add Authorization header using Axios interceptors
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const authData = Auth.getAuthData();
//     if (authData && authData.token) {
//       config.headers.Authorization = `Bearer ${authData.token}`;
//     }
//     console.log("Request Config:", config); // Debug log for outgoing requests
//     return config;
//   },
//   (error) => {
//     console.error("Request Error:", error.toJSON());
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor for better error handling and debugging
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log("Response Data:", response); // Debug log for responses
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       // Server-side error
//       console.error("Response Error:", error.response.data);
//     } else if (error.request) {
//       // No response received
//       console.error("No Response Error:", error.request);
//     } else {
//       // Error in setting up the request
//       console.error("Axios Configuration Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// // Define HTTP methods
// const get = (url, config = {}) => axiosInstance.get(url, config);

// const post = (url, body, config = {}) => axiosInstance.post(url, body, config);

// const put = (url, body, config = {}) => axiosInstance.put(url, body, config);

// const deleteReq = (url, config = {}) => axiosInstance.delete(url, config);

// // Export the HTTP methods
// const Httpservices = {
//   get,
//   post,
//   put,
//   deleteReq,
// };

// export default Httpservices;
