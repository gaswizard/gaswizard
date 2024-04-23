import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import { ToastContainer } from "react-toastify";

import { UserManagement } from "./components/UserManagement";

import { TransactionHistory } from "./components/TransactionHistory";
import { useAuth } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  const { login } = useAuth();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      login();
    }
  }, [login]);

  return (
    <>
      {/* <BaseUrl /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={<Dashboard />} />}
          />
          <Route
            path="/user-management"
            element={<ProtectedRoute component={<UserManagement />} />}
          />
          <Route
            path="/transaction-history"
            element={<ProtectedRoute component={<TransactionHistory />} />}
          />
          
        </Routes>
      </Router>
      <ToastContainer
        limit={1}
        autoClose={2000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        theme={"dark"}
      />
    </>
  );
}
export default App;
