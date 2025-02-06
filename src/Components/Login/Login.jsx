
// import React, { useState } from "react";
// import { assets } from "../../assets/assets.jsx";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import httpServices from "../Services/Httpservices.jsx";
// import Auth from "../Services/Auth.js";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const response = await httpServices.post(
//         "https://admediaagency.online/kimi/login-account",
//         { username, password }
//       );

//       if (response.status === 200) {
//         const { token, username, wallet } = response.data;

//         // Store user data in localStorage
//         // localStorage.setItem("userToken", token);
//         // localStorage.setItem("username", username);

//         // Store user data in Auth (optional, depending on your setup)
//         Auth.login({ token, username, wallet });

//         setShowPopup(true);

//         // Redirect after showing popup
//         setTimeout(() => navigate("/dashboard"), 2000);
//       } else {
//         setError("Login failed. Please check your credentials.");
//       }
//     } catch (err) {
//       console.error("Login request failed:", err);
//       setError("An error occurred during login. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.MainContainer}>
//       {/* UI remains unchanged */}
//       {/* Your existing code */}
//       <div className={styles.Content}>
//         <div className={styles.backImg}></div>
//       </div>
//       <div className={styles.LoginForm}>
//         <div className={styles.container}>
//           {/* Login Form UI */}
//           <div className={styles.logo}>
//             <img
//               src={assets.logo}
//               alt="Kimi Agency Logo"
//               className={styles.kimilogo}
//             />
//           </div>
//           <h2 className={styles.title}>Hello!</h2>
//           <p className={styles.title}>WELCOME TO KIMI AGENCY</p>
//           <form onSubmit={handleLogin} className={styles.form}>
//             <div className={styles.inputGroup}>
//               <input
//                 className={styles.input}
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//             <div className={styles.inputGroup}>
//               <input
//                 className={styles.input}
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             {error && <p className={styles.error}>{error}</p>}
//             <button type="submit" disabled={isLoading} className={styles.button}>
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//       {showPopup && <div className={styles.popup}>Login Successful! Redirecting...</div>}
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from "react";
// import { assets } from "../../assets/assets.jsx";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import httpServices from "../Services/Httpservices.jsx";
// import Auth from "../Services/Auth.js";

// const Login = () => {
//   const [emailId, setEmailId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const response = await httpServices.post(
//         "https://admediaagency.online/kimi/login-account",
//         { emailId, password }
//       );

//       if (response.status === 200) {
//         const { token, username, wallet } = response.data;

//         Auth.login({ token, username, wallet });
//         setShowPopup(true);

//         setTimeout(() => navigate("/dashboard"), 2000);
//       } else {
//         setError("Login failed. Please check your credentials.");
//       }
//     } catch (err) {
//       console.error("Login request failed:", err);
//       setError("An error occurred during login. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.MainContainer}>
//       <div className={styles.Content}>
//         <div className={styles.backImg}></div>
//       </div>
//       <div className={styles.LoginForm}>
//         <div className={styles.container}>
//           <div className={styles.logo}>
//             <img
//               src={assets.logo}
//               alt="Kimi Agency Logo"
//               className={styles.kimilogo}
//             />
//           </div>
//           <h2 className={styles.title}>Hello!</h2>
//           <p className={styles.title}>WELCOME TO KIMI AGENCY</p>
//           <form onSubmit={handleLogin} className={styles.form}>
//             <div className={styles.inputGroup}>
//               <input
//                 className={styles.input}
//                 type="email"
//                 placeholder="Email ID"
//                 value={emailId}
//                 onChange={(e) => setEmailId(e.target.value)}
//                 required
//               />
//             </div>
//             <div className={styles.inputGroup}>
//               <input
//                 className={styles.input}
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             {error && <p className={styles.error}>{error}</p>}
//             <button type="submit" disabled={isLoading} className={styles.button}>
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//       {showPopup && <div className={styles.popup}>Login Successful! Redirecting...</div>}
//     </div>
//   );
// };

// export default Login;

// // last working
// import React, { useState } from "react";
// import { assets } from "../../assets/assets.jsx";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import httpServices from "../Services/Httpservices.jsx";
// import Auth from "../Services/Auth.js";

// const Login = () => {
//   const [emailId, setEmailId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       const response = await httpServices.post(
//         "https://admediaagency.online/kimi/login-account",
//         { emailId, password }
//       );

//       console.log("Login API Response:", response); // Debugging API response

//       if (response.status === 200) {
//         const { token, username, typeOfUser } = response.data || {}; // Ensure response.data exists

//         if (!token || !username) {
//           setError("Invalid response from server. Please try again.");
//           return;
//         }

//         Auth.login({ token, username, typeOfUser }); // Fallback if wallet is missing
//         setShowPopup(true);

//         setTimeout(() => navigate("/dashboard"), 2000);
//       } else {
//         setError("Login failed. Please check your credentials.");
//       }
//     } catch (err) {
//       console.error("Login request failed:", err);
//       setError("An error occurred during login. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={styles.MainContainer}>
//       <div className={styles.Content}>
//         <div className={styles.backImg}></div>
//       </div>
//       <div className={styles.LoginForm}>
//         <div className={styles.container}>
//           <div className={styles.logo}>
//             <img
//               src={assets.logo}
//               alt="Kimi Agency Logo"
//               className={styles.kimilogo}
//             />
//           </div>
//           <h2 className={styles.title}>Hello!</h2>
//           <p className={styles.title}>WELCOME TO KIMI AGENCY</p>
//           <form onSubmit={handleLogin} className={styles.form}>
//             <div className={styles.inputGroup}>
//               <input
//                 className={styles.input}
//                 type="email"
//                 placeholder="Email ID"
//                 value={emailId}
//                 onChange={(e) => setEmailId(e.target.value)}
//                 required
//               />
//             </div>
//             <div className={styles.inputGroup}>
//               <input
//                 className={styles.input}
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             {error && <p className={styles.error}>{error}</p>}
//             <button type="submit" disabled={isLoading} className={styles.button}>
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//       {showPopup && <div className={styles.popup}>Login Successful! Redirecting...</div>}
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import httpServices from "../Services/Httpservices.jsx";
import Auth from "../Services/Auth.js"; // Make sure the Auth service is correctly imported
import { assets } from "../../assets/assets.jsx";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await httpServices.post(
        "https://admediaagency.online/kimi/login-account",
        { emailId, password }
      );

      console.log("Login API Response:", response); // Debugging API response

      if (response.status === 200) {
        const { token, username, typeOfUser } = response.data || {}; // Ensure response.data exists

        console.log("User Type:", typeOfUser); // Debug log

        if (!token || !username) {
          setError("Invalid response from server. Please try again.");
          return;
        }

        // Save the user data to Auth
        Auth.login({ token, username, typeOfUser });

        setShowPopup(true);

        // Redirect to the correct dashboard based on user type
        setTimeout(() => {
          if (typeOfUser === "admin") {
            navigate("/admin-dashboard"); // Admin dashboard
          } else {
            navigate("/dashboard"); // User dashboard
          }
        }, 2000);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.Content}>
        <div className={styles.backImg}></div>
      </div>
      <div className={styles.LoginForm}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img
              src={assets.logo}
              alt="Kimi Agency Logo"
              className={styles.kimilogo}
            />
          </div>
          <h2 className={styles.title}>Hello!</h2>
          <p className={styles.title}>WELCOME TO KIMI AGENCY</p>
          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="email"
                placeholder="Email ID"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" disabled={isLoading} className={styles.button}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
      {showPopup && <div className={styles.popup}>Login Successful! Redirecting...</div>}
    </div>
  );
};

export default Login;
