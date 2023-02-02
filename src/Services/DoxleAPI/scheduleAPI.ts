import {baseAddress, offline} from "../../settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {Costcode} from "../../Models/costcode";
import {ScheduleItem} from "../../Models/schedules";
import { User } from "../../Models/user";

interface GetParams {
    project?: string
    start?: string,
    days?: number,
}

const getList = async (
    { project, start = new Date().toISOString().substring(0, 10), days = 14}: GetParams,
    accessToken: string|undefined
)  => {
    // Get's a list of projects for a given company selected with companyId
    // Order projects with orderBy, options =  site_address, start_date, project_status
    // Pagination 100 costcodes per result - call for next page when scrolling
    interface Result{
        costCodes: Costcode[];
        scheduleItems: ScheduleItem[]
    }
    let result: Result = {'costCodes': [], 'scheduleItems': []}
    if (offline) return result;
    // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
    if (!accessToken){
        throw "AccessTokenNotFound"
    }

    try {
        let getParams: GetParams = {days: days};
        if (project) {getParams.project = project;}
        const response = await axios.get(
            "http://"+baseAddress+"/schedule/",
            {
                headers: { Authorization: "Bearer " + accessToken },
                params: getParams
            }
        )
        if (response.status === 200) result =  response.data as Result;

    } catch (error:any) {
        console.error("scheduleAPI.getList",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}

interface UpdateBody {
    title?: string;
    startDate?: string;
    endDate?: string;
    completed?: boolean;
    assignedUsers?:string[] ;
    assignedContractor?: string|null;
}

const update = async (
    scheduleId: string,
    { title, startDate, endDate, completed, assignedUsers, assignedContractor}: UpdateBody,
    accessToken: string|undefined
)  => {
       
    let result: ScheduleItem|undefined = undefined;
    if (offline){ return result }
    // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
    if (!accessToken){ throw "AccessTokenNotFound" }
    try {
        let body: UpdateBody = {}
        if (title) {body.title = title;}
        if (startDate) {body.startDate = startDate;}
        if (endDate) {body.endDate = endDate;}
        if (assignedUsers) {body.assignedUsers = assignedUsers;}
        if (typeof assignedContractor !== "undefined") {body.assignedContractor = assignedContractor;}
        if (typeof completed === 'boolean') {body.completed = completed;}
       
        const response = await axios.patch(
            "http://"+baseAddress+"/schedule/"+scheduleId+"/",
            body,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        )
        result = response.data as ScheduleItem;

    } catch (error:any) {
        console.error("scheduleAPI.update",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}

const remove = async (scheduleId: string, accessToken: string|undefined)  => {
    let result: boolean = false;
    if (offline){ return true }
    // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
    if (!accessToken){ throw "AccessTokenNotFound" }
    try {
        const response = await axios.delete(
            "http://"+baseAddress+"/schedule/"+scheduleId+"/",
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        )
        result = response.status === 204;

    } catch (error:any) {
        console.error("scheduleAPI.remove",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}

const add = async (newScheduleItem: ScheduleItem, accessToken: string|undefined)  => {
    let result: ScheduleItem|undefined;
    if (offline){ return undefined }
    // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
    if (!accessToken){ throw "AccessTokenNotFound" }
    try {
        const response = await axios.post(
            "http://"+baseAddress+"/schedule/",
            newScheduleItem,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        )
        if (response.status === 201) result = response.data as ScheduleItem

    } catch (error:any) {
        console.error("scheduleAPI.add",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}

const ScheduleAPI = {
    getList,
    update,
    remove,
    add
};

export default ScheduleAPI