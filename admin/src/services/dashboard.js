import { BaseUrl } from "../Constent/baseUrl";
import * as opsService from "./Ops";




const dashboardData = async (data, token) => {
 
  let result = await opsService.getData(BaseUrl + "/dashboard-data", data, token);
  return result;
};
const userData = async (data, token) => {

  let result = await opsService.getData(BaseUrl + "/user-data", data, token);
  return result;
};



export {
  dashboardData,
  userData,

};
