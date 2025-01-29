
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
import GoogleAdsDeposite from "./Components/GoogleAdsDeposite/GoogleAdsDeposite";
import ApplyGoogleAdsTable from "./Components/ApplyGoogleAdsTable/ApplyGoogleAdsTable";
import GmailShareLogTable from "./Components/GmailShareLogTable/GmailShareLogTable";
import AdsDepositeRecordTable from "./Components/AdsDepositeRecordTable/AdsDepositerecordTable";
import RefundTable from "./Components/RefundTable/RefundTable";
import Layout from "./Layout";
import GoogleRefund from "./Components/GoogleRefund/GoogleRefund";




const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for your pages */}
        <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/meta-ads" element={<MetaAds />} />
        <Route path="/bing-ads" element={<BingAds />} />
        <Route path="/google-ads" element={<GoogleAds />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/termof-services" element={<TermOfServicesPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />



                     {/* //route path for dashboard */}

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/google/accountManage/accountList/creategoogleads" element={<CreateGoogleAds />} />
        <Route path="/bing/accountManage/accountList" element={<CreateBingAds />} />
        <Route path="/facebook/accountManage/accountList" element={<FacebookCreateAd />} />
        <Route path="/bing-accountlist" element={<BingAccountList />}></Route>
        <Route path="/addmoney-table" element={<AddMoneyTable />}></Route>
        <Route path="/user-profile" element={<UserProfile />}></Route>
        <Route path="/google/accountManage/accountList" element={<Table />} />
        <Route path="/meta-accountlist" element={<MetaAccountList />} />
        <Route path="/facebook-createads" element={<FacebookCreateAd />} />
        <Route path="/google/accountManage/applyAd" element={<ApplyGoogleAdsTable />} />
        <Route path="/google/accountManage/bmShareLog" element={<GmailShareLogTable />} />
        <Route path="/google/finance/googleads-deposite" element={<GoogleAdsDeposite />} />
        <Route path="/google/finance/googleads-depositerecord" element={<AdsDepositeRecordTable />} />
        <Route path="/refund-table" element={<RefundTable />} />
        <Route path="/google/aftersale/refund" element={<GoogleRefund />} />

        {/* <Route path="/googleadsdeposite" element={<GoogleAdsDeposite></GoogleAdsDeposite>}></Route> */}
      </Route>
      </Routes>
    </Router>
  );
};

export default App;
