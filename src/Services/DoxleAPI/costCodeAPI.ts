import axios, { AxiosError } from "axios";
import { Costcode, NewCostCode, Stage } from '../../Models/costcode';

import { offline, baseAddress } from "../../Services/settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { checkErrorType, HandleAxiosError, IAxiosErrorReturnType } from "../ErrorHandling/ErrorHandler";

interface GetParams {
  projectId: string;
  orderBy?: string;
  page?: number;
}

const getList = async ({projectId, orderBy = "title", page = 1}: GetParams, accessToken: string|undefined)  => {
  // Get's a list of costcodes for a given project selected with project Id
  // Order costcode with orderBy, options =  title, startDate, endDate
  // Pagination 100 costcodes per result - call for next page when scrolling
//   let result: Costcode[] = []
  let result: Costcode[] = []
  if (offline){ return result }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }
  try {
    let params = { project: projectId, ordering: orderBy, page: page}
    const response = await axios.get(
        "http://"+baseAddress+"/costcode/",
        {
          headers: { Authorization: "Bearer " + accessToken },
          params: params
        }
    )
    //   result = response.data.results as Array<Costcode>;
    result = response.data.results as Array<Costcode>;

  } catch (error:any) {
      console.error("costCodeAPI.getList",error)
      if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
      console.warn("RESPONSE", error?.response)
      console.warn("RESPONSE DATA", error?.response?.data)
      console.warn("REQUEST", error?.request)
  }
  return result
}


const getStagedList = async ({projectId, orderBy = "title", page = 1}: GetParams, accessToken: string|undefined)  => {
  // Get's a list of costcodes for a given project selected with project Id
  // Order costcode with orderBy, options =  title, startDate, endDate 
  // Pagination 100 costcodes per result - call for next page when scrolling
//   let result: Costcode[] = []
  let result: Stage[] = []
  // if (offline){ result = dummy.costCodeListResponse.results; return result }
  // const accessToken: string =await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }
  try {
      let params = { project: projectId, ordering: "stage", page: page}
      const response = await axios.get(
        "http://"+baseAddress+"/costcode/",
        {
            headers: { Authorization: "Bearer " + accessToken },
            params: params
        }
      )
    //   result = response.data.results as Array<Costcode>;
      result = response.data.results as Array<Stage>;

  } catch (error:any) {
      console.error("costCodeAPI.getStagedList",error)
      if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
      console.warn("RESPONSE", error?.response)
      console.warn("RESPONSE DATA", error?.response?.data)
      console.warn("REQUEST", error?.request)
  }
  return result
}

const getDetailed = async (costCodeId: string, accessToken: string|undefined)  => {
  interface IResult{
        data: Costcode | undefined
        error: undefined | IAxiosErrorReturnType | "STOCK_ERROR"
    }
  // Gets one costcode only using the costcode's UUID
  // At this stage there is no additional information from the detailed
  // Future back end change will mean this call will get storage, specs, comments with this call
  let result: IResult = {data: undefined, error:undefined}
  if (offline){ /* result = dummy.costCodeFullResponse;*/ return result}
  // const accessToken: string = await AsyncStorage.getItem("access_token") || ""
  if (!accessToken){ throw "AccessTokenNotFound" }

  try {
    const response = await axios.get(
      "http://"+baseAddress+"/costcode/detail/"+costCodeId+"/",
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    )
    result = response.data ? {...result,data:response.data as Costcode} :{...result,data:undefined}
  } catch (error:any) {
      console.error("costCodeAPI.getDetailed",error)
      if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
      console.warn("RESPONSE", error?.response)
      console.warn("RESPONSE DATA", error?.response?.data)
      console.warn("REQUEST", error?.request)
  }
    return result
}

const remove = async (costCodeId: string, accessToken: string|undefined)  => {
  let result: boolean = false;
  if (offline){ result = true; return result }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || ""
  if (!accessToken) { throw "AccessTokenNotFound" }

  try {
    if (offline){ return {} }
    // const accessToken: string = await AsyncStorage.getItem("access_token") || ""
    if (!accessToken){ throw "AccessTokenNotFound" }

    const response = await axios.delete(
      "http://"+baseAddress+"/costcode/"+costCodeId+"/",
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    )
    result = response.status === 204;
  } catch (error:any) {
      console.error("costCodeAPI.remove",error)
      if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
      console.warn("RESPONSE", error?.response)
      console.warn("RESPONSE DATA", error?.response?.data)
      console.warn("REQUEST", error?.request)
  }
  return result
}

const add = async (costCode: NewCostCode, accessToken: string|undefined)  => {
  // Add a new costcode
  let result: Costcode | undefined = undefined;
  if (offline){ return result; }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) { throw "AccessTokenNotFound" }
  try {
    const response = await axios.post(
      "http://"+baseAddress+"/costcode/",
      costCode,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    )
    result = response.data as Costcode
  } catch (error:any) {
      console.error("costCodeAPI.add",error)
      if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
      console.warn("RESPONSE", error?.response)
      console.warn("RESPONSE DATA", error?.response?.data)
      console.warn("REQUEST", error?.request)
  }
  return result
}


interface UpdateBody {  
  title?: string;
  budget?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  income?: boolean;
  locked?: boolean;
  budgetOverride?: boolean;
  completed?: boolean;
  assignedUsers?: string[];
  assignedContractor?: string|null;
}

const update = async (
  costCodeId: string, 
  { title, budget, startDate, endDate, status, income, locked, budgetOverride, completed, assignedUsers, assignedContractor}: UpdateBody,
  accessToken: string|undefined
) => {
  // Update one or more property of a costcode without affecting other values
  let result: Costcode | undefined;
  if (offline){ return result }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }
  try {
    let body: UpdateBody = {}
    if (title) {body.title = title;}
    if (budget) {body.budget = budget;}
    if (startDate) {body.startDate = startDate;}
    if (endDate) {body.endDate = endDate;}
    if (status) {body.status = status;}
    if (income) {body.income = income;}
    if (locked) {body.locked = locked;}
    if (budgetOverride) {body.budgetOverride = budgetOverride;}
    if (assignedUsers) {body.assignedUsers = assignedUsers;}
    if (typeof assignedContractor !== "undefined") {body.assignedContractor = assignedContractor;}
    if (typeof completed === 'boolean') {body.completed = completed;}
    
    const response = await axios.patch(
      "http://"+baseAddress+"/costcode/"+costCodeId+"/",
      body,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    )
    result = response.data as Costcode;

  } catch (error:any) {
      console.error("costCodeAPI.update",error)
      if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
  }
  return result
}

const CostCodeAPI = {
  getList,
  getStagedList,
  getDetailed,
  remove,
  update,
  add,
};

export default CostCodeAPI