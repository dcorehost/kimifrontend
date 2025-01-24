




import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import MetaAds from "./Pages/MetaAds/MetaAds";
import BingAds from "./Pages/BingAds/BingAds";
import GoogleAds from "./Pages/GoogleAds/GoogleAds";
import ContactUs from "./Pages/ContactUs/ContactUs";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import TermOfServicesPage from "./Pages/TermOfServicesPage/TermOfServicesPage";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import RefundPolicyPage from "./Pages/RefundPolicyPage/RefundPolicyPage";
import CreateGoogleAds from "./Components/CreateGoogleAds/CreateGoogleAds";
import CreateBingAds from "./Components/CreateBingAds/CreateBingAds";
import AddMoneyTable from "./Components/AddMoneyTable/AddMoneyTable";
import BingAccountList from "./Components/BingAccountList/BingAccountList";
import Table from "./Components/Table/Table";
import MetaAccountList from "./Components/MetaAccountList/MetaAccountList";
import FacebookCreateAd from "./Components/FacebookCreateAd/FacebookCreateAd";
import UserProfile from "./Components/UserFile/UserProfile";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for your pages */}
         <Route path="/" element={<Homepage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/meta-ads" element={<MetaAds />} />
        <Route path="/bing-ads" element={<BingAds />} />
        <Route path="/google-ads" element={<GoogleAds />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/termof-services" element={<TermOfServicesPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-googleads" element={<CreateGoogleAds />} />        
       <Route path="/create-bingads" element={<CreateBingAds/>}></Route>
       <Route path="/bing-accountlist" element={<BingAccountList />}></Route>
       <Route path="/addmoney-table" element={<AddMoneyTable/ >}></Route>
       <Route path="/user-profile" element={<UserProfile />}></Route>  
       <Route path="/google-table" element={<Table />} />     
       <Route path="/meta-accountlist" element={<MetaAccountList />} />     
       <Route path="/facebook-createads" element={<FacebookCreateAd />} />     
      </Routes>
    </Router>
  );
};

export default App;
