import axios from "axios";
import { Note, NewNote } from '../../Models/note';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { offline, baseAddress } from "../settings";


const getList = async (accessToken: string|undefined, projectId?: string, costCodeId?: string)  => {
    let result: Note[] = []
    if (offline){return result}
    // const accessToken: string = await AsyncStorage.getItem("access_token") || ""
    if (!accessToken){ throw "AccessTokenNotFound" }
    try {
        let params: any = {}
        if (projectId) params.project = projectId
        else if (costCodeId) params.cost_code = costCodeId
        else throw ' Missing projectId or CostCodeId'
        const response = await axios.get(
            "http://"+baseAddress+"/notes/",
            {
                headers: { Authorization: "Bearer " + accessToken },
                params: params
            }
        )
        result = response.data.results as Array<Note>;

    } catch (error:any) {
        console.error("noteAPI.getList",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}

const getDetailed = async (noteId: string, accessToken: string|undefined)  => {
    let result: Note | undefined = undefined;
    if (offline){ return result}
    // const accessToken: string = await AsyncStorage.getItem("access_token") || ""
    if (!accessToken){ throw "AccessTokenNotFound" }

    try {
        const response = await axios.get(
            "http://"+baseAddress+"/notes/"+noteId+"/",
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        )
        result = response.data as Note;
    } catch (error:any) {
        console.error("noteAPI.getDetailed",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}

const remove = async (noteId: string, accessToken: string|undefined)  => {
    let result: boolean = false
    if (offline){return result}
    // const accessToken: string = await AsyncStorage.getItem("access_token") || ""
    if (!accessToken){ throw "AccessTokenNotFound" }
    try {
        const response = await axios.delete(
            "http://"+baseAddress+"/notes/"+noteId+'/',
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        )
        result = response.status === 204;
    } catch (error:any) {
        console.error("noteAPI.remove",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}

const add = async (newNote: NewNote, accessToken: string|undefined)  => {
    //if (offline){ return dummy.newDummyCostCode(notice); }
    // Add a new costcode
    let result: Note | undefined = undefined
    if (offline){return result}
    // const accessToken: string = await AsyncStorage.getItem("access_token") || ""
    if (!accessToken){ throw "AccessTokenNotFound" }

    try {
        let note:any = {
            title: newNote.title,
            body: newNote.body,
            created: new Date().toISOString(),
            createdBy: newNote.userId,
            lastModified: new Date().toISOString(),
            lastModifiedBy: newNote.userId
        }
        if (newNote.project) note.project = newNote.project
        else if (newNote.costCode) note.costCode = newNote.costCode
        const response = await axios.post(
            "http://"+baseAddress+"/notes/",
            note,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        )
        result = response.status === 201 ? response.data as Note : undefined;
    } catch (error:any) {
        console.error("noteAPI.add",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}


interface UpdateBody {
    title?: string;
    body?: string;
    userId: string;
}

interface Payload {
    title?: string;
    body?: string;
    lastModifiedBy: string;
    lastModified: string;
}

const update = async (
    noteId: string,
    { title, body, userId}: UpdateBody,
    accessToken: string|undefined
) => {
    // Update one or more property of a notice without affecting other values
    // Only pass in what is needed to be updated
    let result: Note | undefined = undefined
    if (offline){return result}
    // const accessToken: string = await AsyncStorage.getItem("access_token") || ""
    if (!accessToken){ throw "AccessTokenNotFound" }

    try {
        let payload: Payload = {
            lastModifiedBy: userId,
            lastModified: new Date().toISOString()
        }
        if (title) {payload.title = title;}
        if (body) {payload.body = body;}
        const response = await axios.patch(
            "http://"+baseAddress+"/notes/"+noteId+"/",
            payload,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        )
        result = response.status === 200 ? response.data as Note: undefined;
    } catch (error:any) {
        console.error("noteAPI.update",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}

const NoteAPI = {
    getList,
    getDetailed,
    remove,
    update,
    add,
};

export default NoteAPI