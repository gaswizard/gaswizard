import * as opsService from "./Ops";

import { addTrxApi, getTransactionApi,metaRequestInsertApi,getTotalUsdtApi } from "../Constant/Api";

const transactionAdd = async (data, token) => {
  let result = await opsService.postdata(addTrxApi, data, token);

  return result;
};

const getTransaction = async (data, token) => {
  let result = await opsService.postdata(getTransactionApi, data, token);

  return result;
};
const metaRequestInsert = async (data, token) => {
  let result = await opsService.postdata(metaRequestInsertApi, data, token);

  return result;
};
const getTotalUsdt = async (data, token) => {
  let result = await opsService.getData(getTotalUsdtApi, data, token) ;

  return result;
};


export { transactionAdd, getTransaction,metaRequestInsert,getTotalUsdt };
