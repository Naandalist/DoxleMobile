import axios, { AxiosError } from "axios";
import { Bill, BillLine } from '../../Models/bill';
import { offline, baseAddress } from "../settings";
// import dummy from './dummyData';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkErrorType, HandleAxiosError, IAxiosErrorReturnType } from "../ErrorHandling/ErrorHandler";


interface GetParams {
  costCodeId: string,
  orderBy?: string
  page?: number,
}

const getList = async ({costCodeId, orderBy = "number", page = 1}: GetParams, accessToken: string|undefined)  => {
  // Get's a list of costcodes for a given project selected with project Id
  // Order costcode with orderBy, options =  title, startDate, endDate 
  // Pagination 100 costcodes per result - call for next page when scrolling
  let result: Bill[] = []
  if (offline){ /* result = dummy.billsListResponse.results ;*/ return result; }
  if (!accessToken) throw "AccessTokenNotFound"
  try {
    let params = { cost_code: costCodeId, ordering: orderBy, page: page}
    const response = await axios.get(
      "http://"+baseAddress+"/bill/",
      {
        headers: { Authorization: "Bearer " + accessToken },
        params: params
      }
    )
    result = response.status === 200 ? response.data.results as Array<Bill> : [];
  } catch (error:any) {
    console.error("billAPI.getList",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
}

const getDetailed = async (billId: string, accessToken: string|undefined)  => {
  // Gets one costcode only using the costcode's UUID
  // At this stage there is no additional information from the detailed
  // Future back end change will mean this call will get storage, specs, comments with this call
  let result: Bill | undefined = undefined;
  if (offline){ /*result = dummy.billFullResponse;*/return result;}
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }
  try {
    const response = await axios.get(
      "http://"+baseAddress+"/bill/"+billId+"/",
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    )
    result = response.status === 200 ? response.data as Bill : undefined;
  } catch (error:any) {
    console.error("billAPI.getDetailed",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
    console.warn("RESPONSE", error?.response)
    console.warn("RESPONSE DATA", error?.response?.data)
    console.warn("REQUEST", error?.request)
  }
  return result
}

const remove = async (billId: string, accessToken: string|undefined)  => {
  /// Permanently delete costcode by uuid
  interface response {success: boolean; orders: number}
  let result ={success: false, orders: 0}
  if (offline){result.success = true; return result; }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }
  try {
    const response = await axios.delete(
      "http://"+baseAddress+"/bill/"+billId+"/",
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    )
    result.success = response.status === 200
    result.orders = !isNaN(response.data.orders as number) ? response.data.orders : 0;
  } catch (error:any) {
    console.error("billAPI.remove",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
  }
  return result
}


const add = async (bill: Bill, accessToken: string|undefined)  => {
  interface Result{bill: Bill; orders: number}
  let result: Result | undefined = undefined
  if (offline){ return result; }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }
  try {
    if (!bill.lines) {return result}
    let subTotal: number = 0;
    let validLines: BillLine[] = []
    for (let l =0; l < bill.lines.length; l++){
      if (!bill.lines[l].description || bill.lines[l].description.replaceAll(' ', '') === "") continue;
      bill.lines[l].billLineId = ""
      bill.lines[l].lineCost = Math.round(parseFloat(bill.lines[l].quantity as string) * parseFloat(bill.lines[l].itemCost as string) *10000) / 10000
      subTotal += bill.lines[l].lineCost
      validLines.push(bill.lines[l])
    }
    bill.lines = validLines;
    bill.subTotal = Math.round(subTotal * 100) / 100;
    bill.tax = Math.round(bill.subTotal * 10) / 100;
    bill.total = Math.round((bill.subTotal + bill.tax) * 100) / 100;
    bill.issueDate = new Date().toISOString().substring(0, 10)
    bill.history = [{
      index: 0,
      shortText: "Bill Created",
      longText: "New bill created for "+bill.supplier+" to the value of "+bill.total,
      timeStamp: new Date().toString(),
    }]

    //fix issues with djangorestframework_camel_case
    let newBill: any = bill
    newBill.cost_code = bill.costCode
    newBill.cost_code = bill.costCode

    // Add a new bill
    const response = await axios.post(
      // "http://3.26.150.72:8000/bill/new/",
      "http://"+baseAddress+"/bill/new/",
      bill,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    )
    result = response.status === 201 ? {bill: response.data.bill as Bill, orders: response.data.orders as number} : undefined;
  } catch (error:any) {
    console.error("billAPI.add",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
  }
  return result
}


interface UpdateBody {  
  number?: string;
  dueDate?: string;
  issueDate?: string;
  emailSent?: boolean;
  supplier?: string;
  accepted?: boolean;
  internalNotes?: string;
  specialConditions?: string;
  status?: string;
  abSupplier?: string;
  lines?: BillLine[];
  history?: any[];
  subTotal?: number;
  tax?: number;
  total?: number;
  reference?: string;
  startDate?: string;
  endDate?: string;
  paymentTerms?: string|number;
  paymentTermsSuffix?: "Days"|"NET"|"EOM";
  damages?: string;
  damagesPeriod?: "Day"|"Week"|"Month";
}

const update = async (
  billId: string, 
  billHistoryLength: number,
  {
      number,
      issueDate,
      dueDate,
      supplier,
      accepted,
      internalNotes,
      specialConditions,
      status,
      abSupplier,
      lines,
      emailSent,
      reference,
      startDate,
      endDate,
      paymentTerms,
      paymentTermsSuffix,
      damages,
      damagesPeriod
  }: UpdateBody,
  accessToken: string|undefined
) => {
  interface Result{bill: Bill; orders: number}
  let result: Result | undefined = undefined
  if (offline){ return result; }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }

  // Update one or more property of a costcode without affecting other values
  try {
    let body: any = {}
    let editText: string = ""
    if (number) {
      body.number = number;
      editText += "Bill Number changed to "+number+"\n";
    }
    if (issueDate) {
      body.issueDate = issueDate.substring(0, 10);
      editText += "Bill issueDate changed to "+issueDate+"\n";
    }
    if (dueDate) {
      body.dueDate = dueDate.substring(0, 10);
      editText += "Bill dueDate changed to "+dueDate+"\n";
    }
    if (supplier) {
      body.supplier = supplier;
      editText += "Bill supplier changed to "+supplier+"\n";
    }
    if (abSupplier !== undefined) {
      body.abSupplier = abSupplier
    }
    if (reference) {
      body.reference = reference;
      editText += "Bill reference changed to "+reference+"\n";
    }
    if (accepted !== undefined) {
      body.accepted = accepted;
      if (accepted) { editText += "Bill marked as accepted\n"; }
      else { editText += "Bill marked as unaccepted\n"; }
    }
    if (emailSent !== undefined) {
      body.emailSent = emailSent;
      if (emailSent) { editText += "Bill marked as sent\n"; }
      else { editText += "Bill marked as unsent\n"; }
    }
    if (internalNotes) {
      body.internalNotes = internalNotes;
      editText += "Internal notes were edited\n";
    }
    if (specialConditions) {
      body.specialConditions = specialConditions;
      editText += "General notes were edited\n";
    }
    if (status) {
      body.status = status;
      editText += "Bill status changed to "+status+"\n";
    }
    if (startDate  !== undefined ) {
      body.startDate = startDate;
      editText += "Bill start date changed to "+startDate+"\n";
    }
    if (endDate !== undefined ) {
      body.endDate = endDate;
      editText += "Bill end date changed to "+endDate+"\n";
    }
    if (paymentTerms) {
      body.paymentTerms = paymentTerms;
      editText += "Bill payment terms changed to "+paymentTerms+"\n";
    }
    if (paymentTermsSuffix) {
      body.paymentTermsSuffix = paymentTermsSuffix;
      editText += "Bill payment terms changed to "+paymentTermsSuffix+"\n";
    }
    if (damages) {
      body.damages = damages;
      editText += "Bill damage rate changed to "+damages+"\n";
    }
    if (damagesPeriod) {
      body.damagesPeriod = damagesPeriod;
      editText += "Bill damage rate changed to "+damagesPeriod+"\n";
    }
    if (abSupplier) {body.abSupplier = abSupplier;}
    let subTotal: number = 0;
    if (lines) {
      body.lines = [] as any;
     
      for (var l =0; l < lines.length; l++){
        if (!lines[l].description || lines[l].description.replaceAll(' ', '') === "") continue;
        const quantity: number = !isNaN(parseFloat(lines[l].quantity as string)) ? parseFloat(lines[l].quantity as string) : 0
        const itemCost: number = !isNaN(parseFloat(lines[l].itemCost as string)) ? parseFloat(lines[l].itemCost as string) : 0
        const lineCost = itemCost * quantity;
        
        body.lines.push({
          index: lines[l].index,
          description: lines[l].description,
          item_cost: Math.round(itemCost*10000) / 10000,
          item_formula: "",
          quantity: Math.round(quantity*10000) / 10000,
          quantity_formula: "",
          line_cost: Math.round(lineCost*10000) / 10000,
          ticked: lines[l].ticked,
          unit: lines[l].unit
        })
        subTotal += lineCost
      }
      body.subTotal = Math.round(subTotal * 100) / 100;
      body.tax = Math.round(body.subTotal * 10) / 100;
      body.total = Math.round((body.subTotal + body.tax)*100) / 100;
      editText += "Bill lines edited; new total = $"+body.total+"\n";
      
    }
    body.history = [{
      index: billHistoryLength + 1, 
      short_text: "Bill Edited",
      long_text: editText,
      time_stamp: new Date().toString(),
      // userName: string
    }]

   
    const response = await axios.patch(
      // "http://3.26.150.72:8000/bill/"+billId,
      "http://"+baseAddress+"/bill/"+billId+"/",
      body,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    )
    result = response.status === 200 ? {bill: response.data.bill as Bill, orders: response.data.orders as number} : undefined;

  } catch (error:any) {
    console.error("billAPI.update",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
  }
  return result
}


const getPDF = async (billId: string, accessToken: string|undefined) => {
  interface IResult{
    data: string |undefined
    error: undefined | IAxiosErrorReturnType | "STOCK_ERROR"
  }
  let result: IResult = {data: undefined, error:undefined}
  if (offline){ return result; }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }
  try{
    const response = await axios.get(
        // "http://3.26.150.72:8000/bill/"+billId,
        "http://"+baseAddress+"/bill/pdf/"+billId+"/",
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
    )
    if (response.data) result= {...result, data:response.data }
    // result = response.data as string
  } catch (error:any) {
    console.error("billAPI.getPDF",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
  }
  return result
}


interface emailDetails{
  toEmails: string[];
  ccEmails: string[];
  emailSubject: string;
  emailBody: string;
  emailAttachments?: string[]
}

const sendEmail = async (billId: string, emailDetails: emailDetails, accessToken: string|undefined) => {
  let result: boolean = false
  if (offline){ return result; }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken){ throw "AccessTokenNotFound" }
  try{
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    emailDetails.toEmails.forEach((emailAddress) => {if (!emailReg.test(emailAddress)) return result})
    emailDetails.ccEmails.forEach((emailAddress) => {if (!emailReg.test(emailAddress)) return result})
    const response = await axios.post(
        // "http://3.26.150.72:8000/bill/"+billId,
        "http://"+baseAddress+"/bill/email/"+billId+"/",
        emailDetails,
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
    )
    result = response.status === 200
  } catch (error:any) {
    console.error("billAPI.sendEmail",error)
    if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
  }
  return result
}

const BillAPI = {
  getList,
  getDetailed,
  remove,
  update,
  add,
  getPDF,
  sendEmail,
};

export default BillAPI