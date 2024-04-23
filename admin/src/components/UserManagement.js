import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import Header from "../widget/Header";
import Navbar from "../widget/Navbar";
import Footer from "../widget/Footer";

import ReactDatatable from "@mkikets/react-datatable";
import { ToastContainer } from "react-toastify";


import { userData } from "../services/dashboard";
import moment from "moment";
export const UserManagement = () => {
  const [record, setRecord] = useState([]);

  const columns = [
    {
      key: "Sr No.",
      text: "Sr. No.",
      className: "sr_no.",
      align: "left",
      sortable: true,
      cell: (row, index) => index + 1,
    },
    {
      key: "name",
      text: "Name",
      className: "sr_no.",
      align: "left",
      sortable: true,
    },
    {
      key: "email",
      text: "Email",
      className: "sr_no.",
      align: "left",
      sortable: true,
    },
    {
      key: "mobile_number",
      text: "Mobile Number",
      className: "sr_no.",
      align: "left",
      sortable: true,
    },

    {
      key: "wallet_address",
      text: "Wallet Address",
      className: "cust_name",
      align: "left",
      sortable: true,
    },

    {
      key: "registerDate",
      text: "Register Date",
      className: "color",
      align: "left",
      sortable: true,
      cell: (record) => {
        return <>{moment(record.created_at).format("LLL")}</>;
      },
    },
  ];
  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    filename: "Download",
    no_data_text: "No user found!",
    button: {
      // print: true,
      // csv: true,
    },
    language: {
      // length_menu: "Show MENU result per page",
      filter: "Search in records...",
      // info: "Showing START to END of TOTAL records",
      pagination: {
        first: "First",
        previous: "Previous",
        next: "Next",
        last: "Last",
      },
    },
    show_length_menu: true,
    show_filter: true,
    show_pagination: true,
    show_info: true,
  };
  const pageChange = (pageData) => {};

  const userDatas = async () => {
    let config = localStorage.getItem("jwtToken");

    const resp = await userData(config);

    if (resp.status) {
      setRecord(resp?.data);
    }
  };
  useEffect(() => {
    userDatas();
  }, []);

  return (
    <div id="layout-wrapper">
      <Header />
      <Navbar />
      <div className="main-content">
        <div className="page-content">
          
            <div className="section-heading d-flex justify-content-between">
              <h2>
                <b>User List</b>
              </h2>
            </div>
           
               
                <div className="product-list-outer">
                  <ReactDatatable
                    config={config}
                    records={record}
                    columns={columns}
                    onPageChange={pageChange}
                  />
                </div>
             
            
          
        </div>
        <Footer />
        <ToastContainer
          limit={1}
          autoClose={3000}
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          theme={"dark"}
        />
      </div>
    </div>
  );
};
