import React, { useEffect } from "react";
import { Link } from "react-router-dom";


function Sidebar() {
  useEffect(() => {

  }, []);


  return (
    <div id="scrollbar">
      <div className="simplebar-content" style={{ padding: "0px" }}>
        <div className="container-fluid p-0">
          <ul className="navbar-nav" id="navbar-nav">
       
            <li className="nav-item">
              <Link
                to={"/dashboard"}
                className={
                  window.location.pathname === "/dashboard"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="mdi mdi-speedometer" />
                <span data-key="t-dashboards">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/user-management"}
                className={
                  window.location.pathname === "/user-management"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="las la-users"></i>
                <span data-key="t-dashboards">User-Management</span>
              </Link>
            </li>
        
            <li className="nav-item">
              <Link
                to={"/transaction-history"}
                className={
                  window.location.pathname === "/transaction-history"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="mdi mdi-history" />
                <span data-key="t-dashboards">Transaction History</span>
              </Link>
            </li>
         
            
         
          
            {/* <li className="nav-item">
              <Link
                to={"/support-management"}
                className={
                  window.location.pathname === "/support-management"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="mdi mdi-speedometer" />
                <span data-key="t-dashboards">Support-Management</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
