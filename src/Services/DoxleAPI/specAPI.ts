import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { offline, baseAddress } from "../settings";
import {Specification} from "../../Models/specification";
import {Image} from "../../Models/image";
import { Costcode } from "../../Models/costcode";
import { Alert } from "react-native";

const getList = async (costCodeId:string, accessToken: string|undefined)  => {
  // !if (offline){ return dummy.billsListResponse.results; }
  // Get's a list of costcodes for a given project selected with project Id
  // Order costcode with orderBy, options =  title, startDate, endDate 
  // Pagination 100 costcodes per result - call for next page when scrolling
  let result: Specification[] = []
  if (offline){ return result; }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }
  try {
    let params = { cost_code: costCodeId}
    const response = await axios.get(
      "http://"+baseAddress+"/specifications/",
      {
        headers: { Authorization: "Bearer " + accessToken },
        params: params
      }
    )
    result = response.status === 200 ? response.data.results as Specification[] : [];
  } catch (error:any) {
    console.error("specAPI.getList",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
}

const addSpec = async (spec: Specification, accessToken: string|undefined)  => {
  // Get's a list of costcodes for a given project selected with project Id
  // Order costcode with orderBy, options =  title, startDate, endDate 
  // Pagination 100 costcodes per result - call for next page when scrolling
  let result: Specification | undefined = undefined;
  if (offline){ return result}
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }

  try {
    const response = await axios.post(
      "http://"+baseAddress+"/specifications/new/", spec,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    )
    result = response.status == 201 ? response.data : undefined
  } catch (error:any) {
    console.error("specAPI.addSpec",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
}

interface UpdateBody {  
  title?: string, 
  description?: string,
  index?: number;
  images?: Image[];
  approved?: boolean;
  timestamp?: string;
  costCode?: Costcode;
}

const updateSpec = async (
    specId: string,
    { title, description, index, images, approved, timestamp, costCode}: UpdateBody,
    accessToken: string|undefined
)  => {
  let result: Specification | undefined = undefined;
  if (offline){ return result }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }

  try {
    let body: UpdateBody = {}
    if (title) {body.title = title;}
    if (description) {body.description = description;}
    if (index) {body.index = index;}
    if (images) {body.images = images;}
    if (approved) {body.approved = approved;}
    if (timestamp) {body.timestamp = timestamp;}
    if (costCode) {body.costCode = costCode;}
    const response = await axios.patch(
        "http://"+baseAddress+"/specifications/"+specId+"/", body,
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
    )
    result = response.status == 200 ? response.data: undefined;

  } catch (error:any) {
    console.error("specAPI.updateSpec",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
}


const addSpecImages = async (
    specId: string,
    files: Blob[],
    setProgress: Function,
    selectedProjectId:string,
    companyId:string,
    costcodeTitle:string,
    accessToken: string|undefined
)  => {
  interface Result {images: Image[]; errors: string[]}
  let result:Result = {images: [], errors: []}
  console.log("FILE INSIDE API:",files)
  if (offline) { return result}
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }
  
  try {
   
    const formData = new FormData();
    formData.append("company", companyId);
    formData.append("project", selectedProjectId);
    formData.append("costCodeTitle", costcodeTitle);
    formData.append("specificationId", specId);
    files.forEach((file:Blob) => formData.append(`images`, file))

    const response = await axios.post(
        "http://"+baseAddress+"/specifications/img/", formData,
        {
          headers: { Authorization: "Bearer " + accessToken ,
         
          'content-type': 'multipart/form-data',
        },
          onUploadProgress: progressEvent =>
          {
           if (progressEvent.total)
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
          }}
    )
    result.images = response.status == 201 || response.status == 207 ? response.data.images as Image[] : []
    result.errors = response.status == 207 ? response.data.errors as string[] : []
  } catch (error:any) {
    console.error("specAPI.addSpecImages",error)
    console.warn(error?.response)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
}

const removeSpec = async (specId: string, accessToken: string|undefined)  => {
  let result:boolean = false;
  if (offline){ return result}
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }
  try {
    const response = await axios.delete(
        "http://"+baseAddress+"/specifications/"+specId+"/",
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
    )
    result = response.status == 204;
  } catch (error:any) {
    console.error("specAPI.removeSpec",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
  }
  return result
}

const removeSpecImage = async (imageId: string, accessToken: string|undefined)  => {
  let result:boolean = false;
  if (offline){ return result}
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }

  try {
    const response = await axios.delete(
        "http://"+baseAddress+"/specifications/img/"+imageId+"/",
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
    )
    result = response.status == 204;
  } catch (error:any) {
    console.error("specAPI.removeSpecImage",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
  }
  return result
}


const specAPI = {
  getList,
  addSpec,
  addSpecImages,
  updateSpec,
  removeSpec,
  removeSpecImage
}

export default specAPI