import { useState, useEffect, useRef } from "react";
import { Navbar } from "./widgets/Navbar";
import { Header } from "./widgets/Header";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  createWeb3Modal,
  defaultConfig,
} from "@web3modal/ethers/react";
import {
  parseUnits,
  formatEther,
  BrowserProvider,
  Contract,
  JsonRpcProvider,
  parseEther,
  toBigInt,
} from "ethers";
import { registerUser } from "./services/user";
import { metaRequestInsert, getTotalUsdt } from "./services/transaction";
import { toast } from "react-toastify";

import $ from "jquery";
import {
  ethChainId,
  binanceChainId,
  bscRpcUrl,
  EthRpcUrl,
  tokenAddress,
  tokenAbi,
  polygonRpcUrl,
  polygonChainId,
  usdtPolygon,
  usdcPolygon,
  usdcPolygonabi,
  usdtPolygonabi,
  gasWizardPolygonAddress,
  gasWizardPolygonabi,
} from "../constant";

import {
  wbtc,
  weth,
  usdt,
  usdc,
  bep20abi,
  gasWizardAddress,
  gasWizardabi,
  gasWizardEthAddress,
  gasWizardEthabi,
  erc20abi,
  usdterc20abi,
  usdcerc20abi,
  wbtc20abi,
  wbtcErc,
  usdtErc,
  usdcErc,
} from "../constant";
import { Footer } from "./widgets/Footer";
import { checkUser } from "./services/auth/auth";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Emailpattern } from "./pattern/Pattern";
import { RegisterUser } from "./auth/RegisterUser";

