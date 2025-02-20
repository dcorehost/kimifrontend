
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
//     return localStorage.getItem("authToken"); // Fix: Add this function
//   },
// };

// export default Auth;



const Auth = {
  login: ({ token, username, typeOfUser, emailId ,contact1 }) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("typeOfUser", typeOfUser);
    localStorage.setItem("emailId", emailId); 
    localStorage.setItem("contact1", contact1); 
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("typeOfUser");
    localStorage.removeItem("emailId"); 
    localStorage.removeItem("contact1"); 
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
      emailId: localStorage.getItem("emailId"), 
      contact1: localStorage.getItem("contact1"), 
    };
  },

  getToken: () => {
    return localStorage.getItem("authToken");
  },
};

export default Auth;
