const express = require("express");
const trxCtrl = require("../controller/transaction");
const VerifyToken = require("../middleware/VerifyToken");
const router = express.Router();

router.post("/transaction", VerifyToken, trxCtrl.trnsactionAdd);
router.post("/transaction-get", trxCtrl.getTransaction);
router.post("/trx-apply", trxCtrl.metaRequestInsert);
router.get("/get-total-usdt", trxCtrl.getTransactionTotal);
router.get("/get-transaction",VerifyToken, trxCtrl.TransactionData);

module.exports = router;
