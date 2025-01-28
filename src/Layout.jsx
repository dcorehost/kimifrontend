import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import DashNavbar from "./Components/DashNavbar/DashNavbar";
import Sidebar from "./Components/Sidebar/Sidebar";
import Table from "./Components/Table/Table";
import CreateGoogleAds from "./Components/CreateGoogleAds/CreateGoogleAds";
import GoogleSidebar from "./Components/GoogleSidebar/GoogleSidebar";
import BingSidebar from "./Components/BingSidbar/BingSidebar";
import MetaSidebar from "./Components/MetaSidebar/MetaSidebar";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeSidebar, setActiveSidebar] = useState("default"); // Sidebar state
    const navigate = useNavigate(); // For navigation
    const location = useLocation();

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
        // Default sidebar for unmatched paths
        return <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />;
    };


    // Check if the current path requires the navbar
    const shouldRenderNavbar =
        location.pathname.includes("/google") ||
        location.pathname.includes("/bing") ||
        location.pathname.includes("/facebook");

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
                    marginLeft: shouldRenderNavbar && isSidebarOpen ? "300px" : "10px",
                    transition: "margin-left 0.3s ease",
                    padding: "20px",
                }}
            >
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
