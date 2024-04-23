import * as opsService from "./Ops";

import { BaseUrl } from "../Constent/baseUrl";

const loginAdmin = async (data) => {
  let result = await opsService.postdata(BaseUrl + "/login-admin", data);
  return result;
};

export { loginAdmin };
