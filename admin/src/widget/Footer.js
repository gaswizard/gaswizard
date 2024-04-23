import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <p className="m-0 ">
              {new Date().getFullYear()} © Technoloader.
            </p>
          </div>
          <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              <p className="m-0 ">
              Design & Developed by Technoloader it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
