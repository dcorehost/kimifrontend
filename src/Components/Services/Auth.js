

const Auth = {
  // Store authentication data in localStorage
  login: (data) => {
    try {
      if (data && data.token && data.username && data.wallet !== undefined) {
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
      return authData !== null; // Check if AuthData exists in localStorage
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
        console.log("AuthData retrieved:", parsedData); // Debugging: Log retrieved data
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

  // Get the stored token for authorization
  getToken: () => {
    try {
      const authData = Auth.getAuthData();
      if (authData && authData.token) {
        return authData.token;
      } else {
        console.error("No token found.");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  },
};

export default Auth;
