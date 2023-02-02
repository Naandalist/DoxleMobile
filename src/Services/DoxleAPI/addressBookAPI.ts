import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { offline, baseAddress } from "../../settings";
import {
  AddressBookCompany,
  AddressBookContact,
} from "../../Models/addressBook";
import { Company } from "../../Models/company";
import { Alert } from "react-native";

interface GetParams {}

//GET THE LIST OF ALL ADDRESS BOOK COMPANIES
const getList = async (companyId: string | undefined, accessToken: string|undefined) => {
  if (!accessToken) {
    throw "AccessTokenNotFound";
  }
  let result: AddressBookCompany[] = [];
  try {
    
    let params: any = {};
    if (companyId) params.company = companyId;
    const url = "http://" + baseAddress + "/ab/company/";
    const response = await axios.get(url, {
      headers: { Authorization: "Bearer " + accessToken },
      params: params,
    });
    if (response?.data?.results)
      result = response.data.results as AddressBookCompany[];
  } catch (error:any) {
    console.error("addressBookAPI.getList",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
};

//ADDS A NEW ADDRESS BOOK COMPANY
const add = async (addressBookCompany: AddressBookCompany, accessToken: string|undefined) => {
 
  let result: AddressBookCompany | undefined = undefined;
  if (offline) {
    return result;
  }
  if (!accessToken) {
    throw "AccessTokenNotFound";
  }

  try {
    // //* SOCKET REQUEST
    // SocketService.sendMessage(addressBookCompany);

    // //* HTTP REQUEST
    const response = await axios.post(
      "http://" + baseAddress + "/ab/company/",
      addressBookCompany,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );

    result =
      response.status === 201
        ? (response.data as AddressBookCompany)
        : undefined;

  } catch (error:any) {
    console.error("addressBookAPI.add",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
};

interface UpdateBody {
  companyName?: string;
  companyAbn?: string;
  email?: string;
  phone?: string;
  timeStamp?: string;
}

//UPDATE ADDRESS BOOK COMPANY
const update = async (
  companyId: string | undefined,
  addressBookCompany: AddressBookCompany,
  accessToken: string|undefined
) => {
 
  // Update one or more property of a company without affecting other values
  // Only pass in what is needed to be updated
  let result: Company | undefined = undefined;
  if (offline) {
    return result;
  }
  if (!accessToken) {
    throw "AccessTokenNotFound";
  }

  try {
    const response = await axios.patch(
      "http://" + baseAddress + "/ab/company/" + companyId + "/",
      addressBookCompany,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    result = response.status === 200 ? (response.data as Company) : undefined;
    
  } catch (error:any) {
    console.error("addressBookAPI.update",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
};

//DELETE ADDRESS BOOK COMPANY
const remove = async (addressBookCompanyId: string | undefined, accessToken: string|undefined) => {
  /// Permanently delete ab company by uuid
  let result: boolean = false;
  if (offline) {
    return result;
  }
  if (!accessToken) {
    throw "AccessTokenNotFound";
  }
  try {
    const response = await axios.delete(
      "http://" + baseAddress + "/ab/company/" + addressBookCompanyId + "/",
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    result = response.status === 204;
  } catch (error:any) {
    console.error("addressBookAPI.remove",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
};

//GET THE LIST OF ALL ADDRESS BOOK COMPANIES
const getContactList = async (accessToken: string|undefined) => {
  if (!accessToken) throw "AddressBookContact - AccessTokenNotFound";
  let result: AddressBookContact[] = []
  try {
    const url = "http://" + baseAddress + "/ab/contact/";
    const response = await axios.get(url, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    result = response.data["results"] as AddressBookContact[];
  } catch (error:any) {
    console.error("addressBookAPI.getContactList",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
};

//ADDS A NEW ADDRESS BOOK CONTACT
const addContact = async (addressBookContact: AddressBookContact, accessToken: string|undefined) => {
  let result: AddressBookContact | undefined = undefined;
  if (offline) return result;
  if (!accessToken) throw "AccessTokenNotFound";
  try {
    const response = await axios.post(
      "http://" + baseAddress + "/ab/contact/",
      addressBookContact,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    result =
      response.status === 201
        ? (response.data as AddressBookContact)
        : undefined;
  } catch (error:any) {
    console.error("addressBookAPI.addContact",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
};

//UPDATE ADDRESS BOOK CONTACT
const updateContact = async (
  contactId: string | undefined,
  addressBookContact: AddressBookContact,
  accessToken: string|undefined
) => {
  // Update one or more property of a contact without affecting other values
  // Only pass in what is needed to be updated
  let result: Company | undefined = undefined;
  if (offline) return result;
  if (!accessToken) throw "AccessTokenNotFound";
  try {
    const response = await axios.patch(
      "http://" + baseAddress + "/ab/contact/" + contactId + "/",
      addressBookContact,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    result = response.status === 200 ? (response.data as Company) : undefined;
  } catch (error:any) {
    console.error("addressBookAPI.updateContact",error)
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
};

//DELETE ADDRESS BOOK CONTACT
const removeContact = async (contactId: string | undefined, accessToken: string|undefined) => {
  /// Permanently delete ab contact by uuid
  let result: boolean = false;
  if (offline) return result;
  if (!accessToken) throw "AccessTokenNotFound";
  try {
    const response = await axios.delete(
      "http://" + baseAddress + "/ab/contact/" + contactId + "/",
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    result = response.status === 204;
  } catch (error:any) {
    console.error("addressBookAPI.removeContact",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
  }
  return result
};

const AddressBookAPI = {
  getList,
  add,
  update,
  remove,
  getContactList,
  addContact,
  updateContact,
  removeContact,
};

export default AddressBookAPI;
