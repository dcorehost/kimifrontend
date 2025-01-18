

// const Auth = {
//   // Store authentication data in localStorage
//   login: (data) => {
//     try {
//       localStorage.setItem("AuthData", JSON.stringify(data));
//       console.log("Auth data saved:", data);
//     } catch (error) {
//       console.error("Error saving Auth data:", error);
//     }
//   },

//   // Remove authentication data from localStorage
//   logout: () => {
//     try {
//       localStorage.removeItem("AuthData");
//       console.log("Auth data removed.");
//     } catch (error) {
//       console.error("Error removing Auth data:", error);
//     }
//   },

//   // Check if a user is authenticated
//   isAuthenticated: () => {
//     try {
//       return localStorage.getItem("AuthData") !== null;
//     } catch (error) {
//       console.error("Error checking authentication status:", error);
//       return false;
//     }
//   },

//   // Retrieve authentication data from localStorage
//   getAuthData: () => {
//     try {
//       const AuthData = localStorage.getItem("AuthData");
//       return AuthData ? JSON.parse(AuthData) : null;
//     } catch (error) {
//       console.error("Error retrieving Auth data:", error);
//       return null;
//     }
//   },

  
// };
// // Assuming this is called after a successful login API call
// const loginData = {
//   message: "Login successfully",
//   token: "your-token",
//   username: "depaaaaa",   // User's name
//   wallet: 1000            // Wallet amount
// };

// // Store in localStorage
// Auth.login(loginData); // This will save the username and wallet data in localStorage

// export default Auth;


// ///working code 
// const Auth = {
//   // Store authentication data in localStorage
//   login: (data) => {
//     try {
//       localStorage.setItem("AuthData", JSON.stringify(data));
//       console.log("Auth data saved:", data);
//     } catch (error) {
//       console.error("Error saving Auth data:", error);
//     }
//   },

//   // Remove authentication data from localStorage
//   logout: () => {
//     try {
//       localStorage.removeItem("AuthData");
//       console.log("Auth data removed.");
//     } catch (error) {
//       console.error("Error removing Auth data:", error);
//     }
//   },

//   // Check if a user is authenticated
//   isAuthenticated: () => {
//     try {
//       return localStorage.getItem("AuthData") !== null;
//     } catch (error) {
//       console.error("Error checking authentication status:", error);
//       return false;
//     }
//   },

//   // Retrieve authentication data from localStorage
//   getAuthData: () => {
//     try {
//       const AuthData = localStorage.getItem("AuthData");
//       return AuthData ? JSON.parse(AuthData) : null;
//     } catch (error) {
//       console.error("Error retrieving Auth data:", error);
//       return null;
//     }
//   },
// };

// export default Auth;



const Auth = {
  // Store authentication data in localStorage
  login: (data) => {
    try {
      if (data && data.userId && data.token) {
        localStorage.setItem("AuthData", JSON.stringify(data));
        console.log("Auth data saved:", data);
      } else {
        console.error("Login data is incomplete:", data);
      }
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
      const authData = localStorage.getItem("AuthData");
      return authData !== null;  // Checking if AuthData exists
    } catch (error) {
      console.error("Error checking authentication status:", error);
      return false;
    }
  },

  // Retrieve authentication data from localStorage
  getAuthData: () => {
    try {
      const authData = localStorage.getItem("AuthData");
      if (authData) {
        const parsedData = JSON.parse(authData);
        console.log("AuthData retrieved:", parsedData);  // Log data for debugging
        return parsedData;
      } else {
        console.error("AuthData not found in localStorage.");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving Auth data:", error);
      return null;
    }
  },
};

export default Auth;
