import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import Layout from "./Layout";
import GoogleRefund from "./Components/GoogleRefund/GoogleRefund";
import BingAdsDeposit from "./Components/BingAdsDeposit/BingAdsDeposit";
import BingAdsDepositRecord from "./Components/BingAdsDepositRecord/BingAdsDepositRecord";
import BingRefund from "./Components/BingRefund/BingRefund";
import ApplyBingAd from "./Components/ApplyBingAd/ApplyBingAd";
import MetaApplyNewAd from "./Components/MetaApplyNewAd/MetaApplyNewAd";
import MetaAdsDeposit from "./Components/MetaAdsDeposit/MetaAdsDeposit";
import MetaAdsDepositRecord from "./Components/MetaAdsDepositRecord/MetaAdsDepositeRecord";
import MetaRefund from "./Components/MetaRefund/MetaRefund";
import UserSettings from "./Components/UserFile/settings/UserSettings";
import Auth from "./Components/Services/Auth";
import ProtectedRoute from "./ProtectedRoute";
import PayLink from "./Components/PayLink/PayLink";
import SecurityCodeGenerator from "./Components/SecurityCodeGenerator/SecurityCodeGenerator";




const App = () => {


  return (
    <Router>
      <Routes>
        {/* Define routes for your pages */}
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route index element={<Homepage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/meta-ads" element={<MetaAds />} />
          <Route path="/bing-ads" element={<BingAds />} />
          <Route path="/google-ads" element={<GoogleAds />} />
          <Route path="/termof-services" element={<TermOfServicesPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />



          {/* Protected Routes for Authenticated Users */}
          <Route element={<ProtectedRoute />}>
            {/* //route path for dashboard */}

            <Route path="/dashboard" element={<Dashboard />} />

            {/* //google items  */}
            <Route path="/google/accountManage/accountList/creategoogleads" element={<CreateGoogleAds />} />
            <Route path="/google/accountManage/applyAd" element={<ApplyGoogleAdsTable />} />
            <Route path="/google/aftersale/refund" element={<GoogleRefund />} />
            <Route path="/google/finance/googleads-depositerecord" element={<AdsDepositeRecordTable />} />
            <Route path="/google/accountManage/bmShareLog" element={<GmailShareLogTable />} />
            <Route path="/google/finance/googleads-deposite" element={<GoogleAdsDeposite />} />
            <Route path="/google/accountManage/accountList" element={<Table />} />

            {/* //bing items  */}
            <Route path="/bing/accountManage/accountList" element={<BingAccountList />}></Route>
            <Route path="/bing/accountManage/accountList/createbingads" element={<CreateBingAds />} />
            <Route path="/bing/finance/bingadsdeposite" element={<BingAdsDeposit />} />
            <Route path="/bing/finance/bingadsdepositrecode" element={<BingAdsDepositRecord />} />
            <Route path="/bing/aftersale/bingrefund" element={<BingRefund />} />
            <Route path="/bing/accountManage/applybingad" element={<ApplyBingAd />} />


            {/* //facebook items  */}
            <Route path="/facebook/accountManage/createaccount" element={<FacebookCreateAd />} />
            <Route path="/facebook/accountManage/applynewad" element={<MetaApplyNewAd />} />
            <Route path="/facebook/finance/metaadsdeposit" element={<MetaAdsDeposit />} />
            <Route path="/facebook/finance/metaadsdepositrecord" element={<MetaAdsDepositRecord />} />
            <Route path="/facebook/aftersale/refund" element={<MetaRefund />} />
            <Route path="/facebook/accountManage/accountlist" element={<MetaAccountList />} />


            {/* //kimi sidebar */}
            <Route path="/kimi/wallet/addmoney-table" element={<AddMoneyTable />}></Route>
            <Route path="/kimi/wallet/paylink" element={<PayLink />}></Route>

            {/* //user profile */}
            <Route path="/dashboard/user-profile" element={<UserProfile />}></Route>
            <Route path="/dashboard/settings" element={<UserSettings />} />

            {/* <Route path="/googleadsdeposite" element={<GoogleAdsDeposite></GoogleAdsDeposite>}></Route> */}

            <Route path="/security" element={<SecurityCodeGenerator></SecurityCodeGenerator>}></Route>
          </Route>

          


        </Route>
      </Routes>
    </Router>
  );
};

export default App;
