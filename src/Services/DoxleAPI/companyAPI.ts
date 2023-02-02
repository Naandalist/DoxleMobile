import axios from "axios"
import { Company } from '../../Models/company';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { offline, baseAddress } from "../settings";
// import dummy from './dummyData';


const getList = async (accessToken: string|undefined)  => {
    let result: Company[] = []
    if (offline) return result
    // const accessToken: string = await AsyncStorage.getItem("access_token") || ""
    if (!accessToken){ throw "AccessTokenNotFound" }
    try {
        const response = await axios.get(
            "http://"+baseAddress+"/company/",
            {
                headers: { Authorization: "Bearer " + accessToken },
                params: {ordering: "name"}
            }
        )
        result = response.data.results as Array<Company>;
    } catch (error:any) {
        console.error("companyAPI.getList",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}

const getDetailed = async (companyId: string, accessToken: string|undefined)  => {
  // Gets one project only using the project's UUID
  // At this stage there is no additional information from the detailed
  // Future back end change will mean this call will get coordinates, users, ?costcodes?
  let result: Company | undefined = undefined;
  if (offline) return result
  // const accessToken: string = await AsyncStorage.getItem("access_token") || ""
  if (!accessToken){ throw "AccessTokenNotFound" }
  try {
    const response = await axios.get(
      "http://"+baseAddress+"/company/detail/"+companyId+"/",
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    )
    result = response.data.results as Company;
  } catch (error:any) {
      console.error("companyAPI.getDetailed",error)
      if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
      console.warn("RESPONSE", error?.response)
      console.warn("RESPONSE DATA", error?.response?.data)
      console.warn("REQUEST", error?.request)
  }
    return result
}

  interface UpdateBody {  
    name?: string, 
    phone?: string, 
    email?: string, 
    companyAbn?: string,
    addressL1?: string,
    addressL2?: string,
    addressCity?: string,
    addressPostCode?: string,
    addressState?: string,
    addressCountry?: string,
    logo?: string,
  }

const update = async (
    companyId: string,
    {
        name,
        phone,
        email,
        companyAbn,
        addressL1,
        addressL2,
        addressCity,
        addressPostCode,
        addressState,
        addressCountry,
        logo,
    }: UpdateBody,
    accessToken: string|undefined
)  => {
    // Update one or more property of a company without affecting other values
    let result: Company | undefined = undefined;
    if (offline){ return result }
    // const accessToken: string = await AsyncStorage.getItem("access_token") || ""
    if (!accessToken){ throw "AccessTokenNotFound" }
    try {
      let body: UpdateBody = {}
      if (name) {body.name = name;}
      if (phone) {body.phone = phone;}
      if (email) {body.email = email;}
      if (companyAbn) {body.companyAbn = companyAbn;}
      if (addressL1) {body.addressL1 = addressL1;}
      if (addressL2) {body.addressL2 = addressL2;}
      if (addressCity) {body.addressCity = addressCity;}
      if (addressPostCode) {body.addressPostCode = addressPostCode;}
      if (addressState) {body.addressState = addressState;}
      if (addressCountry) {body.addressCountry = addressCountry;}
      if (logo) {body.logo = logo;}
      const response = await axios.patch(
        "http://"+baseAddress+"/company/"+companyId+"/",
        body,
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      )
      result = response.data.results as Company;
    } catch (error:any) {
        console.error("companyAPI.update",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}

const CompanyAPI = {
  getList,
  getDetailed,
  update,
};

export default CompanyAPI
