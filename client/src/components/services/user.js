import * as opsService from "./Ops";

import { registerApi } from "../Constant/Api";

const registerUser = async (data) => {
  let result = await opsService.postdata(registerApi, data);
  return result;
};

export { registerUser };
