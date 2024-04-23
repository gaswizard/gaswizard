import { useState, useEffect, useRef } from "react";
import { Navbar } from "../widgets/Navbar";

import { useLocation } from "react-router-dom";
import moment from "moment";

import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  createWeb3Modal,
  defaultConfig,
} from "@web3modal/ethers/react" ;
import {
  parseUnits,
  formatEther,
  BrowserProvider,
  Contract,
  JsonRpcProvider,
  formatUnits,
  parseEther,
} from "ethers";

import $ from "jquery" ;

import { Footer } from "../widgets/Footer" ;
import { getTransaction } from "../services/transaction";
export const Buy = () => {
  const projectId = "000a1b24652483ad57b194801f5591ac";
  const { address, chainId, isConnected } = useWeb3ModalAccount() ;
  const { walletProvider } = useWeb3ModalProvider();

  const [record, setRecord] = useState([]) ;

  const [totalUsdt, setTotalUsdt] = useState();
  const [totalToken, setTotalToken] = useState() ;
  const [currentPage, setCurrentPage] = useState(1) ;

  const mainnet = [
    {
      chainId: 97,
      name: "Binance Smart Chain",
      currency: "tBNB",
      explorerUrl: "https://testnet.bscscan.com",
      rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    },
    {
      chainId: 11155111,
      name: "Ethereum Testnet",
      currency: "ETH",
      explorerUrl: "https://testnet.etherscan.io",
      rpcUrl:
        "https://eth-sepolia.g.alchemy.com/v2/YGEEV9ZGfLjKyyzpeylflyqDg3oR8oSl",
    },
  ];

  const metadata = {
    name: "gaswizard",
    description: "gaswizard",
    url: "https://test.ukccoin.io/",
    icons: ["https://test.ukccoin.io/html/images/UKC_Logo.svg"],
  };

  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: mainnet,
    projectId,
    enableAnalytics: true,
  });


  useEffect(() => {
    trnsactionGet();
  }, [address]);

  const trnsactionGet = async () => {
    if (address) {
      const resp = await getTransaction({ address });

      if (resp.status) {
        setRecord(resp.data);
        setTotalUsdt(resp?.amount);
        setTotalToken(resp?.tokenAmt);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const localAddress = localStorage.getItem("address");

      if (isConnected && localAddress !== address) {
        localStorage.setItem("address", address);

        window.location.reload();
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isConnected, address]);

  const homeRef = useRef(null);
  const tokenomicsRef = useRef(null);
  const faqRef = useRef(null);
  const roadmapRef = useRef(null);
  const aboutUsRef = useRef(null);
  const buynowRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash && homeRef.current) {
      const targetRef =
        location.hash === "#about-us"
          ? aboutUsRef
          : location.hash === "#tokenomics"
          ? tokenomicsRef
          : location.hash === "#faq"
          ? faqRef
          : location.hash === "#roadmap"
          ? roadmapRef
          : location.hash === "#buy-now"
          ? buynowRef
          : null;

      if (targetRef) {
        targetRef.current.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }
  }, [location.hash]);

  const scrollToHome = () => {
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: "smooth" });
    }
    $(document).ready(function () {
      $("#toggler1").toggleClass("collapsed");
    });
  };
  const scrollToAbout = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    $(document).ready(function () {
      $("#toggler1").toggleClass("collapsed");
    });
  };
  const scrollToTokenomics = () => {
    if (tokenomicsRef.current) {
      tokenomicsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    $(document).ready(function () {
      $("#toggler1").toggleClass("collapsed");
    });
  };
  const scrollToFaq = () => {
    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth" });
    }
    $(document).ready(function () {
      $("#toggler1").toggleClass("collapsed");
    });
  };
  const scrollToRoadmap = () => {
    if (roadmapRef.current) {
      roadmapRef.current.scrollIntoView({ behavior: "smooth" });
    }
    $(document).ready(function () {
      $("#toggler1").toggleClass("collapsed");
    });
  };
  const scrollTobuynow = () => {
    if (buynowRef.current) {
      buynowRef.current.scrollIntoView({ behavior: "smooth" });
    }
    $(document).ready(function () {
      $("#toggler1").toggleClass("collapsed");
    });
  };

  // ============== pagination===================///
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = record.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // ===================pagination=================//

  return (
    <>
      <div>
        <div className="overflow-hidden">
          <Navbar
            scrollToHome={scrollToHome}
            scrollToAbout={scrollToAbout}
            scrollToTokenomics={scrollToTokenomics}
            scrollToFaq={scrollToFaq}
            scrollToRoadmap={scrollToRoadmap}
            scrollTobuynow={scrollTobuynow}
          />

          <div id="scroll-to-top">
            <i className="bi bi-chevron-up fa-fw" />
          </div>

          <section className="crypto_page_bg ">
            <section className="ex_box p70 pn_page_pt ">
              <div className="container  position-relative">
                <h2 className="hadding text-center">
                  Transaction <span className="t_gr">Details</span>
                </h2>
                <div className="row text-center">
                  <div class="col-md-6 mt-3">
                    <div class="box p-md-4">
                      <h5 className="mb-0">
                        Total Amount Purchased: {totalUsdt ? totalUsdt : "0"} USD
                      </h5>
                    </div>
                  </div>
                  <div class="col-md-6 mt-3">
                    <div class="box p-md-4">
                      <h5 className="mb-0">
                        Total GWIZ Tokens: {totalToken ? totalToken : 0} 
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="row mt-md-4">
                  <div class="col-md-12 mt-3">
                    <div class="UKC-middle-box box" id="buy-div">
                      <div class="select-currency-wrapper">
                        <div
                          class="wallet-code-disconnects mb-1 text-right"
                          id="conn-status"
                        ></div>
                        <div class="currency-select-wrap mb-1 table_scrool">
                          <div class="table-responsive">
                            <table
                              class="table table-striped "
                              style={{ color: "#fff" }}
                            >
                              <thead>
                                <tr>
                                  <th>Sr No.</th>
                                  <th>Chain</th>
                                  <th>Currency</th>
                                  <th>Amount</th>
                                  <th>Token Amount</th>
                                  <th>Status</th>
                                  <th>Date Time</th>
                                </tr>
                              </thead>
                              <tbody id="table_body">
                                {currentItems &&
                                  currentItems.map((rowData, index) => {
                                    const date = moment(
                                      rowData.created_at
                                    ).format("DD/MM/YYYY hh:mm A");

                                    return (
                                      <>
                                        <tr>
                                          <td>{index + 1}</td>
                                          <td>{rowData.chain}</td>
                                          <td>{rowData.currency}</td>
                                          <td>{rowData.amount}</td>
                                          <td>{rowData.token_amount}</td>
                                          <td>{rowData.status}</td>
                                          <td>{date}</td>
                                        </tr>
                                      </>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right mt-4">
                      <ul className="pagination d-inline-flex">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>
                        {Array.from({
                          length: Math.ceil(record.length / itemsPerPage),
                        }).map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentPage === index + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage ===
                            Math.ceil(record.length / itemsPerPage)
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <Footer />
        </div>
      </div>
    </>
  );
};
