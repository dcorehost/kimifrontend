
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import httpServices from "../Services/Httpservices.jsx";
// import Auth from "../Services/Auth.js"; 
// import { assets } from "../../assets/assets.jsx";

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

//       console.log("Login API Response:", response); 


//       if (response.status === 200) {
//         const { token, username, typeOfUser } = response.data || {}; 
//         console.log("Received Token:", token); 

//         console.log("User Type:", typeOfUser); 

//         if (!token || !username) {
//           setError("Invalid response from server. Please try again.");
//           return;
//         }

//         localStorage.setItem("userToken", token);
//         localStorage.setItem("username", username);
//         localStorage.setItem("typeOfUser", typeOfUser);
//         localStorage.setItem("emailId", emailId);
//         localStorage.setItem("contact1", contact1);
          
//         console.log("Stored Token in LocalStorage:", localStorage.getItem("userToken")); 
//         console.log("Stored Email ID in LocalStorage:", localStorage.getItem("emailId")); 
//         console.log("Stored Email ID in LocalStorage:", localStorage.getItem("contact1")); 

//         Auth.login({ token, username, typeOfUser, emailId , contact1 });

//         setShowPopup(true);

//         // Redirect to the correct dashboard based on user type
//         setTimeout(() => {
//           if (typeOfUser === "Admin") {
//             navigate("/admin/dashboard"); 
//           } else {
//             navigate("/dashboard"); 
//           }
//         }, 2000);
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
//               alt="AdMedia Agency Logo"
//               className={styles.kimilogo}
//             />
//           </div>
//           <h2 className={styles.title}>Hello!</h2>
//           <p className={styles.title}>WELCOME TO AdMedia Agency</p>
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
import Auth from "../Services/Auth.js"; 
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

      console.log("Login API Response:", response);

      if (response.status === 200) {
        const { token, username, typeOfUser, contact1 } = response.data || {}; // Extracting contact1
        console.log("Received Token:", token);
        console.log("User Type:", typeOfUser);
        console.log("Contact:", contact1); // Debugging log for contact1

        if (!token || !username) {
          setError("Invalid response from server. Please try again.");
          return;
        }

        localStorage.setItem("userToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("typeOfUser", typeOfUser);
        localStorage.setItem("emailId", emailId);
        
        if (contact1) {
          localStorage.setItem("contact1", contact1);
        }

        console.log("Stored Token in LocalStorage:", localStorage.getItem("userToken"));
        console.log("Stored Email ID in LocalStorage:", localStorage.getItem("emailId"));
        console.log("Stored Contact in LocalStorage:", localStorage.getItem("contact1"));

        Auth.login({ token, username, typeOfUser, emailId, contact1 });

        setShowPopup(true);

        // Redirect to the correct dashboard based on user type
        setTimeout(() => {
          if (typeOfUser === "Admin") {
            navigate("/admin/dashboard"); 
          } else {
            navigate("/dashboard"); 
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
              alt="AdMedia Agency Logo"
              className={styles.kimilogo}
            />
          </div>
          <h2 className={styles.title}>Hello!</h2>
          <p className={styles.title}>WELCOME TO AdMedia Agency</p>
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
