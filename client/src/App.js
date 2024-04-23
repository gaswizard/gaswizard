import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { BuyCrypto } from "./components/BuyCrypto/BuyCrypto";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { TermOfUse } from "./components/terms use/TermOfUse";
import { PrivacyPolicy } from "./components/privacyPolicy/PrivacyPolicy";
// import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
// import Login from "./components/admin/Login"
import { useAuth } from "./AuthContext";

import { Buy } from "./components/Buy/Buy";
// import ProtectedRoute from "./ProtectedRoute";
// import Dashboard from "./components/admin/Dashboard";
// import {UserManagement} from "./components/admin/UserManagement"
// import {TransactionHistory} from "./components/admin/TransactionHistory"
function App() {
  const { login } = useAuth();
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      login();
    }
  }, [login]);

  return (
    <div className="App">
      <Router>
        <Routes>
          {" "}
       
          <Route path="/" element={<Home />} />
          
          <Route path="/sign-up" element={<SignUp />} />
       
          <Route path="/buy-crypto" element={<BuyCrypto />} />
          <Route path="/terms-of-use" element={<TermOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/transaction-details" element={<Buy />} />
        </Routes>
        {/* <Routes>
          <Route path="/admin" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute component={<Dashboard />} />}
          />
          <Route
            path="/admin/user-management"
            element={<ProtectedRoute component={<UserManagement />} />}
          />
          <Route
            path="/admin/transaction-history"
            element={<ProtectedRoute component={<TransactionHistory />} />}
          />
          
        </Routes> */}
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
