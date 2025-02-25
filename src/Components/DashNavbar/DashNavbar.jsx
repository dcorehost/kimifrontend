import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./DashNavbar.module.css";
import { AiTwotoneDollar } from "react-icons/ai";
import Auth from "../Services/Auth";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

const DashNavbar = ({ isSidebarOpen, toggleSidebar, handleSidebarChange }) => {
  const [userName, setUserName] = useState("Guest");
  const [walletAmount, setWalletAmount] = useState(0);
  const [refresh, setRefresh] = useState(false); // Force UI refresh
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const token = Auth.getToken();
  const user = Auth.getAuthData();

  useEffect(() => {
    const authData = Auth.getAuthData();
    if (authData) {
      setUserName(authData?.username || "Guest");
    } else {
      console.error("Auth data not found or incomplete.");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOut = () => {
    setDropdownOpen(false);
    Auth.logout();
    navigate("/login");
  };

  useEffect(() => {
    async function fetchWalletAmount() {
      try {
        const walletRequest = await axios.get(
          "https://admediaagency.online/kimi/get-wallet-of-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { timestamp: new Date().getTime() }, // Prevents API caching
          }
        );
        const { data } = walletRequest;
        console.log("Wallet API Response:", data); // Debugging
        setWalletAmount(data?.users?.wallet || 0);
        setRefresh((prev) => !prev); // Force UI refresh
      } catch (error) {
        console.error("Error fetching wallet amount:", error);
      }
    }

    // Fetch wallet initially
    fetchWalletAmount();

    // Update wallet every 2 seconds
    const interval = setInterval(fetchWalletAmount, 2000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, [token]);

  return (
    <nav className={`${styles.navbar} ${isSidebarOpen ? styles.open : ""}`}>
      <button
        className={`${styles.toggleButton} ${isSidebarOpen ? styles.rotate : ""}`}
        onClick={toggleSidebar}
      >
        <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      <div className={styles.leftNav}>
        <ul className={styles.navLinks}>
          <li>
            <Link
              to={user?.typeOfUser !== "Admin" ? "/dashboard" : "/admin/dashboard"}
              className={styles.link}
              onClick={() => handleSidebarChange("default")}
            >
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          {user?.typeOfUser !== "Admin" ? (
            <>
              <li>
                <Link
                  to="/google/accountManage/accountList"
                  className={styles.link}
                  onClick={() => handleSidebarChange("/google")}
                >
                  <i className="fab fa-google"></i> Google
                </Link>
              </li>
              <li>
                <Link
                  to="/bing/accountManage/accountList"
                  className={styles.link}
                  onClick={() => handleSidebarChange("/bing")}
                >
                  <i className="fab fa-microsoft"></i> Bing
                </Link>
              </li>
              <li>
                <Link
                  to="/facebook/accountManage/accountList"
                  className={styles.link}
                  onClick={() => handleSidebarChange("/facebook")}
                >
                  <i className="fab fa-facebook"></i> Facebook
                </Link>
              </li>
              <li>
                <Link
                  to="/kimi/wallet/addmoney-table"
                  className={styles.link}
                  onClick={() => handleSidebarChange("")}
                >
                  <i className="fas fa-wallet"></i> Add Money
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>

      <div className={styles.userDropdown} ref={dropdownRef}>
        <Link to="/kimi/wallet/addmoney-table" className={styles.walletLink}>
          <span className={styles.wallet}>
            <AiTwotoneDollar className={styles.walletIcon} /> ${walletAmount.toFixed(2)}
          </span>
        </Link>
        <span className={styles.userName} onClick={() => setDropdownOpen(!dropdownOpen)}>
          {userName} <i className="fas fa-caret-down"></i>
        </span>
        {dropdownOpen && (
          <ul className={styles.dropdown}>
            <li>
              <Link
                to="/dashboard/user-profile"
                className={styles.link}
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className={styles.link}
                onClick={() => setDropdownOpen(false)}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link to="/login" className={styles.link} onClick={() => logOut()}>
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default DashNavbar;
