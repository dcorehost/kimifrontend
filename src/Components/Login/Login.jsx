


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import { assets } from "../../assets/assets.jsx";
// import httpServices from "../Services/Httpservices.jsx";
// import Auth from "../Services/Auth.js";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false); // State for popup visibility
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       console.log("Sending login request..."); // Debug log
//       const response = await httpServices.post(
//         "http://13.127.161.242:8001/kimi/login-account",
//         { username, password }
//       );

//       if (response.status === 200) {
//         const { token, user } = response.data;

//         // Store token and user data using Auth module
//         Auth.login({ token, user });

//         // Show the popup
//         setShowPopup(true);

//         // Navigate to the dashboard after a short delay
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 2000); // Popup displays for 2 seconds before redirecting
//       } else {
//         setError("Login failed. Please check your username and password.");
//       }
//     } catch (err) {
//       console.error("Login request failed:", err); // Log the error
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
//               <label htmlFor="username"></label>
//               <input
//                 type="text"
//                 id="username"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className={styles.input}
//                 required
//               />
//             </div>
//             <div className={styles.inputGroup}>
//               <label htmlFor="password"></label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={styles.input}
//                 required
//               />
//             </div>
            // <div
            //   className={styles.inputGroup}
            //   style={{ display: "flex", alignItems: "center" }}
            // >
            //   <input
            //     type="checkbox"
            //     id="rememberMe"
            //     className={styles.checkbox}
            //   />
            //   <label htmlFor="rememberMe" style={{ marginLeft: "10px" }}>
            //     Remember Me
            //   </label>
            // </div>
//             {error && <p className={styles.error}>{error}</p>}
//             <button
//               type="submit"
//               className={styles.button}
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
            // <div className={styles.issue}>
            //   Login issues?{" "}
            //   <a href="/support" className={styles.link}>
            //     Contact Support
            //   </a>
            // </div>
//           </form>
//         </div>
//       </div>

//       {/* Popup component */}
//       {showPopup && (
//         <div className={styles.popup}>
//           <p>Login Successful! Redirecting to the dashboard....</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;











import React, { useState } from "react";
import { assets } from "../../assets/assets.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import httpServices from "../Services/Httpservices.jsx";
import Auth from "../Services/Auth.js";

const Login = () => {
  const [username, setUsername] = useState("");
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
        "http://13.127.161.242:8001/kimi/login-account",
        { username, password }
      );

      if (response.status === 200) {
        const { token, username, wallet } = response.data;

        // Store in Auth
        Auth.login({ token, username, wallet });

        setShowPopup(true);

        // Redirect after showing popup
        setTimeout(() => navigate("/dashboard"), 2000);
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




      



      {/* Form UI */}

      <form onSubmit={handleLogin} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
         className={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <div
              className={styles.inputGroup}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="checkbox"
                id="rememberMe"
                className={styles.checkbox}
              />
              <label htmlFor="rememberMe" style={{ marginLeft: "10px" }}>
                Remember Me
              </label>
            </div>

        {error && <p>{error}</p>}
        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className={styles.issue}>
              Login issues?{" "}
              <a href="/support" className={styles.link}>
                Contact Support
              </a>
            </div>
      </form>
      </div>
      </div>

      {/* Popup */}
      {showPopup && <div>Login Successful! Redirecting...</div>}
    </div>
  );
};

export default Login;


// //latest updated code 
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import { assets } from "../../assets/assets.jsx";
// import httpServices from "../Services/Httpservices.jsx";
// import Auth from "../Services/Auth.js";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false); // New state for popup visibility
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       console.log('Sending login request...'); // Debug log

//       const response = await httpServices.post("http://13.127.161.242:8001/kimi/login-account", {
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         const { token, user } = response.data;

//         // Store the token and user data using the Auth module
//         Auth.login({ token, user });

//         // Show the popup
//         setShowPopup(true);

