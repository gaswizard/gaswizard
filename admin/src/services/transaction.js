import { BaseUrl } from "../Constent/baseUrl";
import * as opsService from "./Ops";

const getTransaction = async (data, token) => {
  let result = await opsService.getData(BaseUrl + "/get-transaction", data, token);

  return result;
};


export { getTransaction };
