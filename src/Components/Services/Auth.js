
// const Auth = {
//   login: ({ token, username, typeOfUser }) => {
//     localStorage.setItem("authToken", token);
//     localStorage.setItem("username", username);
//     localStorage.setItem("typeOfUser", typeOfUser);
//   },

//   logout: () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("username");
//     localStorage.removeItem("typeOfUser");
//   },

//   isAuthenticated: () => {
//     return !!localStorage.getItem("authToken");
//   },

//   getUserType: () => {
//     return localStorage.getItem("typeOfUser");
//   },

//   getAuthData: () => {
//     return {
//       token: localStorage.getItem("authToken"),
//       username: localStorage.getItem("username"),
//       typeOfUser: localStorage.getItem("typeOfUser"),
//     };
//   },

//   getToken: () => {
//     return localStorage.getItem("authToken"); // ✅ Fix: Add this function
//   },
// };

// export default Auth;



const Auth = {
  login: ({ token, username, typeOfUser, emailId }) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("typeOfUser", typeOfUser);
    localStorage.setItem("emailId", emailId); // ✅ Store email ID
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("typeOfUser");
    localStorage.removeItem("emailId"); // ✅ Remove email on logout
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },

  getUserType: () => {
    return localStorage.getItem("typeOfUser");
  },

  getAuthData: () => {
    return {
      token: localStorage.getItem("authToken"),
      username: localStorage.getItem("username"),
      typeOfUser: localStorage.getItem("typeOfUser"),
      emailId: localStorage.getItem("emailId"), // ✅ Retrieve email
    };
  },

  getToken: () => {
    return localStorage.getItem("authToken");
  },
};

export default Auth;
