import {
    Comment,
    NewComment
} from "../../Models/comments";
import {baseAddress, offline} from "../settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios, { AxiosError } from "axios";
import { checkErrorType, HandleAxiosError, IAxiosErrorReturnType } from "../ErrorHandling/ErrorHandler";

const add = async (comment: NewComment, accessToken: string|undefined )  => {
    interface IResult{
        data: Comment | undefined
        error: undefined | IAxiosErrorReturnType | "STOCK_ERROR"
    }
    // Add a new project
    let result: IResult = {data: undefined, error:undefined}
    if (offline){ return result}
    // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
    if (!accessToken){ throw "AccessTokenNotFound" }
    try {
        const response = await axios.post(
            "http://"+baseAddress+"/comments/",
            comment,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        )
        result = response.status === 201 ? {...result,data:response.data as Comment}  : {...result,data:undefined}
    } catch (error:any) {
        console.error("commentAPI.add",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}


interface UpdateBody {
    commentText?: string;
    pinned?: boolean;
    taggedUsers?: string[];
}

const update = async (commentId: string, comment: UpdateBody, accessToken: string|undefined)  => {
    // Add a new project
    let result: Comment | undefined = undefined
    if (offline){ return result}
    // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
    if (!accessToken){ throw "AccessTokenNotFound" }
    try {
        let body: UpdateBody = {}
        if (comment.commentText){body.commentText = comment.commentText}
        if (comment.pinned !== undefined){body.pinned = comment.pinned}
        if (comment.taggedUsers){body.taggedUsers = comment.taggedUsers}
        const response = await axios.patch(
            "http://"+baseAddress+"/comments/"+commentId+"/",
            body,
            {
                headers: {
                    Authorization: "Bearer " + accessToken,

                },
            }
        )
        result = response.status === 200 ? response.data as Comment : undefined
    } catch (error:any) {
        console.error("commentAPI.update",error)
        if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
        console.warn("RESPONSE", error?.response)
        console.warn("RESPONSE DATA", error?.response?.data)
        console.warn("REQUEST", error?.request)
    }
    return result
}
const getList = async (filter: string, id: string, accessToken: string|undefined) => {
    interface IResult{
        data: Comment[] 
        error: undefined | IAxiosErrorReturnType | "STOCK_ERROR"
    }
  // Add a new project
  let result: IResult = {data: [], error:undefined}
  if (offline) return result;
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) throw "AccessTokenNotFound";
  try {
    const response = await axios.get(
        `http://${baseAddress}/comments/?${filter}=${id}`,
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
    );
    result = response.status === 200 ?{...result,data:response.data.results as Comment[]}  : {...result,data:[]}
  } catch (error:any) {
      console.error("commentAPI.getList",error)
      if (error?.status === 401 || error?.response?.status === 401 ) throw "AuthenticationFailure"
      console.warn("RESPONSE", error?.response)
      console.warn("RESPONSE DATA", error?.response?.data)
      console.warn("REQUEST", error?.request)
  }
  return result
};

const CommentAPI = {
    update,
    add,
    getList
};

export default CommentAPI