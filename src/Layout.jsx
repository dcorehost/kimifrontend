import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import DashNavbar from "./Components/DashNavbar/DashNavbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Table from "./Components/Table/Table";
import CreateGoogleAds from "./Components/CreateGoogleAds/CreateGoogleAds";
import GoogleSidebar from "./Components/GoogleSidebar/GoogleSidebar";
import BingSidebar from "./Components/BingSidbar/BingSidebar";
import MetaSidebar from "./Components/MetaSidebar/MetaSidebar";
import Auth from "./Components/Services/Auth";
import AdminSidebar from "./Components/AdminSidebar/AdminSidebar";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeSidebar, setActiveSidebar] = useState("default"); // Sidebar state
    const navigate = useNavigate(); // For navigation
    const location = useLocation();

    const user = Auth.getAuthData(); // Get authentication data
    const isAuthenticated = !!user?.token; // Check if the user is logged in

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSidebarChange = (type) => {
        setActiveSidebar(type); // Update the active sidebar type
        setIsSidebarOpen(true); // Ensure the sidebar opens when switching
        if (type === "default") {
            navigate("/"); // Navigate to the home route
        }
    };

    useEffect(() => {
        if (Auth.isAuthenticated()) {
            // navigate("/dashboard"); // Redirect to dashboard globally
        }
    }, []);


    // Function to render the correct sidebar based on the route
    const renderSidebar = () => {
        const path = location.pathname;
        // Check if the path contains specific substrings
        if (path.includes("/google")) {
            return <GoogleSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
        } else if (path.includes("/bing")) {
            return <BingSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
        } else if (path.includes("/facebook")) {
            return <MetaSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
        }
        //for kimi sidebar
        else if (path.includes("/kimi")) {
            return <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
        }
        else if (path.includes("/admin")) {
            return <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
        }
        // Default sidebar for unmatched paths
        return <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
    };


    // Check if the current path requires the navbar
    const shouldRenderNavbar = isAuthenticated && (
        location.pathname.includes("/google") ||
        location.pathname.includes("/bing") ||
        location.pathname.includes("/facebook") ||
        location.pathname.includes("/kimi") ||
        location.pathname.includes("/dashboard") ||
        location.pathname.includes("/admin")
    )






    return (
        // <div style={{ display: "flex" }}>
        //   {/* Sidebar */}
        //   <div style={{ width: "240px", background: "#f4f4f4" }}>
        //     {renderSidebar()}
        //   </div>

        //   {/* Main Content */}
        //   <div style={{ flex: 1, padding: "20px" }}>
        //     <Outlet />
        //   </div>
        // </div>
        <>
            {/* Navbar */}
            {/* Conditionally Render Navbar */}
            {shouldRenderNavbar && (
                <DashNavbar
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    handleSidebarChange={handleSidebarChange}
                />
            )}

            {/* Render Sidebar */}
            {
                shouldRenderNavbar &&
                renderSidebar()}

            {/* Main Content */}
            <div
                style={{
                    marginLeft: shouldRenderNavbar && isSidebarOpen ? "300px" : "0px",
                    transition: "margin-left 0.3s ease",
                    // padding: "20px",
                }}
            >
                <Outlet />
            </div>
        </>    
    );
};

export default Layout;





