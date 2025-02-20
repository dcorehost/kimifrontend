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
import WalletFlowTable from "./Components/WalletFlowTable/WalletFlowTable";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import ApprovGoogleAd from "./Components/ApprovGoogleAd/ApprovGoogleAd";
import ApprovBingAd from "./Components/ApprovBingkAd/ApprovBingAd";
import ApprovFacebookAd from "./Components/ApprovFacebookAd/ApprovFacebookAd";
import PendingRefund from "./Components/PendingRefund/PendingRefund";
import ApprovedRefund from "./Components/ApprovedRefund/ApprovedRefund";
import RedirectToDashboard from "./RedirectToDashboard";
import ApprovedGoogleAds from "./Components/ApprovedGoogleAds/ApprovedGoogleAds";
import ApprovedFacebookAds from "./Components/ApprovedFacebookAds/ApprovedFacebookAds";
import ChangeNetwork from "./Components/ChangeNetwork/ChangeNetwork";
import ApprovedBingAds from "./Components/ApprovedBingAds/ApprovedBingAds";
import PendingTransation from "./Components/PendingTransations/PendingTransations";
import ApprovedTransations from "./Components/ApprovedTransations/ApprovedTransations";
import PendingAdsBingDeposite from "./Components/PendingAdsBingDeposite/PendingAdsBingDeposite";
import PendingAdsGoogleDeposite from "./Components/PendingAdsGoogleDeposite/PendingAdsGoogleDeposite";
import PendingAdsFacebookDeposite from "./Components/PendingAdsFacebookDeposite/PendingAdsFacebookDeposite";
import CompletedBingAdDeposite from "./Components/CompletedBingAdDeposite/CompletedBingAdDeposite";
import CompletedFacebookAdDeposite from "./Components/CompletedFacebookAdDeposite/CompletedFacebookAdDeposite";
import CompleteGoogleAdDeposite from "./Components/CompleteGoogleAdDeposite/CompleteGoogleAdDeposite";
import BmShareLog from "./Components/BmShareLog/BmShareLog";
import UserAdsPage from "./Components/UserAdsPage/UserAdsPage";
import ActiveUser from "./Components/ActiveUser/ActiveUser";





const App = () => {


  return (
    <Router>
      <Routes>
        {/*  routes for  pages */}
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route index element={<RedirectToDashboard />} />
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
            <Route path="/google/accountManage/accountList" element={<Table />} />
            <Route path="/google/accountManage/accountList/creategoogleads" element={<CreateGoogleAds />} />
            <Route path="/google/accountManage/applyAd" element={<ApplyGoogleAdsTable />} />
            <Route path="/google/accountManage/bmShareLog" element={<GmailShareLogTable />} />
            <Route path="/google/finance/googleads-depositerecord" element={<AdsDepositeRecordTable />} />
            <Route path="/google/finance/googleads-deposite" element={<GoogleAdsDeposite />} />
            <Route path="/google/aftersale/refund" element={<GoogleRefund />} />
            <Route path="/google/add-money" element={<AddMoneyTable />} />

            {/* //bing items  */}
            <Route path="/bing/accountManage/accountList" element={<BingAccountList />}></Route>
            <Route path="/bing/accountManage/accountList/createbingads" element={<CreateBingAds />} />
            <Route path="/bing/accountManage/applybingad" element={<ApplyBingAd />} />
            <Route path="/bing/finance/bingadsdeposite" element={<BingAdsDeposit />} />
            <Route path="/bing/finance/bingadsdepositrecode" element={<BingAdsDepositRecord />} />
            <Route path="/bing/aftersale/bingrefund" element={<BingRefund />} />
            <Route path="/bing/add-money" element={<AddMoneyTable />} />



            {/* //facebook items  */}
            <Route path="/facebook/accountManage/createaccount" element={<FacebookCreateAd />} />
            <Route path="/facebook/accountManage/applynewad" element={<MetaApplyNewAd />} />
            <Route path="/facebook/finance/metaadsdeposit" element={<MetaAdsDeposit />} />
            <Route path="/facebook/finance/metaadsdepositrecord" element={<MetaAdsDepositRecord />} />
            <Route path="/facebook/aftersale/refund" element={<MetaRefund />} />
            <Route path="/facebook/accountManage/accountlist" element={<MetaAccountList />} />
            <Route path="/facebook/add-money" element={<AddMoneyTable />} />
            <Route path="/facebook/accountManage/bmShareLog" element={<BmShareLog/ >}></Route>



            {/* //kimi sidebar */}
            <Route path="/kimi/wallet/addmoney-table" element={<AddMoneyTable />}></Route>
            <Route path="/kimi/wallet/paylink" element={<PayLink />}></Route>
            <Route path="/kimi/2fatool" element={<SecurityCodeGenerator />}></Route>


            {/* //user profile */}
            <Route path="/dashboard/user-profile" element={<UserProfile />}></Route>
            <Route path="/dashboard/settings" element={<UserSettings />} />          

         
          </Route>


          {/* Admin  routes  only*/}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<div>Admin Panel</div>} />
            {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/adapproval/gapprove" element={<ApprovGoogleAd />} />
            <Route path="/admin/adapproval/bapprove" element={<ApprovBingAd />} />
            <Route path="/admin/adapproval/fapprove" element={<ApprovFacebookAd />} />
            <Route path="/admin/refund/pendingrefund" element={<PendingRefund />} />
            <Route path="/admin/refund/approverefund" element={<ApprovedRefund />} />
            <Route path="/admin/approvedads/g-oogle" element={<ApprovedGoogleAds />} />
            <Route path="/admin/approveds/b-ing" element={<ApprovedBingAds />} />
            <Route path="/admin/approvedads/f-acebook" element={<ApprovedFacebookAds />} />
            <Route path="/admin/accountmanage/changenetwork" element={<ChangeNetwork />} />
            <Route path="/admin/transactions/pending" element={<PendingTransation />} />
            <Route path="/admin/transactions/approved" element={<ApprovedTransations />} />
            <Route path="/admin/AdsDeposite/PendingAdsBingDeposite" element={<PendingAdsBingDeposite/>}></Route>
            <Route path="/admin/AdsDeposite/PendingAdsGoogleDeposite" element={<PendingAdsGoogleDeposite/>}></Route>
            <Route path="/admin/AdsDeposite/PendingAdsFacebookDeposite" element={<PendingAdsFacebookDeposite/>}></Route>
            <Route path="/admin/AdsDeposite/CompleteAdsBingDeposite"  element={<CompletedBingAdDeposite/>}></Route>
            <Route path="/admin/AdsDeposite/CompleteAdsFacebookDeposite" element={<CompletedFacebookAdDeposite />}></Route>
            <Route path="//admin/AdsDeposite/CompleteAdsGoogleDeposite" element={<CompleteGoogleAdDeposite />}></Route>
            <Route path="/admin/dashboard/UserAdsInformation" element={<UserAdsPage/>}></Route>
            <Route path="/admin/dashboard/activeuser" element={<ActiveUser />}></Route>


          </Route>

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