//         // Navigate to the dashboard after a short delay to allow the popup to be visible
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 2000); // Popup shows for 2 seconds before navigating
//       } else {
//         setError("Login failed. Please check your username and password.");
//       }
//     } catch (err) {
//       console.error('Login request failed:', err); // Log full error
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
//           <p className={styles.title}>WELCOME KIMI AGENCY</p>
//           <form onSubmit={handleLogin} className={styles.form}>
//             <div className={styles.inputGroup}>
//               <label htmlFor="username"></label>
//               <input
//                 type="text"
//                 id="username"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className={styles.input}
//                 required
//               />
//             </div>
//             <div className={styles.inputGroup}>
//               <label htmlFor="password"></label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={styles.input}
//                 required
//               />
//             </div>
//             <div
//               className={styles.inputGroup}
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 className={styles.checkbox}
//               />
//               <label htmlFor="rememberMe" style={{ marginLeft: "10px" }}>
//                 Remember Me
//               </label>
//             </div>
//             {error && <p className={styles.error}>{error}</p>}
//             <button
//               type="submit"
//               className={styles.button}
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//             <div className={styles.issue}>
//               Login issues?{" "}
//               <a href="/support" className={styles.link}>
//                 Contact Support
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Popup component */}
//       {showPopup && (
//         <div className={styles.popup}>
//           <p>Login Successful! Redirecting to the dashboard....</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;
















//  //first correct code 
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import { assets } from "../../assets/assets.jsx";
// import httpServices from "../Services/Httpservices.jsx";
// import Auth from "../Services/Auth.js";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       console.log('Sending login request...'); // Debug log

//       const response = await httpServices.post("http://13.127.161.242:8001/kimi/login-account", {
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         const { token, user } = response.data;

//         // Store the token and user data using the Auth module
//         Auth.login({ token, user });

//         // Navigate to the dashboard
//         navigate("/dashboard");
//       } else {
//         setError("Login failed. Please check your username and password.");
//       }
//     } catch (err) {
//       console.error('Login request failed:', err); // Log full error
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
//           <p className={styles.title}>WELCOME KIMI AGENCY</p>
//           <form onSubmit={handleLogin} className={styles.form}>
//             <div className={styles.inputGroup}>
//               <label htmlFor="username"></label>
//               <input
//                 type="text"
//                 id="username"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className={styles.input}
//                 required
//               />
//             </div>
//             <div className={styles.inputGroup}>
//               <label htmlFor="password"></label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={styles.input}
//                 required
//               />
//             </div>
//             <div
//               className={styles.inputGroup}
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 className={styles.checkbox}
//               />
//               <label htmlFor="rememberMe" style={{ marginLeft: "10px" }}>
//                 Remember Me
//               </label>
//             </div>
//             {error && <p className={styles.error}>{error}</p>}
//             <button
//               type="submit"
//               className={styles.button}
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//             <div className={styles.issue}>
//               Login issues?{" "}
//               <a href="/support" className={styles.link}>
//                 Contact Support
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


//  //second correct code
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import { assets } from "../../assets/assets.jsx";
// import httpServices from "../Services/Httpservices.jsx";
// import Auth from "../Services/Auth.js";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false); // State for popup
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     try {
//       console.log('Sending login request...'); // Debug log

//       const response = await httpServices.post("http://13.127.161.242:8001/kimi/login-account", {
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         const { token, user } = response.data;

//         // Store the token and user data using the Auth module
//         Auth.login({ token, user });

//         // Show success popup
//         setIsSuccessPopupVisible(true);

//         // Close the popup after 2 seconds and navigate to the dashboard
//         setTimeout(() => {
//           setIsSuccessPopupVisible(false);
//           navigate("/dashboard");
//         }, 2000);
//       } else {
//         setError("Login failed. Please check your username and password.");
//       }
//     } catch (err) {
//       console.error('Login request failed:', err); // Log full error
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
//           <p className={styles.title}>WELCOME KIMI AGENCY</p>
//           <form onSubmit={handleLogin} className={styles.form}>
//             <div className={styles.inputGroup}>
//               <label htmlFor="username"></label>
//               <input
//                 type="text"
//                 id="username"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className={styles.input}
//                 required
//               />
//             </div>
//             <div className={styles.inputGroup}>
//               <label htmlFor="password"></label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={styles.input}
//                 required
//               />
//             </div>
//             <div
//               className={styles.inputGroup}
//               style={{ display: "flex", alignItems: "center" }}
//             >
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 className={styles.checkbox}
//               />
//               <label htmlFor="rememberMe" style={{ marginLeft: "10px" }}>
//                 Remember Me
//               </label>
//             </div>
//             {error && <p className={styles.error}>{error}</p>}
//             <button
//               type="submit"
//               className={styles.button}
//               disabled={isLoading}
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//             <div className={styles.issue}>
//               Login issues?{" "}
//               <a href="/support" className={styles.link}>
//                 Contact Support
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Success Popup */}
//       {isSuccessPopupVisible && (
//         <div className={styles.popup}>
//           <div className={styles.popupContent}>
//             <p>Login Successful!</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;







