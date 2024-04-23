import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import { useAuth } from "../AuthContext";

function Header() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const logouts = () => {
    logout();
    navigate("/");
  };
  const logoutHandler = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to logout?",
      buttons: [
        {
          label: "Yes",
          onClick: () => logouts(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex tab_button">
            
          </div>
          <div className="d-flex align-items-center">
            <div className="dropdown d-md-none topbar-head-dropdown header-item">
              <button
                type="button"
                className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle shadow-none"
                id="page-header-search-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bx bx-search fs-22" />
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <button className="btn btn-primary" type="submit">
                        <i className="mdi mdi-magnify" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="dropdown ms-1 topbar-head-dropdown header-item">
              <div className="dropdown-menu dropdown-menu-end"></div>
            </div>
            <div className="dropdown ms-sm-3 header-item topbar-user">
              <button
                type="button"
                className="btn shadow-none p-0"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  <img
                    className="rounded-circle header-profile-user"
                    src="../../assets/images/users/avatar-1.jpg"
                    alt="Header Avatar"
                  />
                  <span className="text-start ms-xl-2">
                    <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text"></span>
                  </span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={(e) => logoutHandler(e)}
                >
                  <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />
                  <span className="align-middle" data-key="t-logout">
                    Logout
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
