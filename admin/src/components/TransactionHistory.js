import React, { useState, useEffect, Fragment } from "react";

import ReactDatatable from "@mkikets/react-datatable";
import { useAuth } from "../AuthContext";

import "react-toastify/dist/ReactToastify.css";
import Header from "../widget/Header";
import Navbar from "../widget/Navbar";
import Footer from "../widget/Footer";

import "react-confirm-alert/src/react-confirm-alert.css";

import { getTransaction } from "../services/transaction";

import moment from "moment";

export const TransactionHistory = () => {
  const { basePage } = useAuth();
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
      key: "wallet_address",
      text: "Wallet Address",
      className: "cust_name",
      align: "left",
      sortable: true,
    },

    {
      key: "chain",
      text: "Chain",
      className: "name",
      align: "left",
      sortable: true,
    },
    {
      key: "currency",
      text: "Currency",
      className: "name",
      align: "left",
      sortable: true,
    },
    {
      key: "amount",
      text: "Amount",
      className: "id",
      align: "left",
      sortable: true,
    },
    {
      key: "token_amount",
      text: "Token Amount",
      className: "name",
      align: "left",
      sortable: true,
    },
    {
      key: "trans_id",
      text: "Transaction Id",
      className: "qty",
      align: "left",
      sortable: true,
    },
    {
      key: "status",
      text: "Transaction Status",
      className: "qty",
      align: "left",
      sortable: true,
    },
    {
      key: "created_at",
      text: "Date & Time",
      className: "Date",
      align: "left",
      sortable: true,
      cell: (record) => {
        return <Fragment>{moment(record.created_at).format("LLL")}</Fragment>;
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

  useEffect(() => {
    const getWithdrawalDatas = async () => {
      const config = localStorage.getItem("jwtToken");

      const result = await getTransaction( config);

      if (result?.status) {
        setRecord(result?.data);
      }
    };
    getWithdrawalDatas();
  }, [basePage]);

  const pageChange = (pageData) => {};

  return (
    <div id="layout-wrapper">
      <Header />
      <Navbar />
      <div className="main-content">
        <div className="page-content">
          
            <div className="section-heading d-flex justify-content-between">
              <h2>
                <b>Transaction History</b>
              </h2>
            </div>
            <div className="row">
              <div className="col-xxl-12">
                <div className="product-list-outer">
                  <ReactDatatable
                    config={config}
                    records={record}
                    columns={columns}
                    onPageChange={pageChange}
                  />
                </div>
              </div>
            </div>
          
        </div>
        <Footer />
      </div>
    </div>
  );
};
