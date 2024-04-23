import * as opsService from "./Ops";

import { getProfileApi, updateProfileApi,generateKeyApi } from "../Constant/Api";

const getProfile = async (data, token) => {
  let result = await opsService.getData(getProfileApi, data, token);

  return result;
};
const updateProfile = async (data, token) => {
  let result = await opsService.postdata(updateProfileApi, data, token);

  return result;
};
const generateKey = async (data, token) => {
  let result = await opsService.getData(generateKeyApi, data, token);

  return result;
};

export { getProfile, updateProfile,generateKey };