export const Home = () => {
  const navigate = useNavigate();

  const projectId = "6c9760534aa3c822cb8a072339bbca59";
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const { walletProvider } = useWeb3ModalProvider();
  const [bnbPrice, setbnbPrice] = useState();
  const [btcPrice, setbtcPrice] = useState();

  const [tokenPrice, settokenPrice] = useState();
  const [ethPrice, setethPrice] = useState();
  const [totalUsdt, setTotalUsdt] = useState();
  const [totalSupply, setTotalSupply] = useState();
  const [totalToken, setTotalToken] = useState();
  const [selectedChain, setSelectedChain] = useState(0);
  const [selectedCurrencyUserBalance, setselectedCurrencyUserBalance] =
    useState();
  const [selectChains, setSelectChain] = useState("0");
  const [userUkcBalance, setuserUkcBalance] = useState(0);

  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [name, setName] = useState("");
  const [mobile_number, setMobile_number] = useState("+91");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const [mobile_numberErr, setMobile_numberErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [country_code, setCountry_code] = useState();
  const [tokenInput, settokenInput] = useState();
  const [ukcInput, setukcInput] = useState();

  const [buyBtnText, setbuyBtnText] = useState("Select Currency");

  const mainnet = [
    {
      chainId: binanceChainId,
      name: "Binance Smart Chain",
      currency: "BNB",
      explorerUrl: "https://bscscan.com/",
      rpcUrl: bscRpcUrl,
    },
    {
      chainId: ethChainId,
      name: "Ethereum Mainnet",
      currency: "ETH",
      explorerUrl: "https://etherscan.io/",
      // rpcUrl: 'https://cloudflare-eth.com'
      rpcUrl: EthRpcUrl,
    },
    {
      chainId: polygonChainId,
      name: "Polygon",
      currency: "MATIC",
      explorerUrl: "https://etherscan.io/",
      // rpcUrl: 'https://cloudflare-eth.com'
      rpcUrl: polygonRpcUrl,
    },
  ];

  const bscRpc = bscRpcUrl;
  const EthRpc = EthRpcUrl;
  const polygonRpc = polygonRpcUrl;

  const metadata = {
    name: "gaswizard",
    description: "gaswizard",
    url: "https://gaswizard.io/",

    icons: ["https://gaswizard.io/html/img/favicon.ico"],
  };

  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: mainnet,
    projectId,
    enableAnalytics: true,
  });

  const selectAddress =
    selectChains == 0
      ? gasWizardAddress
      : selectChains == 1
      ? gasWizardEthAddress
      : selectChains == 2
      ? gasWizardPolygonAddress
      : "";
  const selectAbi =
    selectChains == 0
      ? gasWizardabi
      : selectChains == 1
      ? gasWizardEthabi
      : selectChains == 2
      ? gasWizardPolygonabi
      : "";

  const getSignerOrProvider = async (needSigner = false) => {
    try {
      if (!isConnected) {
        throw Error("User disconnected");
      }

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      if (needSigner) {
        const signer = await ethersProvider.getSigner();

        return signer;
      }

      return signer;
    } catch (error) {
      // console.error("Error in getWeb3Provider:", error);
      throw error;
    }
  };
  const selectCurrency = async (e) => {
    try {
      if (isConnected) {
        setSelectedCurrency(e.target.value);
        let getTokenAddr;
        let provider;
        if (selectChains == 0) {
          provider = new JsonRpcProvider(bscRpc);
        } else if (selectChains == 1) {
          provider = new JsonRpcProvider(EthRpc);
        } else if (selectChains == 2) {
          provider = new JsonRpcProvider(polygonRpc);
        }

        const signer = await getSignerOrProvider(true);
        if (e.target.value == "") {
          setselectedCurrencyUserBalance("");
          setbuyBtnText("Select Currency");
        } else {
          setbuyBtnText("Approve & Buy");
        }

        if (selectChains == 0) {
          if (e.target.value == "1") {
            getTokenAddr = wbtc;
          } else if (e.target.value == "2") {
            getTokenAddr = weth;
          } else if (e.target.value == "3") {
            getTokenAddr = usdt;
          } else if (e.target.value == "4") {
            getTokenAddr = usdc;
          }
        } else if (selectChains == 1) {
          if (e.target.value == "1") {
            getTokenAddr = wbtcErc;
          } else if (e.target.value == "2") {
            getTokenAddr = usdtErc;
          } else if (e.target.value == "3") {
            getTokenAddr = usdcErc;
          }
        } else if (selectChains == 2) {
          if (e.target.value == "1") {
            getTokenAddr = usdtPolygon;
          } else if (e.target.value == "2") {
            getTokenAddr = usdcPolygon;
          }
        }

        setukcInput("");
        settokenInput("");

        if (e.target.value == "0") {
          const balance = await provider.getBalance(address);
          const balanceInEther = formatEther(balance);

          setselectedCurrencyUserBalance(balanceInEther);
        } else {
          let chainnnn;
          if (selectChains == 0) {
            chainnnn = bep20abi;
          } else if (selectChains == 1) {
            if (e.target.value == 0) {
              chainnnn = erc20abi;
            } else if (e.target.value == 1 || e.target.value == 3) {
              chainnnn = wbtc20abi;
            } else if (e.target.value == 2) {
              chainnnn = usdterc20abi;
            }
          } else if (selectChains == 2) {
            if (e.target.value == 0) {
              chainnnn = erc20abi;
            } else if (e.target.value == 1) {
              chainnnn = usdtPolygonabi;
            } else if (e.target.value == 2) {
              chainnnn = usdcPolygonabi;
            }
          }
          let balance;

          if (selectChains == 0) {
            const contract = new Contract(getTokenAddr, chainnnn, provider);
            balance = await contract.balanceOf(address);
          } else if (selectChains == 1) {
            if (e.target.value == 0) {
              const contract = new Contract(getTokenAddr, chainnnn, provider);
              balance = await contract?.balanceOf(address);
            } else if (e.target.value == 1 || e.target.value == 3) {
              const contract = new Contract(getTokenAddr, chainnnn, provider);

              balance = await contract?.balanceOf(address);
            } else if (e.target.value == 2) {
              const contract = new Contract(getTokenAddr, chainnnn, provider);
              balance = await contract?.balances(address);
            }
          } else if (selectChains == 2) {
            if (e.target.value == 0) {
              const contract = new Contract(getTokenAddr, chainnnn, provider);
              balance = await contract?.balanceOf(address);
            } else if (e.target.value == 1 || e.target.value == 2) {
              const contract = new Contract(getTokenAddr, chainnnn, provider);

              balance = await contract?.balanceOf(address);
            }
          }

          balance = Number(balance);

          if (selectChains == "1") {
            let newUpdateBal;
            if (e.target.value == "0") {
              const hnewUpdateBal = balance / 10 ** 18;
              setselectedCurrencyUserBalance(hnewUpdateBal);
            } else if (e.target.value == "1") {
              newUpdateBal = balance / 10 ** 8;
            } else if (e.target.value == "2" || e.target.value == "3") {
              newUpdateBal = balance / 10 ** 6;
            }
            newUpdateBal = parseFloat(newUpdateBal ? newUpdateBal : 0).toFixed(
              2
            );
            setselectedCurrencyUserBalance(newUpdateBal);
          } else if (selectChains == "0") {
            let nbalance = balance / 10 ** 18;
            nbalance = nbalance?.toFixed(2);
            setselectedCurrencyUserBalance(nbalance);
          } else if (selectChains == "2") {
            let nbalance = balance / 10 ** 6;
            nbalance = nbalance?.toFixed(2);
            setselectedCurrencyUserBalance(nbalance);
          }

          setbuyBtnText("Approve & Buy");
        }
      } else {
        toast.dismiss();
        toast.error("Please connect with  wallet");
      }
    } catch (err) {
      // console.error(err);
    }
  };
  // ============= eth chain======//
  const selectChain = async (val) => {
    setSelectChain(val);
    setSelectedCurrency("");
    try {
      if (isConnected) {
        const provider = new JsonRpcProvider(bscRpc);

        const signer = await getSignerOrProvider(true);
        setukcInput("");
        settokenInput("");
        if (val == "") {
          setselectedCurrencyUserBalance("");
          setbuyBtnText("Select Chain");
        } else {
          setbuyBtnText("Approve & Buy");
        }
      } else {
        toast.dismiss();
        toast.error("Please connect with  wallet");
      }
    } catch (err) {
      // console.error(err);
    }
  };
  // ============= eth chain======//
  const getBalance = async () => {
    let provider;
    if (selectChains == 0) {
      provider = new JsonRpcProvider(bscRpc);
    } else if (selectChains == 1) {
      provider = new JsonRpcProvider(EthRpc);
    } else if (selectChains == 2) {
      provider = new JsonRpcProvider(polygonRpc);
    }

    const signer = await getSignerOrProvider(true);
    let balance = 0;
    if (selectedCurrency == null) {
      balance = 0;
    } else if (selectedCurrency == 0) {
      balance = await provider.getBalance(address);
      balance = formatEther(balance);
    } else {
      let getTokenAddr;
      let chainnnn;

      if (selectChains == 0) {
        if (selectedCurrency == "1") {
          getTokenAddr = wbtc;
        } else if (selectedCurrency == "2") {
          getTokenAddr = weth;
        } else if (selectedCurrency == "3") {
          getTokenAddr = usdt;
        } else if (selectedCurrency == "4") {
          getTokenAddr = usdc;
        }
        chainnnn = bep20abi;
      } else if (selectChains == 1) {
        if (selectedCurrency == "1") {
          chainnnn = wbtc20abi;
          getTokenAddr = wbtcErc;
        } else if (selectedCurrency == "2") {
          chainnnn = usdterc20abi;
          getTokenAddr = usdtErc;
        } else if (selectedCurrency == "3") {
          getTokenAddr = usdcErc;
          chainnnn = wbtc20abi;
        }
      } else if (selectChains == 2) {
        if (selectedCurrency == "1") {
          chainnnn = usdtPolygon;
          getTokenAddr = usdtPolygonabi;
        } else if (selectedCurrency == "2") {
          chainnnn = usdcPolygon;
          getTokenAddr = usdcPolygonabi;
        }
      }
      if (selectChains == 0) {
        const contract = new Contract(getTokenAddr, chainnnn, provider);
        balance = await contract.balanceOf(address);
      } else if (selectChains == 1) {
        if (selectedCurrency == 0) {
          const contract = new Contract(getTokenAddr, chainnnn, provider);
          balance = await contract?.balanceOf(address);
        } else if (
          (selectedCurrency == 1 && address) ||
          (selectedCurrency == 3 && address)
        ) {
          const contract = new Contract(getTokenAddr, chainnnn, provider);
          balance = await contract?.balanceOf(address);
        } else if (selectedCurrency == 2 && address) {
          const contract = new Contract(getTokenAddr, chainnnn, provider);
          balance = await contract?.balances(address);
        }
      }

      balance = Number(balance);

      balance = balance / 10 ** 18;
      balance = balance.toFixed(4);

      if (selectChains == 2) {
        if (selectedCurrency == 0) {
          const contract = new Contract(getTokenAddr, chainnnn, provider);
          balance = await contract?.balanceOf(address);
        }
      }
      balance = balance / 10 ** 6;
      balance = balance.toFixed(4);
    }
    return balance;
  };

  useEffect(() => {
    const chain = localStorage.getItem("chain");
    const currency = localStorage.getItem("currency");

    const tokenInput = localStorage.getItem("tokenInput");
    const ukcInput = localStorage.getItem("ukcInput");
    if (chain) {
      setSelectChain(chain);

      localStorage.removeItem("chain");
    }
    if (currency) {
      setSelectedCurrency(currency);
      localStorage.removeItem("currency");
    }
    if (tokenInput) {
      settokenInput(tokenInput);
      localStorage.removeItem("tokenInput");
    }
    if (ukcInput) {
      let amt = Number(ukcInput).toFixed(2);
      setukcInput(amt);
      setbuyBtnText("Approve & Buy");
      localStorage.removeItem("ukcInput");
    }
  }, [localStorage]);

  useEffect(() => {
    TotalUsdtGet();
  }, []);
  useEffect(() => {
    getTotalSupply();
  }, [address]);
  const TotalUsdtGet = async () => {
    const resp = await getTotalUsdt();

    if (resp.status) {
      let totalusdt = parseInt(resp?.amount);
      let totalToken = parseInt(resp?.tokenAmt);
      setTotalUsdt(totalusdt);
      setTotalToken(totalToken);
    }
  };
  const formatNumber = (number) => {
    return number !== null && number !== undefined
      ? number.toLocaleString("en-US")
      : "";
  };

  let formattedTotalToken = formatNumber(totalToken);
  let formattedTotalUsdt = formatNumber(totalUsdt);
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  // useEffect(() => {
  //   handleBeforeUnload();
  // }, []);

  const buy = async () => {
    try {
      if (isConnected) {
        if (!selectChains) {
          toast.dismiss();
          toast.error("Please select chain");
          return;
        }

        if (!selectedCurrency) {
          toast.dismiss();
          toast.error("Please select Currency");

          return;
        }

        // try {
        if (
          tokenInput == undefined ||
          tokenInput.length == 0 ||
          tokenInput <= 0
        ) {
          toast.dismiss();
          toast.error("Invalid Amount");

          return;
        }

        if (selectedCurrency == "0") {
          var tokenBalance = await getBalance();

          if (tokenBalance < tokenInput) {
            toast.dismiss();
            toast.error("Insufficient Balance");

            return;
          }

          const signer = await getSignerOrProvider(true);
          const provider = await getSignerOrProvider();

          if (selectChains == 0) {
            if (chainId != binanceChainId) {
              toast.dismiss();
              toast.error("Please change network to binanace smart chain");
              return;
            }
          } else if (selectChains == 1) {
            if (chainId != ethChainId) {
              toast.dismiss();
              toast.error("Please change network to  Eth chain");
              return;
            }
          } else if (selectChains == 2) {
            if (chainId != polygonChainId) {
              toast.dismiss();
              toast.error("Please change network to  Polygon chain");
              return;
            }
          }

          const res = await checkUser({ address });
          if (res.status) {
            window.addEventListener("beforeunload", handleBeforeUnload);
            const contract = new Contract(selectAddress, selectAbi, provider);
            const valueInWei = parseEther(tokenInput.toString());

            let balance;
            if (selectChains == 0) {
              balance = await contract.buyTokenWithbnb(
                process.env.REACT_APP_getfundBinanceAddress,
                {
                  value: valueInWei,
                }
              );
            } else if (selectChains == 1) {
              balance = await contract.buyTokenWithETH(
                process.env.REACT_APP_getfundEthreumAddress,
                {
                  value: valueInWei,
                }
              );
            } else if (selectChains == 2) {
              balance = await contract.buyTokenWithMATIC(
                process.env.REACT_APP_getfundEthreumAddress,
                {
                  value: valueInWei,
                }
              );
            }

            const transactionHash = balance.hash;

            const data = {
              userAddress: address,
              chain: selectChains,
              currency: selectedCurrency,
              amount: tokenInput,
              tokenAmount: ukcInput,
              trans_id: transactionHash,
            };
            const token = localStorage.getItem("jwtToken");
            const result = await metaRequestInsert(data, token);

            if (result.status) {
              window.removeEventListener("beforeunload", handleBeforeUnload);
              toast.dismiss("");
              toast.success(result.message);

              setTimeout(() => {
                window.location.reload();
              }, [10000]);
            } else {
              toast.dismiss("");
              toast.dismiss(result.message);
            }
          } else {
            toast.error(res.message);
            localStorage.setItem("chain", selectChains);
            localStorage.setItem("currency", selectedCurrency);
            localStorage.setItem("tokenInput", tokenInput);
            localStorage.setItem("ukcInput", ukcInput);
            setTimeout(() => {
              navigate("/sign-up");
            }, 2000);
          }
        } else {
          const signer = await getSignerOrProvider(true);
          const provider = await getSignerOrProvider();
          const inputamount = parseUnits(tokenInput, 18);

          let getTokenAddr;
          let updatetAmt = Number(tokenInput);
          let chainnnn;
          if (selectChains == 0) {
            if (chainId != binanceChainId) {
              toast.dismiss();
              toast.error("Please change network to binanace smart chain");
              return;
            }
            if (selectedCurrency == "1") {
              getTokenAddr = wbtc;
            } else if (selectedCurrency == "2") {
              getTokenAddr = weth;
            } else if (selectedCurrency == "3") {
              getTokenAddr = usdt;
            } else if (selectedCurrency == "4") {
              getTokenAddr = usdc;
            }
            chainnnn = bep20abi;
          } else if (selectChains == 1) {
            if (chainId != ethChainId) {
              toast.dismiss();
              toast.error("Please change network to  Eth chain");
              return;
            }
            await getBalance();

            if (selectedCurrency == "1") {
              getTokenAddr = wbtcErc;
              chainnnn = wbtc20abi;
              updatetAmt = updatetAmt * 10 ** 8;
            } else if (selectedCurrency == "2") {
              chainnnn = usdterc20abi;

              getTokenAddr = usdtErc;
              updatetAmt = updatetAmt * 10 ** 6;
            } else if (selectedCurrency == "3") {
              chainnnn = usdcerc20abi;
              getTokenAddr = usdcErc;
              updatetAmt = updatetAmt * 10 ** 6;
            }
          } else if (selectChains == 2) {
            if (chainId != polygonChainId) {
              toast.dismiss();
              toast.error("Please change network to  Polygon chain");
              return;
            }
            await getBalance();

            if (selectedCurrency == "1") {
              getTokenAddr = usdtPolygon;
              chainnnn = usdterc20abi;
              updatetAmt = updatetAmt * 10 ** 6;
            } else if (selectedCurrency == "2") {
              chainnnn =  usdcPolygonabi;

              getTokenAddr = usdcPolygon;
              updatetAmt = updatetAmt * 10 ** 6;
            }
          }

          const res = await checkUser({ address });
          if (res.status) {
            window.addEventListener("beforeunload", handleBeforeUnload);
            const valueInWeii = parseEther(inputamount.toString());
            let balance;
            console.log(getTokenAddr,"getTokenAddr");
            let contract = new Contract(getTokenAddr, chainnnn, provider);
           
            if (selectChains == 0) {
              const contract = new Contract(getTokenAddr, chainnnn, provider);

              const checkA = (balance = await contract.allowance(
                address,
                selectAddress
              ));
              if (Number(checkA) / 10 ** 18 < tokenInput) {
                const contract = new Contract(getTokenAddr, chainnnn, provider);

                balance = await contract.approve(
                  selectAddress,
                  "10000000000000000000000000000000000000000000000000000"
                );
                await balance.wait();
                toast.success(" Approved Success");
              }
            } else if (selectChains == 1) {
              if (selectedCurrency == 1 || selectedCurrency == 3) {
                const contract = new Contract(getTokenAddr, chainnnn, provider);

                const checkA = (balance = await contract.allowance(
                  address,
                  selectAddress
                ));

                if (Number(checkA) / 10 ** 8 < tokenInput) {
                  balance = await contract.approve(
                    selectAddress,
                    "10000000000000000000000000000000000000000000000000000"
                  );
                }

                await balance.wait();
                toast.success(" Approved Success");
              } else if (selectedCurrency == 2) {
                const valueInWeii = updatetAmt.toString();

                try {
                  const contract = new Contract(
                    getTokenAddr,
                    chainnnn,
                    provider
                  );

                  const checkA = (balance = await contract.allowance(
                    address,
                    selectAddress
                  ));

                  if (Number(checkA) / 10 ** 6 < tokenInput) {
                    balance = await contract.approve(
                      selectAddress,
                      "10000000000000000000000000000000000000000000000000000"
                    );
                  }
                  await balance.wait();
                  toast.success(" Approved Success");
                } catch (error) {
                  console.log(error, "hhhhhhhhhhhh");
                }

                //
              }

              // }
              // approve (0x095ea7b3)
            } else if (selectChains == 2) {
              console.log("kkk");
              if (selectedCurrency == 1 || selectedCurrency == 2) {
                const contract = new Contract(getTokenAddr, chainnnn, provider);

                const checkA = (balance = await contract.allowance(
                  address,
                  selectAddress
                ));
                console.log(checkA,"checkA",Number(checkA) / 10 ** 6,selectAddress);

                if (Number(checkA) / 10 ** 6 < tokenInput) {
                  balance = await contract.approve(
                    selectAddress,
                    "10000000000000000000000000000000000000000000000000000"
                  );
                  await balance.wait();
                  toast.success(" Approved Success");
                }

              
              }

              // }
              // approve (0x095ea7b3)
            }

            contract = new Contract(selectAddress, selectAbi, provider);

            if (selectChains == 0) {
              balance = await contract.buyWithToken(
                inputamount,
                selectedCurrency
              );
            } else {
              balance = await contract.buyWithToken(
                updatetAmt,
                selectedCurrency
              );
            }

            // const balances=  await balance.wait();

            const transactionHash = balance.hash;

            const data = {
              userAddress: address,
              chain: selectChains,
              currency: selectedCurrency,
              amount: tokenInput,
              tokenAmount: ukcInput,
              trans_id: transactionHash,
            };
            const token = localStorage.getItem("jwtToken");
            const result = await metaRequestInsert(data, token);

            if (result.status) {
              window.removeEventListener("beforeunload", handleBeforeUnload);
              toast.dismiss("");
              toast.success(result.message);

              setTimeout(() => {
                window.location.reload();
              }, [10000]);
            } else {
              toast.dismiss("");
              toast.error(result.message);
            }
          } else {
            toast.error(res.message);
            localStorage.setItem("chain", selectChains);
            localStorage.setItem("currency", selectedCurrency);
            localStorage.setItem("tokenInput", tokenInput);
            localStorage.setItem("ukcInput", ukcInput);

            setTimeout(() => {
              navigate("/sign-up");
            }, 2000);
          }
        }
      } else {
        toast.dismiss();
        toast.error("Please connect with  wallet");
      }
    } catch (err) {
      console.log(err, "hh");
      if (
        err.message.includes(
          `execution reverted: "ERC20: insufficient allowance"`
        )
      ) {
        toast.error("Insufficient allowance");
      }
    }
  };

  const busdPrice = async (e) => {
    var busdAmt = e.target.value;
    console.log(busdAmt, "busdAmt");
    settokenInput(busdAmt);
    let res;
    //await checkApproval();
    var getVal = selectedCurrency;

    if (getVal == "0") {
      res = (busdAmt * bnbPrice) / (tokenPrice * 100000000);
    } else {
      var otherTokenPrice = 1;

      if (getVal == "1") {
        otherTokenPrice = btcPrice;
      } else if (getVal == "2") {
        otherTokenPrice = ethPrice;
      }
      res = (busdAmt * otherTokenPrice) / tokenPrice;

      if (selectChains == "1") {
        if (getVal == "2") {
          res = (busdAmt * 1) / tokenPrice;
        }
      }
      if (selectChains == "2") {
        if (getVal == "1" || getVal == "2") {
          res = (busdAmt * 1) / tokenPrice;
        }
      }
    }

    res = res.toFixed(2);

    setukcInput(res);
  };

  const getTotalSupply = async () => {
    try {
      let provider = new JsonRpcProvider(EthRpc);

      let contract = new Contract(tokenAddress, tokenAbi, provider);

      let balance = await contract?.totalSupply();

      balance = Number(balance);

      balance = balance / 10 ** 18;

      setTotalSupply(balance);
    } catch (error) {
      console.error("An error occurred while getting total supply:", error);
    }
  };

  const reverceBusdPrice = async (e) => {
    var tokenAmt = e.target.value;
    let res;
    tokenAmt = tokenAmt.toFixed(2);
    setukcInput(tokenAmt);
    var getVal = selectedCurrency;

    if (getVal == "0") {
      res = (tokenAmt * 100000000 * tokenPrice) / bnbPrice;
    } else {
      var otherTokenPrice = 1;
      if (getVal == "1") {
        otherTokenPrice = btcPrice;
      } else if (getVal == "2") {
        otherTokenPrice = ethPrice;
      }
      if (selectChains == "1") {
        if (getVal == "2") {
          res = (tokenAmt * 1) / tokenPrice;
        }
      }
      res = (tokenAmt * tokenPrice) / otherTokenPrice;
    }

    res = res.toFixed(8);
    settokenInput(res);
  };

  const getAllPrice = async () => {
    try {
     
      let provider;
      if (selectChains == 0) {
        provider = new JsonRpcProvider(bscRpc);
      } else if (selectChains == 1) {
        provider = new JsonRpcProvider(EthRpc);
      } else if (selectChains == 2) {
        provider = new JsonRpcProvider(polygonRpc);
      }

      const contract = new Contract(selectAddress, selectAbi, provider);

      const result = await contract.allPrice();
      console.log(result, "result111");

      let bnbPrice = Number(result[0]); //bnbPRice

      let tokenPrice = Number(result[1]);

      let tokenPriceDecimalVal = Number(result[2]);
      let tokenPriceDecimal = Math.pow(10, tokenPriceDecimalVal);
      let price = tokenPrice / tokenPriceDecimal;
      let priceLatest = Number(price)
        .toFixed(tokenPriceDecimalVal)
        .replace(/\.?0+$/, "");

      let wbtcTokenPrice = Number(result[3]);
      let wbtcTokenPriceDecimalVal = Number(result[4]);
      let wbtcTokenPriceDecimal = Math.pow(10, wbtcTokenPriceDecimalVal);
      let wbtcPrice = wbtcTokenPrice / wbtcTokenPriceDecimal;
      console.log(wbtcPrice, "wbtcPrice");
      let wbtcPriceLatest = Number(wbtcPrice)
        .toFixed(wbtcTokenPriceDecimalVal)
        .replace(/\.?0+$/, "");

      let wethTokenPrice = Number(result[5]);
      let wethTokenPriceDecimalVal = Number(result[6]);
      let wethTokenPriceDecimal = Math.pow(10, wethTokenPriceDecimalVal);
      var wethPrice = wethTokenPrice / wethTokenPriceDecimal;
      let wethPriceLatest = Number(wethPrice)
        .toFixed(wethTokenPriceDecimalVal)
        .replace(/\.?0+$/, "");

      setbnbPrice(bnbPrice);
      setethPrice(wethPriceLatest);
      setbtcPrice(wbtcPriceLatest);
      settokenPrice(priceLatest);
    } catch (err) {
      // console.error(err);
    }
  };

  useEffect(() => {
    if (
      (isConnected && chainId == binanceChainId) ||
      (isConnected && chainId == ethChainId) ||
      (isConnected && chainId == polygonChainId)
    ) {
      getAllPrice();
      getBalance();
      getTotalSupply();

      if (chainId != binanceChainId) {
      }
    }

    if (!isConnected) {
      localStorage.removeItem("jwtToken");
      setSelectedCurrency("");
      setukcInput("");
      settokenInput("");
      setuserUkcBalance("");
      setselectedCurrencyUserBalance("");
      $("#currency_id").val("");
      $("#table_body").html();
    }
  }, [tokenInput, address, selectChains, selectedCurrency]);

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

  const validNumber = (e) => {
    if (!/[\d.]/.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleOnChanges = (value, country) => {
    setMobile_number(value);

    let adjustedMobile = value.startsWith(country.dialCode)
      ? value.replace(country.dialCode, "")
      : value;

    if (!adjustedMobile) {
      setMobile_numberErr("Mobile Number is required");
    } else {
      setMobile_numberErr("");
    }
    setNumber(adjustedMobile);
    setCountry_code("+" + country.dialCode);
  };
  const registerHandler = async () => {
    if (!name) {
      setNameErr("Name is required");
      return;
    }
    if (!email) {
      setEmailErr("This field is required");
      return;
    }
    if (!Emailpattern.test(email)) {
      setEmailErr("Please enter valid email");
      return;
    }
    if (!number) {
      setMobile_numberErr("This field is required");
      return;
    }

    // const address = localStorage.getItem("address");
    // if (!address) {
    //   return toast.error("Please connect with metamusk");
    // }

    let data = {
      name,
      email,
      mobile_number: number,
      country_code,
    };

    const result = await registerUser(data);
    if (result.status) {
      let token = result.token;
      localStorage.setItem("jwtToken", token);

      setTimeout(() => {
        navigate("/#buy-now", { replace: true });
        setTimeout(() => {
          window.scrollTo(0, window.scrollY);
        }, 100);
      }, 2000);

      toast.success(result.message);
      setName("");
      setCountry_code(" ");
      setEmail("");
      setMobile_number("");
    } else {
      toast.error(result.message);
    }
  };

  const homeRef = useRef(null);
  const tokenomicsRef = useRef(null);
  const faqRef = useRef(null);
  const roadmapRef = useRef(null);
  const aboutUsRef = useRef(null);
  const buynowRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash || homeRef.current) {
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

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

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
  const scrollTobuynow = () => {
    if (buynowRef.current) {
      // buynowRef.current.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({ behavior: "smooth", top: 950 });
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10,
    cssEase: "linear",
    centerMode: true,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  //============== for chain changes ==============//
  const handleChange = (e) => {
    const err = "This field is required";
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
      if (value === "") {
        setNameErr("Name is required");
      } else {
        setNameErr("");
      }
    }
    if (name == "email") {
      setEmail(value);

      if (value == "") {
        setEmailErr(err);
      } else {
        if (!Emailpattern.test(value)) {
          setEmailErr("Please enter valid email");
        } else {
          setEmailErr("");
        }
      }
    }
    if (name == "mobile_number") {
      setMobile_number(value);

      if (value === "") {
        setMobile_numberErr("Mobile Number is required");
      } else {
        setMobile_numberErr("");
      }
    }
  };
  const chainImages = [
    "img/bnb-white.png",
    "img/eth-white.png",
    "img/polygon-white.png",
    "img/arbitrum-white.png",
    "img/avalanche-white.png",
    // "img/optimism-white.png",
    // "img/fantom-white.png",
  ];

  const handleSelectChain = (index) => {
    setSelectedChain(index);
  };
  const chainButtons = [
    { index: "0", imgSrc: "img/bnb-white.png", alt: "bnb" },
    { index: "1", imgSrc: "img/eth-white.png", alt: "usdt" },
    { index: "2", imgSrc: "img/polygon-white.png", alt: "polygon" },
    { index: "3", imgSrc: "img/arbitrum-white.png", alt: "arbitrum" },
    { index: "4", imgSrc: "img/avalanche-white.png", alt: "avalanche" },
    // { index: "5", imgSrc: "img/optimism-white.png", alt: "optimism" },
    // { index: "6", imgSrc: "img/fantom-white.png", alt: "fantom" },
  ];

  const chainOptions = [
    [
      // Chain 0
      <option value="0">BNB</option>,
      <option value="1">WBTC (BEP20)</option>,
      <option value="2">WETH (BEP20)</option>,
      <option value="3">USDT (BEP20)</option>,
      <option value="4">USDC (BEP20)</option>,
    ],
    [
      // Chain 1
      <option value="0">ETH</option>,
      <option value="1">WBTC (ERC20)</option>,
      <option value="2">USDT (ERC20)</option>,
      <option value="3">USDC (ERC20)</option>,
    ],
    [
      // Chain 2
      <option value="0">MATIC</option>,
      <option value="1">USDT (polygon)</option>,
      <option value="2">USDC (polygon)</option>,
    ],
    [
      // Chain 3
      <option value="0">ARB</option>,
      <option value="1">USDT (ARB)</option>,
      <option value="2">USDC (ARB)</option>,
    ],
    [
      // Chain 4
      <option value="0">AVAX</option>,
      <option value="1">USDT (AVAX)</option>,
      <option value="2">USDC (AVAX)</option>,
    ],
  ];

  //============== for chain changes ==============//
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
          <Header scrollTobuynow={scrollTobuynow} />
          <div id="scroll-to-top">
            <i className="bi bi-chevron-up fa-fw" />
          </div>

          <section className="logos p70 pb-2 pb-md-5 mb-md-2">
            <Slider {...settings}>
              <div style={{ margin: "0 10px", display: "inline-block" }}>
                <img
                  className="img-fluid"
                  src="img/binance-logo.png"
                  alt="binance-logo.png"
                />
              </div>
              <div style={{ margin: "0 10px", display: "inline-block" }}>
                <img
                  className="img-fluid"
                  src="img/nasdaq-logo.png"
                  alt="nasdaq-logo"
                />
              </div>
              <div style={{ margin: "0 10px", display: "inline-block" }}>
                <img
                  className="img-fluid"
                  src="img/bloomberg.png"
                  alt="bloomberg"
                />
              </div>
              <div style={{ margin: "0 10px", display: "inline-block" }}>
                <img
                  className="img-fluid"
                  src="img/yahoo_news_logo.png"
                  alt="yahoo_news_logo.png"
                />
              </div>
              <div style={{ margin: "0 10px", display: "inline-block" }}>
                <img
                  className="img-fluid"
                  src="img/cointelegraph.png"
                  alt="Cointelegraph"
                />
              </div>
            </Slider>
          </section>
          <section className="bg2 ">
            <section
              className="ex_box p70  pt-md-4"
              onClick={scrollTobuynow}
              id="buy-now"
              ref={buynowRef}
            >
              <div className="container  position-relative">
                <img
                  src="img/app-coins.png"
                  alt="app-coins "
                  className="app_coins position-absolute "
                />
                <div className="row  ">
                  <div className="col-md-7 token_info_man">
                    <div
                      className="ex_box_in position-relative box"
                      id="buy-now"
                      ref={buynowRef}
                      // onClick={scrollTobuynow}
                    >
                      <h3 className="text-center  ">
                        <span className="t_gr">STAGE 1</span>
                      </h3>
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="home_profile">
                            <img src="img/home_profile.png" alt="app-coins " />
                          </div>
                          <div className="home_profile_text">
                            {/* <h4 className="color1 m-0">Hey, Tom</h4>
                            
                            Welcome back */}
                            <w3m-button balance="hide" />
                          </div>
                          <div className="text-center  mt-4"></div>
                        </div>

                        <div className="home_profile_right text-right ml-auto">
                          <h4 className="color1 mb-0">
                            1 <span className="ffa"></span>GWIZ = $0.01
                          </h4>
                        </div>
                      </div>

                      <div className="text-center mt-3">
                        Balance :{" "}
                        <span id="busd_balance">
                          {selectedCurrencyUserBalance
                            ? selectedCurrencyUserBalance
                            : "0"}
                        </span>
                        <div className="row   mt-3">
                          <div className="col-6">
                            <h6 className="mb-0">USDT Raised</h6>
                            <span className="t_gr value_ex">
                              <span className="ffa">$</span>
                              {totalUsdt ? formattedTotalUsdt : "0"}
                            </span>
                          </div>
                          <div className="col-6">
                            <h6 className="mb-0">Total Tokens Sold</h6>
                            <span className="t_gr value_ex">
                              <span className="ffa">GWIZ </span>
                              {totalToken ? formattedTotalToken : "0"}
                            </span>

                            {/* <h4 className="open_05">
                          /<span className="ffa">$</span>402,262
                        </h4> */}
                          </div>
                        </div>
                      </div>
                      <div className="p-2 p-md-3">
                        <div className="progress mb-4 mt-md-0">
                          <div
                            className="progress-bar"
                            style={{
                              width: totalSupply
                                ? `${
                                    parseInt((totalToken * 100) / 40000000) %
                                    100
                                  }%`
                                : "0%",
                            }}
                          >
                            <span className="pp">
                              {" "}
                              {totalSupply
                                ? parseInt((totalToken * 100) / 40000000)
                                : 0}
                              %
                            </span>
                          </div>
                        </div>

                        <div className="tab_btn d-flex mb-3">
                          {chainButtons.map(({ index, imgSrc, alt }) => (
                            <button
                              key={index}
                              onClick={() => selectChain(index)}
                              className={selectChains === index ? "active" : ""}
                            >
                              <img src={imgSrc} alt={alt} />
                            </button>
                          ))}
                        </div>
                        <div className="form-group ex_input_box position-relative">
                          <input
                            // type="number"
                            onKeyPress={validNumber}
                            step="0.1"
                            onChange={busdPrice}
                            min="0"
                            placeholder="0"
                            value={tokenInput}
                            id="busdAmtIdo"
                            className="input_item"
                          />

                          <img
                            src={chainImages[selectChains]}
                            alt="Chain Logo"
                            className="in_icon position-absolute"
                            onClick={() => handleSelectChain(selectChains)}
                          />
                          <select
                            class=" select_dark"
                            onChange={(e) => selectCurrency(e)}
                            id="currency_id"
                            name="currency_id"
                            value={selectedCurrency}
                          >
                            <option value="">Select Currency</option>
                            {selectChains == 0 ? (
                              <>
                                <option value="0">BNB</option>
                                <option value="1">WBTC (BEP20)</option>
                                <option value="2">WETH (BEP20)</option>
                                <option value="3">USDT (BEP20)</option>
                                <option value="4">USDC (BEP20)</option>
                              </>
                            ) : selectChains == 1 ? (
                              <>
                                <option value="0">ETH</option>
                                <option value="1">WBTC (ERC20)</option>
                                <option value="2">USDT (ERC20)</option>
                                <option value="3">USDC (ERC20)</option>
                              </>
                            ) : selectChains == 2 ? (
                              <>
                                <option value="0">MATIC</option>
                                <option value="1">USDT (polygon)</option>
                                <option value="2">USDC (polygon)</option>
                              </>
                            ) : selectChains == 3 ? (
                              <>
                                <option value="0">ARB</option>
                                <option value="1">USDT (ARB)</option>
                                <option value="2">USDC (ARB)</option>
                              </>
                            ) : selectChains == 4 ? (
                              <>
                                <option value="0">AVAX</option>
                                <option value="1">USDT (AVAX)</option>
                                <option value="2">USDC (AVAX)</option>
                              </>
                            ) : null}
                          </select>
                        </div>

                        {/* Balance :{" "}
                        <span class="token_balance">{userUkcBalance}</span> */}
                        <div className="form-group ex_input_box position-relative">
                          <input
                            // type="number"
                            class="reverceBusdPrice"
                            onChange={reverceBusdPrice}
                            min="0"
                            placeholder="0"
                            value={ukcInput}
                            disabled
                            id="tokenAmtIdo2"
                            className="input_item"
                          />
                          <img
                            src="img/coin-input.png"
                            alt="coin "
                            className="in_icon position-absolute"
                          />
                        </div>

                        <div className="mb-2 text-center">
                          <button
                            className="btn w100"
                            id="btn-connect-wallet"
                            onClick={buy}
                          >
                            {buyBtnText}
                          </button>
                        </div>

                        <a
                          href="/transaction-details"
                          className="btn btn_border2 w100 mt-2"
                          id="btn-connect-wallet"
                        >
                          Transaction Dashboard
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="text-center p70 pt-2"
              data-scroll-index={1}
              id="about-us"
              ref={aboutUsRef}
            >
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h2 className="text-center hadding mb-md-5 mb-4">
                      What is <span className="t_gr">Gas Wizard?</span>{" "}
                    </h2>
                    <p>
                      Gas Wizard is the solution to the surge of gas prices,
                      partnering with the leading retail oil and gas
                      distributors in the world, allowing users to access
                      discounts on petrol and charging rates. With their
                      developing app, Gas Wizard is aiming to beat the surge of
                      gas prices.
                    </p>
                    <h4 className="ttu mt-5 mb-4">Read the whitepaper</h4>
                    <a
                      target="_blank"
                      href="https://gaswizard.gitbook.io/gas-wizard-whitepaper/"
                      className="btn btn_border"
                    >
                      Whitepaper
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="text-center p70"
              // data-scroll-index={2}
              id="tokenomics"
              ref={tokenomicsRef}
            >
              <div className="container">
                <h2 className="text-center hadding mb-4">
                  {" "}
                  <span className="t_gr">Tokenomics</span>{" "}
                </h2>
                <div className="d-inline-flex mb-4 tokenomics_value_top">
                  <div className>
                    <h6 className="ttu">Total supply</h6>
                    <h4 className="h1">5,000,000,000</h4>
                  </div>
                  <div className="pl-4 pl-md-5">
                    <h6 className="ttu">symbol</h6>
                    <h4 className="ttu h1">
                      {" "}
                      <span className="ffa">$</span>Gwiz
                    </h4>
                  </div>
                </div>
                <img
                  src="img/tokenomics.png"
                  alt="tokenomics"
                  className="img-fluid"
                />
                <h3 className=" mt_100">Token Contract</h3>
                <div className="box d-md-flex  justify-content-center ">
                  <div className="token_contract_item">
                    <h5 className="ttu">contract address</h5>
                    <span>0x40B34fA75a8724E00F7A1f5305f27dE3E59dFee1</span>
                  </div>
                  <div className="token_contract_item">
                    <h5 className="ttu">decimal</h5>
                    <span>18</span>
                  </div>
                  <div className="token_contract_item">
                    <h5 className="ttu">network</h5>
                    <span className="ttu">
                      {" "}
                      ethereum mainnet
                      <br />
                      (erc20)
                    </span>
                  </div>
                  <div className="token_contract_item">
                    <h5 className="ttu">token symbol</h5>
                    <span className="ttu">gwiz</span>
                  </div>
                </div>
              </div>
            </section>
            <section className="text-center p70">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h2 className=" hadding   mb-2 mb-md-4">
                      <span className="t_gr">Ecosystem</span>{" "}
                    </h2>
                    <h3 className=" mb-md-5 mb-4 h2">GWIZ Token</h3>
                    <p>
                      The GWIZ token is the driving force behind the ecosystem,
                      allowing investors to benefit from a host of benefits
                      whilst providing discounts and bonuses. Investors wanting
                      to benefit from the Gas Wizard ecosystem will require{" "}
                      <span className="ffa">$</span>GWIZs to cover transaction
                      fees creating a real world utility for{" "}
                      <span className="ffa">$</span>GWIZ ensuring a real world
                      use case.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="roadmap p70"
              data-scroll-index={4}
              id="roadmap"
              ref={roadmapRef}
            >
              <div className="container">
                <h2 className=" hadding text-center  mb-4">
                  <span className="t_gr">Roadmap</span>{" "}
                </h2>
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="box roadmap_box">
                      <h5 className="mb-3 ">PHASE 1 - The Concept (Q1 2024)</h5>
                      <ul>
                        <li>
                          {" "}
                          Gas Wizard website launch preparation, Presale website
                          launch, Telegram community, open socials.{" "}
                        </li>
                        <li> Commencement of marketing campaigns.</li>
                        <li>
                          {" "}
                          Build GWIZ token on Ethereum mainnet and submit for
                          audit
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 ml-auto  mb-4">
                    <div className=" roadmap_box2 ml-md-4 mb-4 ">
                      <i className="bi bi-chevron-down" />
                    </div>
                    <div className="box roadmap_box">
                      <h5 className="mb-3 ">
                        PHASE 2 - Public Presale (Q1-Q4 2024)
                      </h5>
                      <ul>
                        <li> Commencement of public presale&nbsp; </li>
                        <li> Listing on ICO hotlists </li>
                        <li> Forge partnerships </li>
                        <li> KYC and AUDIT public </li>
                        <li> Listing on DEX&nbsp; </li>
                        <li> Commencement of Phase 2 Marketing campaigns</li>
                        <li> Development of App beta version</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className=" roadmap_box2 roadmap_box3 mb-4 mr-md-4">
                      <i className="bi bi-chevron-down" />
                    </div>
                    <div className="box roadmap_box">
                      <h5 className="mb-3 ">
                        PHASE 3 - Listings and Operations (Q1 2025)
                      </h5>
                      <ul>
                        <li>Public launch of Gas Wizard mobile app</li>
                        <li>Listing on CEX</li>
                        <li>Affiliate partners announcement</li>
                        <li>
                          First GWIZ community live seminar with top 100 token
                          holders
                        </li>
                        <li>1 year of free fuel giveaway&nbsp;</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4 ml-auto">
                    <div className=" roadmap_box2     mb-4 ml-md-4">
                      <i className="bi bi-chevron-down" />
                    </div>
                    <div className="box roadmap_box">
                      <h5 className="mb-3 ">PHASE 4 - Growth&nbsp;</h5>
                      <ul>
                        <li> Onboard more real world partners </li>
                        <li> Launch of GWIZ NFTs </li>
                        <li> List on tier 1 CEX </li>
                        <li>
                          Hosting live network events aiming to forge new
                          partnerships with major crypto funds and real world
                          partners
                        </li>
                        <li> Worldwide expansion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="roadmap p70">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8 m-auto">
                    <div className="bgg3" />
                    <h2 className=" hadding text-center  mb-4">
                      Gas Wizard App
                      <br />
                      <span className="t_gr"> Launching Soon!</span>{" "}
                    </h2>
                    <div className="row align-items-center">
                      <div className="col-lg-auto ml-auto text-lg-right">
                        <img
                          src="img/app.png"
                          alt="app"
                          className=" img-fluid app"
                        />
                      </div>
                      <div className="col-lg-6 text-center mr-auto ">
                        <p className="mb-md-5 mb-4">
                          By using the Gas Wizard app users can locate the
                          closest petrol station that is part of the Gas WIzard
                          ecosystem and save money on their gas. By using GWIZ
                          token through the app to pay for gas, charging fees or
                          any other services at petrol and charging stations,
                          users will get rewarded in the form of GWIZ token that
                          can then be reused to pay for other services within
                          the Gas Wizard ecosystem giving the GWIZ token a real
                          world utility.
                        </p>
                        <h3 className="mb-3 h2 pt-md-4">
                          Will be available on
                        </h3>
                        <a href="#">
                          {" "}
                          <img
                            src="img/ios.png"
                            alt="ios"
                            className="app_stor img-fluid"
                          />
                        </a>
                        <a href="#">
                          <img
                            src="img/android.png"
                            alt="ios"
                            className="app_stor img-fluid ml-3"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="logos2 p70 pb-2 pb-md-5 mb-md-2 text-center">
              <h5 className="mb-4 mb-md-5 ttu">Available at</h5>
              <Slider {...settings}>
                {/* <marquee behavior="scroll"> */}
                {/* <div> */}
                <div style={{ margin: "0 10px", display: "inline-block" }}>
                  <img className="img-fluid" src="img/at0.png" alt="at0.png" />
                </div>
                <div style={{ margin: "0 10px", display: "inline-block" }}>
                  <img className="img-fluid" src="img/at1.png" alt="at0.png" />
                </div>
                <div style={{ margin: "0 10px", display: "inline-block" }}>
                  <img className="img-fluid" src="img/at2.png" alt="at0.png" />
                </div>
                <div style={{ margin: "0 10px", display: "inline-block" }}>
                  <img className="img-fluid" src="img/at3.png" alt="at0.png" />
                </div>
                <div style={{ margin: "0 10px", display: "inline-block" }}>
                  <img className="img-fluid" src="img/at4.png" alt="at0.png" />
                </div>
                <div style={{ margin: "0 10px", display: "inline-block" }}>
                  <img className="img-fluid" src="img/at5.png" alt="at0.png" />
                </div>
                <div style={{ margin: "0 10px", display: "inline-block" }}>
                  <img className="img-fluid" src="img/at6.png" alt="at0.png" />
                </div>
                <div style={{ margin: "0 10px", display: "inline-block" }}>
                  <img className="img-fluid" src="img/at7.png" alt="at0.png" />
                </div>
                <div style={{ margin: "0 10px", display: "inline-block" }}>
                  <img
                    className="img-fluid"
                    src="img/at8.png"
                    alt="binance-logo.png"
                  />
                </div>
              </Slider>
              {/* </marquee> */}
            </section>
            {/* <RegisterUser /> */}
            <section className="ex_box p70">
              <div className="container  position-relative">
                <div className="ex_box_in position-relative box pl-lg-5 pr-lg-5">
                  <div className="row align-items-center">
                    <div className="col-md-4  m-auto">
                      <img
                        src="img/token.png"
                        alt="token "
                        className="img-fluid token_logo"
                      />
                    </div>
                    <div className="col-md-6 col-lg-5  ">
                      <div className="text-center lh70 mb-4">
                        <h6 className="h1 mb-0">Signup Now </h6>
                        <h6 className="t_gr h1"> for Exclusive Offers</h6>
                      </div>
                      <div className="form-group ex_input_box position-relative">
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter  User Name"
                          class="input_item"
                          value={name}
                          onChange={handleChange}
                        />
                        <span className="text-danger">{nameErr}</span>
                      </div>
                      <div className="form-group ex_input_box position-relative">
                        <input
                          type="text"
                          name="email"
                          placeholder="Enter  Email"
                          class="input_item"
                          value={email}
                          onChange={handleChange}
                        />
                        <span className="text-danger">{emailErr}</span>
                      </div>
                      <div className="form-group ex_input_box position-relative">
                        <PhoneInput
                          key={"phoneInput"}
                          country="IND"
                          value={mobile_number}
                          onChange={handleOnChanges}
                          className="input_item"
                          placeholder="Email/Mobile"
                          countryCodeEditable={false}
                          enableSearch={true}
                          inputProps={{
                            autoFocus: true,
                            name: "mobile_number",
                          }}
                          // disabled={disableGetCode}
                        />
                        <span className="text-danger">{mobile_numberErr}</span>
                      </div>
                      <div className>
                        <button className="btn w100" onClick={registerHandler}>
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="faq p70 text-center"
              data-scroll-index={5}
              id="faq"
              ref={faqRef}
            >
              <div className="container ">
                <h2 className="hadding">
                  Frequently asked <span className="t_gr">Questions</span>
                </h2>
                <div className="row ">
                  <div className="col-lg-10 m-auto">
                    <div
                      className="accordion md-accordion style-2"
                      id="accordionEx"
                      role="tablist"
                      aria-multiselectable="true"
                    >
                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingOne1"
                        >
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordionEx"
                            href="#collapseOne1"
                            aria-expanded="true"
                            aria-controls="collapseOne1"
                          >
                            What is Gas WIzard?
                          </a>
                        </div>
                        {/* Card body */}
                        <div
                          id="collapseOne1"
                          className="collapse "
                          role="tabpanel"
                          aria-labelledby="headingOne1"
                          data-parent="#accordionEx"
                        >
                          <div className="card-body">
                            Gas Wizard is the solution to the surge of gas
                            prices, partnering with the leading retail oil and
                            gas distributors in the world, allowing users to
                            access discounts on petrol and charging rates.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingTwo2"
                        >
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordionEx"
                            href="#collapseTwo2"
                            aria-expanded="false"
                            aria-controls="collapseTwo2"
                          >
                            What is the utility of the GWIZ token?
                          </a>
                        </div>
                        <div
                          id="collapseTwo2"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingTwo2"
                          data-parent="#accordionEx"
                        >
                          <div className="card-body">
                            GWIZ token is the native token of Gas Wizard
                            ecosystem that will be listed on DEX and CEX and its
                            utility is fundamental for the development of the
                            project as GWIZ will be the currency powering the
                            Gas Wizard app.
                          </div>
                        </div>
                      </div>

                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingTwo4"
                        >
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordionEx"
                            href="#collapseTwo4"
                            aria-expanded="false"
                            aria-controls="collapseTwo4"
                          >
                            How long is the presale?&nbsp;
                          </a>
                        </div>
                        <div
                          id="collapseTwo4"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingTwo2"
                          data-parent="#accordionEx"
                        >
                          <div className="card-body">
                            {" "}
                            The presale is structured into 10 stages with the
                            price of the tokens set to increase after every
                            single stage sells out.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingTwo5"
                        >
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordionEx"
                            href="#collapseTwo5"
                            aria-expanded="false"
                            aria-controls="collapseTwo5"
                          >
                            What payment methods are accepted for purchasing
                            GWIZ tokens? &nbsp;{" "}
                          </a>
                        </div>
                        <div
                          id="collapseTwo5"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingTwo5"
                          data-parent="#accordionEx"
                        >
                          <div className="card-body">
                            {" "}
                            The platform currently accepts payments in ETH, BNB
                            and other cryptocurrencies.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingTwo6"
                        >
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordionEx"
                            href="#collapseTwo6"
                            aria-expanded="false"
                            aria-controls="collapseTwo6"
                          >
                            When do I receive my tokens?
                          </a>
                        </div>
                        <div
                          id="collapseTwo6"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingTwo6"
                          data-parent="#accordionEx"
                        >
                          <div className="card-body">
                            {" "}
                            The tokens sold during the presale stages are
                            protected via vesting contract. Investors will
                            receive 20% of their tokens before we launch on DEX.
                            The rest of the tokens are going to be airdropped on
                            a monthly basis. Check the whitepaper for the token
                            distribution release.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingTwo61"
                        >
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordionEx"
                            href="#collapseTwo61"
                            aria-expanded="false"
                            aria-controls="collapseTwo61"
                          >
                            Is there any tax added to the token?
                          </a>
                        </div>
                        <div
                          id="collapseTwo61"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingTwo61"
                          data-parent="#accordionEx"
                        >
                          <div className="card-body">
                            {" "}
                            No buy or sell tax is applicable to your tokens.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingTwo62"
                        >
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordionEx"
                            href="#collapseTwo62"
                            aria-expanded="false"
                            aria-controls="collapseTwo62"
                          >
                            Are there any bonuses for purchasing GWIZ&nbsp;
                            tokens during presale?&nbsp; &nbsp;
                          </a>
                        </div>
                        <div
                          id="collapseTwo62"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingTwo62"
                          data-parent="#accordionEx"
                        >
                          <div className="card-body">
                            {" "}
                            Yes, there is a bonus for early investors. Get in
                            touch with our team to find out if you are eligible
                            for the bonus.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingTwo63"
                        >
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordionEx"
                            href="#collapseTwo63"
                            aria-expanded="false"
                            aria-controls="collapseTwo63"
                          >
                            What is the minimum purchase amount?
                          </a>
                        </div>
                        <div
                          id="collapseTwo63"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingTwo63"
                          data-parent="#accordionEx"
                        >
                          <div className="card-body">
                            {" "}
                            The minimum purchase amount for GWIZ tokens is $50.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingTwo64"
                        >
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordionEx"
                            href="#collapseTwo64"
                            aria-expanded="false"
                            aria-controls="collapseTwo64"
                          >
                            Can I receive my tokens in my CEX wallet?
                          </a>
                        </div>
                        <div
                          id="collapseTwo64"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingTwo64"
                          data-parent="#accordionEx"
                        >
                          <div className="card-body">
                            {" "}
                            No, GWIZ tokens must be received in a DeFi wallet to
                            ensure compatibility with the token's architecture.
                            Once GWIZ will be listed on a centralised exchange
                            you’ll be able to hold your tokens there.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingTwo65"
                        >
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordionEx"
                            href="#collapseTwo65"
                            aria-expanded="false"
                            aria-controls="collapseTwo65"
                          >
                            What network is&nbsp; Gas Wizard deployed on?
                          </a>
                        </div>
                        <div
                          id="collapseTwo65"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingTwo65"
                          data-parent="#accordionEx"
                        >
                          <div className="card-body">
                            {" "}
                            The GWIZ token is deployed on the Ethereum
                            blockchain.
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div
                          className="card-header"
                          role="tab"
                          id="headingTwo66"
                        >
                          <a
                            className="collapsed"
                            data-toggle="collapse"
                            data-parent="#accordionEx"
                            href="#collapseTwo66"
                            aria-expanded="false"
                            aria-controls="collapseTwo66"
                          >
                            What is the strategy for unsold tokens?
                          </a>
                        </div>
                        <div
                          id="collapseTwo66"
                          className="collapse"
                          role="tabpanel"
                          aria-labelledby="headingTwo66"
                          data-parent="#accordionEx"
                        >
                          <div className="card-body">
                            {" "}
                            5% of unsold tokens will be burned during community
                            events. The rest of the tokens will be added to the
                            rewards pool.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <Footer
            scrollTobuynow={scrollTobuynow}
            scrollToAbout={scrollToAbout}
          />
        </div>
      </div>
    </>
  );
};
