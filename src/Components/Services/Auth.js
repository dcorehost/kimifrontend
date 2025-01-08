// // auth.js
// const Auth = {
//     // Store authentication data in localStorage
//     login: (data) => {
//       try {
//         localStorage.setItem("authData", JSON.stringify(data));
//         console.log("Auth data saved:", data);
//       } catch (error) {
//         console.error("Error saving auth data:", error);
//       }
//     },
  
//     // Remove authentication data from localStorage
//     logout: () => {
//       try {
//         localStorage.removeItem("authData");
//         console.log("Auth data removed.");
//       } catch (error) {
//         console.error("Error removing auth data:", error);
//       }
//     },
  
//     // Check if a user is authenticated
//     isAuthenticated: () => {
//       try {
//         return localStorage.getItem("authData") !== null;
//       } catch (error) {
//         console.error("Error checking authentication status:", error);
//         return false;
//       }
//     },
  
//     // Retrieve authentication data from localStorage
//     getAuthData: () => {
//       try {
//         const authData = localStorage.getItem("authData");
//         return authData ? JSON.parse(authData) : null;
//       } catch (error) {
//         console.error("Error retrieving auth data:", error);
//         return null;
//       }
//     },
//   };
  
//   export default Auth;
  


// Auth.js
const Auth = {
    // Store authentication data in localStorage
    login: (data) => {
      try {
        localStorage.setItem("AuthData", JSON.stringify(data));
        console.log("Auth data saved:", data);
      } catch (error) {
        console.error("Error saving Auth data:", error);
      }
    },
  
    // Remove authentication data from localStorage
    logout: () => {
      try {
        localStorage.removeItem("AuthData");
        console.log("Auth data removed.");
      } catch (error) {
        console.error("Error removing Auth data:", error);
      }
    },
  
    // Check if a user is authenticated
    isAuthenticated: () => {
      try {
        return localStorage.getItem("AuthData") !== null;
      } catch (error) {
        console.error("Error checking authentication status:", error);
        return false;
      }
    },
  
    // Retrieve authentication data from localStorage
    getAuthData: () => {
      try {
        const AuthData = localStorage.getItem("AuthData");
        return AuthData ? JSON.parse(AuthData) : null;
      } catch (error) {
        console.error("Error retrieving Auth data:", error);
        return null;
      }
    },
  };
  
  export default Auth;
  