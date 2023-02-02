import axios from "axios"
import { ProjectInterface, NewProject } from '../../Models/project';

import { offline, baseAddress } from "../settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

interface GetParams {
	company?: string
	ordering?: string,
}

const getList = async ({company, ordering = "site_address"}: GetParams, accessToken: string|undefined)  => {
	// Get's a list of projects for a given company selected with companyId
	// Order projects with orderBy, options =  site_address, start_date, project_status
	// Pagination 100 costcodes per result - call for next page when scrolling
	let result: ProjectInterface[] = []
	
	if (offline) return result;
	
	// const accessToken: string = await AsyncStorage.getItem("access_token") || "";

	if (!accessToken || accessToken===""){
		throw "AccessTokenNotFound"
	}

	try {
		
		let getParams: GetParams = {ordering: ordering};
		if (company) {getParams.company = company;}

		const response = await axios.get(
			"http://"+baseAddress+"/project/",
			{
				headers: { Authorization: "Bearer " + accessToken },
				params: getParams
			}
		)
		result = response.status === 200 ? response.data.results as ProjectInterface[]: [];

	} catch (error:any) {
		console.error("projectAPI.getList",error)
		if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
		console.warn("RESPONSE", error?.response)
		console.warn("RESPONSE DATA", error?.response?.data)
		console.warn("REQUEST", error?.request)
	}
	return result
}

const getDetailed = async (projectId: any, accessToken: string|undefined)  => {
	// Gets one project only using the project's UUID
	// At this stage there is no additional information from the detailed
	// Future back end change will mean this call will get coordinates, users, ?costcodes?
	let result: ProjectInterface | undefined = undefined;
	if (offline) return result;
	// const accessToken: string = await AsyncStorage.getItem("access_token") || "";
	if (!accessToken){
		throw "AccessTokenNotFound"
	}

	try {
		const response = await axios.get(
			"http://"+baseAddress+"/project/detail/"+projectId+"/",
			{
				headers: { Authorization: "Bearer " + accessToken },
			}
		)
		result = response.status === 200 ? response.data as ProjectInterface: undefined;
	} catch (error:any) {
		console.error("projectAPI.getDetailed",error)
		if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
		console.warn("RESPONSE", error?.response)
		console.warn("RESPONSE DATA", error?.response?.data)
		console.warn("REQUEST", error?.request)
	}
	return result
}

const remove = async (projectId: string, accessToken: string|undefined)  => {
	/// Permanently delete project by uuid
	let result: boolean = false;
	if (offline){
		result = true; return result
	}
	// const accessToken: string = await AsyncStorage.getItem("access_token") || "";
	if (!accessToken){
		throw "AccessTokenNotFound"
	}

	try {
		const response = await axios.delete(
			"http://"+baseAddress+"/project/"+projectId+"/",
			{
				headers: { Authorization: "Bearer " + accessToken },
			}
		)

		result = response.status === 204
	} catch (error:any) {
		console.error("projectAPI.remove",error)
		if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
		console.warn("RESPONSE", error?.response)
		console.warn("RESPONSE DATA", error?.response?.data)
		console.warn("REQUEST", error?.request)
	}
	return result
}

const add = async (project: NewProject, accessToken: string|undefined)  => {
	// Add a new project
	let result: ProjectInterface | undefined = undefined
	if (offline){return result}
	// const accessToken: string = await AsyncStorage.getItem("access_token") || "";
	if (!accessToken){
		throw "AccessTokenNotFound"
	}
	project.budget = project.budget.replaceAll('$','').replaceAll(',','')
	project.contractPrice = project.contractPrice.replaceAll('$','').replaceAll(',','')
	try {
		const response = await axios.post(
			"http://"+baseAddress+"/project/",
			project,
			{
				headers: { Authorization: "Bearer " + accessToken },
			}
		)
		result = response.status === 201 ? response.data as ProjectInterface : undefined

	} catch (error:any) {
		console.error("projectAPI.add",error)
		if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
		console.warn("RESPONSE", error?.response)
		console.warn("RESPONSE DATA", error?.response?.data)
		console.warn("REQUEST", error?.request)
	}
	return result
}

interface UpdateBody {
	siteAddress?: string;
	contractPrice?: number;
	budget?: number;
	startDate?: string;
	endDate?: string;
	projectPrefix?: string;
	ownerIsCompany?: boolean;
	projectStatus?: string; // Options: 'AC' = 'Active'; 'AR' = 'Archive'; 'TN' = 'Tender'; 'TM' = 'Template'
	ownerName?: string;
	ownerAbn?: string;
	ownerEmail?: string;
	ownerPhone?: string;
}

const update = async (
	projectId: string,
	{
		siteAddress,
		contractPrice,
		budget,
		startDate,
		endDate,
		projectStatus,
		projectPrefix,
		ownerName,
		ownerAbn,
		ownerEmail,
		ownerPhone
	}: UpdateBody,
	accessToken: string|undefined
)  => {
	// Update one or more property of a project without affecting other values
	let result: ProjectInterface | undefined = undefined
	if (offline){
		return result
	}
	// const accessToken: string = await AsyncStorage.getItem("access_token") || "";
	if (!accessToken){
		throw "AccessTokenNotFound"
	}

	try {
		let body: UpdateBody = {}
		if (siteAddress) {body.siteAddress = siteAddress;}
		if (contractPrice) {body.contractPrice = contractPrice;}
		if (budget) {body.budget = budget;}
		if (startDate) {body.startDate = startDate;}
		if (endDate) {body.endDate = endDate;}
		if (projectStatus) {body.projectStatus = projectStatus;}
		if (ownerName) {body.ownerName = ownerName;}
		if (ownerAbn) {body.ownerAbn = ownerAbn;}
		if (ownerEmail) {body.ownerEmail = ownerEmail;}
		if (ownerPhone) {body.ownerPhone = ownerPhone;}
		if (projectPrefix) {body.projectPrefix = projectPrefix;}

		const response = await axios.patch(
			"http://13.211.137.10/project/"+projectId+"/",
			body,
			{
				headers: { Authorization: "Bearer " + accessToken },
			}
		)
		result = response.status === 200 ? response.data.results as ProjectInterface: undefined;

	} catch (error:any) {
		console.error("projectAPI.update",error)
		if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
	}
	return result
}

const ProjectAPI = {
	getList,
	getDetailed,
	remove,
	update,
	add,
};

export default ProjectAPI