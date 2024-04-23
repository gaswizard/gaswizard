import * as opsService from "../Ops";

import {
  getCodeApi,
  checkOTPApi,
  getCodeLoginApi,
  getLoginApi,
  checkUserApi,signupUserApi
} from "../../Constant/Api";

const getCode = async (data, token) => {
  let result = await opsService.postdata(getCodeApi, data, token);

  return result;
};
const checkOTP = async (data, token) => {
  let result = await opsService.postdata(checkOTPApi, data, token);

  return result;
};
const getCodeLogin = async (data, token) => {
  let result = await opsService.postdata(getCodeLoginApi, data, token);

  return result;
};
const getLogin = async (data, token) => {
  let result = await opsService.postdata(getLoginApi, data, token);

  return result;
};
const checkUser = async (data, token) => {
  let result = await opsService.postdata(checkUserApi, data, token);

  return result;
};
const signupUser = async (data, token) => {
  let result = await opsService.postdata(signupUserApi, data, token);

  return result;
};

export { getCode, checkOTP, getCodeLogin, getLogin, checkUser,signupUser };
