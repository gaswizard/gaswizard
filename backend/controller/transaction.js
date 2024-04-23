const db = require("../config/db");
var cron = require("node-cron");
const Web3 = require("web3");
const { Contract, JsonRpcProvider } = require("ethers");
const {
  bscRpcUrl,
  gasWizardAddress,
  gasWizardabi,
} = require("../constent/index");
const {
  chainType,
  bnbCurrencyType,
  ethersCurrencyType,
} = require("../config/enum");
cron.schedule(" */1 * * * *", () => {
  // console.log("cron");
  checkTrxCron();
});
function executeQuery(query, params = "") {
  let param = JSON.parse(params);

  return new Promise((resolve, reject) => {
    db.query(query, param, (err, result) => {
      if (err) {
        console.log(err, "err");
        // reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

exports.trnsactionAdd = async (req, res) => {
  const { chain, currency, amount, tokenAmount, status } = req.body;
  try {
    let chains;
    let currencys;

    const tAmt = Number(tokenAmount).toFixed(4);
    if (chain == chainType.binance) {
      chains = "Binance smart chain";
      if (currency == bnbCurrencyType.BNB) {
        currencys = "BNB";
      } else if (currency == bnbCurrencyType.WBTC) {
        currencys = "WBTC (BEP20)";
      } else if (currency == bnbCurrencyType.WETH) {
        currencys = "WETH (BEP20)";
      } else if (currency == bnbCurrencyType.USDT) {
        currencys = "USDT (BEP20)";
      } else if (currency == bnbCurrencyType.USDC) {
        currencys = "USDC (BEP20)";
      }
    } else {
      chains = "Ethereum";
      if (currency == ethersCurrencyType.ETHEREUM) {
        currencys = "ETHEREUM";
      } else if (currency == ethersCurrencyType.WBTC) {
        currencys = "WBTC (ERC20)";
      } else if (currency == ethersCurrencyType.USDT) {
        currencys = "USDT (ERC20)";
      } else if (currency == bnbCurrencyType.USDC) {
        currencys = "USDC (ERC20)";
      }
    }

    const query =
      "INSERT INTO transactions (user_id,chain, currency,amount,token_amount,status) VALUES (?,?,?,?, ?,?)";
    const params = [
      req.loginUserId,
      chains,
      currencys,
      amount,
      tAmt,
      "Success",
    ];

    const checkQueryResult = await executeQuery(query, JSON.stringify(params));
    const user = checkQueryResult;

    if (user) {
      return res.send({
        status: true,
        message: "Transaction success",
        data: user,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.send({
      status: false,
      message: "Internal server error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const query =
      "SELECT * FROM transactions WHERE wallet_address=? ORDER BY id DESC";
    const params = [req.body.address];

    const checkQueryResult = await executeQuery(query, JSON.stringify(params));
    const user = checkQueryResult;

    const query1 =
      "SELECT SUM(token_amount) AS amount FROM transactions WHERE wallet_address=?";
    const params1 = [req.body.address];

    const checkQueryResult1 = await executeQuery(
      query1,
      JSON.stringify(params1)
    );
    const user1 = checkQueryResult1[0];

    const resulttt = await liveUsdtPrice();

    if (resulttt) {
      const amounts = user1.amount * Number(resulttt);
      if (!user) {
        return res.send({
          status: false,
          message: "Transaction not found",
        });
      }
      if (user) {
        return res.send({
          status: true,
          message: "Transaction found",
          data: user,
          amount: parseInt(amounts),
          tokenAmt: parseInt(user1.amount),
        });
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.send({
      status: false,
      message: "Internal server error",
    });
  }
};

// ============= metarequest =================//

exports.metaRequestInsert = async (req, res) => {
  const {
    chain,
    userAddress,
    currency,
    trans_id,
    amount,
    tokenAmount,
    status,
  } = req.body;
  const query = `INSERT INTO metarequests (wallet_address,chain,currency,trans_id,amount,tokenAmount,status) VALUES (?,?,?,?,?,?,?)`;
  const params = [
    userAddress,
    chain,
    currency,
    trans_id,
    amount,
    tokenAmount,
    "Pending",
  ];
  const result = await executeQuery(query, JSON.stringify(params));

  if (result) {
    return res.send({
      status: true,
      message: "Transaction is processed please wait for 20 second...",
    });
  }
};

const checkTrxCron = async () => {
  try {
    const query = "SELECT * FROM metarequests WHERE status = ? LIMIT 5";
    const params1 = ["Pending"];

    const sqlRun = await executeQuery(query, JSON.stringify(params1));

    for (let i = 0; i < sqlRun.length; i++) {
      const transactionHandled = await handleTransaction(sqlRun[i]);
      if (transactionHandled) {
      } else {
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const handleTransaction = async (transaction) => {
  const Web3 = require("web3");
  try {
    if (transaction.checkCount >= 6) {
      await markTransactionFailed(transaction);
      return false;
    } else {
      let checkUrl;

      if (transaction.chain == chainType.binance) {
        // checkUrl =
        //   "https://wiser-old-wildflower.bsc-testnet.discover.quiknode.pro/a17c196f848795c42d0000e1e2e4146ea3ca7001/";
        checkUrl = "https://bsc-dataseed.binance.org/";
      } else {
        // checkUrl =
        //   "https://eth-sepolia.g.alchemy.com/v2/YGEEV9ZGfLjKyyzpeylflyqDg3oR8oSl";
        checkUrl =
          "https://eth-mainnet.g.alchemy.com/v2/nVpIG2OHDIPeP2UZECaBGBre5DGtADDE";
      }

      var httpWeb3 = new Web3(new Web3.providers.HttpProvider(checkUrl));
      let txEthResp;
      if (transaction.currency == "0") {
        txEthResp = await httpWeb3.eth.getTransaction(transaction.trans_id);
      } else {
        txEthResp = await httpWeb3.eth.getTransactionReceipt(
          transaction.trans_id
        );
      }

      if (transaction.checkCount >= 6) {
        if (!txEthResp || txEthResp.status !== true) {
          await markTransactionFailed(transaction);
          return false;
        }
      }

      const log = txEthResp.logs;
   

      let data;
      let amount;

      if (transaction.chain == chainType.binance) {
        if (transaction.currency == "0") {
          amount = txEthResp.value / 10 ** 18;
        } else {
          amount = log[0].data / 10 ** 18;
        }

        //  else if (transaction.currency == "1") {
        //    data = log[0].data;
        //    amount = data / 10 ** 18;
        //  }
        // else if (
        //   transaction.currency == "2" ||
        //   transaction.currency == "3" ||
        //   transaction.currency == "4"
        // ) {
        //   data = log[0].data;
        //   amount = data / 10 ** 6;
        // }
      } else {
        if (transaction.currency == "0") {
          amount = txEthResp.value / 10 ** 18;
        } else if (transaction.currency == "1") {
          data = log[0].data;
          amount = data / 10 ** 8;
        } else if (transaction.currency == "2" || transaction.currency == "3") {
          data = log[0].data;
          amount = data / 10 ** 6;
        }
      }
      let trxId;
      if (transaction.currency == "0") {
        trxId = txEthResp.hash;
      } else {
        trxId = txEthResp.transactionHash;
      }

      const from = txEthResp.from;
      const chain = transaction.chain;
      const currency = transaction.currency;
      const user_id = transaction.user_id;
      const tokenAmount = transaction.tokenAmount;
      const address = transaction.wallet_address;

      if (amount == transaction.amount) {
        await completeTrx(
          user_id,
          chain,
          currency,
          from,
          trxId,
          amount,
          tokenAmount,
          transaction,
          address
        );
        const updateQuery =
          "UPDATE metarequests SET status = ?, checkCount = ? WHERE id = ?";
        const params = [
          "Success",
          Number(transaction.checkCount) + 1,
          transaction.id,
        ];
        await executeQuery(updateQuery, JSON.stringify(params));
        return true;
      } else {
        let data;
        let amount;
        if (transaction.chain == chainType.binance) {
          if (transaction.currency == "0") {
            amount = txEthResp.value / 10 ** 18;
          } else {
            data = log[1].data;
            amount = data / 10 ** 18;
          }
        } else {
          if (transaction.currency == "0") {
            amount = txEthResp.value / 10 ** 18;
          } else {
            data = log[1].data;
            amount = data / 10 ** 18;
          }
        }

        if (amount == transaction.amount) {
          await completeTrx(
            user_id,
            chain,
            currency,
            from,
            trxId,
            amount,
            tokenAmount,
            transaction,
            address
          );
          const updateQuery =
            "UPDATE metarequests SET status = ?, checkCount = ? WHERE id = ?";
          const params = [
            "Success",
            Number(transaction.checkCount) + 1,
            transaction.id,
          ];

          await executeQuery(updateQuery, JSON.stringify(params));

          return true;
        }
      }

      await markTransactionPending(transaction);

      return false;
    }
  } catch (error) {
    console.error(error);
    if (transaction.checkCount >= 6) {
      await markTransactionFailed(transaction);
      return false;
    } else {
      await markTransactionPending(transaction);
      return false;
    }
  }
};

const markTransactionFailed = async (transactionId) => {
  const updateQuery =
    "UPDATE metarequests SET status = ?, checkCount = ? WHERE id = ?";
  const params = [
    "Failed",
    Number(transactionId.checkCount) + 1,
    transactionId.id,
  ];

  await executeQuery(updateQuery, JSON.stringify(params));
};

const markTransactionPending = async (transactionId) => {
  const updateQuery =
    "UPDATE metarequests SET status = ?, checkCount = ? WHERE id = ?";
  const params = [
    "Pending",
    Number(transactionId.checkCount) + 1,
    transactionId.id,
  ];

  await executeQuery(updateQuery, JSON.stringify(params));
};

const completeTrx = async (
  user_id,
  chain,
  currency,
  from,
  trxId,
  amount,
  tokenAmount,
  transaction,
  address
) => {
  try {
    const currentDate = new Date();
    const date = currentDate / 1000;
    let chains;
    let currencys;
    const tAmt = Number(tokenAmount).toFixed(4);
    if (chain == chainType.binance) {
      chains = "Binance smart chain";
      if (currency == bnbCurrencyType.BNB) {
        currencys = "BNB";
      } else if (currency == bnbCurrencyType.WBTC) {
        currencys = "WBTC (BEP20)";
      } else if (currency == bnbCurrencyType.WETH) {
        currencys = "WETH (BEP20)";
      } else if (currency == bnbCurrencyType.USDT) {
        currencys = "USDT (BEP20)";
      } else if (currency == bnbCurrencyType.USDC) {
        currencys = "USDC (BEP20)";
      }
    } else {
      chains = "Ethereum";
      if (currency == ethersCurrencyType.ETHEREUM) {
        currencys = "ETHEREUM";
      } else if (currency == ethersCurrencyType.WBTC) {
        currencys = "WBTC (ERC20)";
      } else if (currency == ethersCurrencyType.USDT) {
        currencys = "USDT (ERC20)";
      } else if (currency == bnbCurrencyType.USDC) {
        currencys = "USDC (ERC20)";
      }
    }
    const queryInsert =
      "INSERT INTO transactions (user_id,chain,	currency,amount,trans_id,token_amount,wallet_address,status) VALUES (?,?, ?,?, ?, ?, ?, ?)";
    const paramsInsert = [
      user_id,
      chains,
      currencys,
      amount,
      trxId,
      tAmt,
      address,
      "Success",
    ];
    await executeQuery(queryInsert, JSON.stringify(paramsInsert));
  } catch (error) {
    console.error(error);
    return { status: false, data: {}, message: "An error occurred" };
  }
};

// ==================metarequest=================//
exports.TransactionData = async (req, res) => {
  try {
    const query = "SELECT * FROM transactions ORDER BY id DESC";
    const params = [];

    const checkQueryResult = await executeQuery(query, JSON.stringify(params));

    if (checkQueryResult.length > 0) {
      return res.send({
        status: true,
        message: "Transaction data found successfully",
        data: checkQueryResult,
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.send({
      status: false,
      message: "Internal server error",
    });
  }
};
const liveUsdtPrice = async () => {
  const provider = new JsonRpcProvider(bscRpcUrl);
  const contract = new Contract(gasWizardAddress, gasWizardabi, provider);
  const result = await contract.allPrice();

  let bnbPrice = Number(result[0]); //bnbPRice

  let tokenPrice = Number(result[1]);
  let tokenPriceDecimalVal = Number(result[2]);
  let tokenPriceDecimal = Math.pow(10, tokenPriceDecimalVal);
  let price = tokenPrice / tokenPriceDecimal;
  let priceLatest = Number(price)
    .toFixed(tokenPriceDecimalVal)
    .replace(/\.?0+$/, "");
  return priceLatest;
};
exports.getTransactionTotal = async (req, res) => {
  try {
    const query1 = "SELECT SUM(token_amount) AS amount FROM transactions";
    const params1 = [];

    const checkQueryResult1 = await executeQuery(
      query1,
      JSON.stringify(params1)
    );
    const resulttt = await liveUsdtPrice();
    if (resulttt) {
      const amounts = checkQueryResult1[0].amount * Number(resulttt);

      if (checkQueryResult1) {
        return res.send({
          status: true,
          message: "Transaction found",

          amount: Number(amounts),
          tokenAmt: Number(checkQueryResult1[0].amount),
        });
      }
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.send({
      status: false,
      message: "Internal server error",
    });
  }
};
