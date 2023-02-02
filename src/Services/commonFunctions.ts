import CompanyAPI from "./DoxleAPI/companyAPI";
import ProjectAPI from "./DoxleAPI/projectAPI";
import { Company } from "../Models/company";
import { ProjectInterface } from "../Models/project";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Costcode } from "../Models/costcode";
import { ScheduleItem } from "../Models/schedules";

const getFirstCompany= async (accessToken: string|undefined) => {
    let currentCompany: Company;
    const result: string|null = await AsyncStorage.getItem("currentCompany")
    if (result) {
        currentCompany = JSON.parse(result || '{}');
    } else {
        let companies:Company[] = await CompanyAPI.getList(accessToken)
        currentCompany = companies?.[0];
        if (currentCompany) AsyncStorage.setItem("currentCompany", JSON.stringify(currentCompany));
        if (currentCompany?.companyId) AsyncStorage.setItem("currentCompanyId", currentCompany.companyId);
    }
    return currentCompany
}

const getFirstProject = async (accessToken: string|undefined) => {
    let currentProject: ProjectInterface | null;
    let result: string|null = await AsyncStorage.getItem("currentProject")
    if (result) {
        currentProject = JSON.parse(result || '{}');
    } else {
        const currentCompany: Company = await getFirstCompany(accessToken);
        const companyId: string = currentCompany?.companyId;
        const projects = await ProjectAPI.getList({company: companyId}, accessToken) as ProjectInterface[];
        currentProject = projects?.[0] ? projects[0] : null;
        if (currentProject) AsyncStorage.setItem("currentProject", JSON.stringify(currentProject));
        if (currentProject?.projectId) AsyncStorage.setItem("currentProjectId", currentProject.projectId);

        if (currentProject?.projectPrefix) AsyncStorage.setItem("projectPrefix", currentProject.projectPrefix);
        else if (currentProject?.siteAddress) AsyncStorage.setItem("projectPrefix", currentProject.siteAddress.replace(/ /g, '').substring(0, 7).toUpperCase());
    }
    return currentProject
}

async function  getProjectAddress(){
  let result: any
  let siteAddress:string =""
  await AsyncStorage.getItem("currentProject").then(res=>result=res).catch(err=>{})
  if (result) {
    const currentProject = JSON.parse(result || '{"siteAddress": "Project Not Found"}')
    siteAddress = currentProject?.siteAddress
 }
 return siteAddress
}

const Common = {
    getFirstCompany,
    getFirstProject,
    getProjectAddress
}

interface IType{
    type: "costcode" | "schedule"
    itemChecked: any
}
function instanceOfCostcode(object: any): object is Costcode {
    return ("status" in object) && ("assignedUsers" in object) && ("accountTrackingId" in object) &&("completed" in object) &&("locked" in object)  &&("income" in object)&&("budgetOverride" in object)&&("endDate" in object) &&("startDate" in object)  &&("budget" in object) &&("title" in object)&&("costCodeId" in object) 
}

function instanceOfScheduleItem(object: any): object is ScheduleItem{
return ("scheduleId" in object)  && ("project" in object)  && ("title" in object)&& ("startDate" in object)&& ("endDate" in object)&& ("completed" in object)&& ("assignedUsers" in object) && (!("costCodeId" in object))
}
export const checkInstanceType= ({type,itemChecked}: IType)=>{
    if (type=== "costcode"){
         return instanceOfCostcode(itemChecked)
        
    }
    else if (type === "schedule"){
        return instanceOfScheduleItem(itemChecked)
    }
    
}
export default Common