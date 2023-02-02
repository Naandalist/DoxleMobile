import axios, {AxiosError} from 'axios';
import {Permit} from '../../Models/permit';
import {baseAddress, offline} from '../settings';

const getList = async (
  projectId: string | null,
  noticeId: string | null,
  costCodeId: string | null,
  accessToken: string | undefined,
) => {
  // console.log("getList")
  interface IResult {
    data: Permit[] | undefined;
    error: undefined | string;
  }

  let result: IResult = {data: undefined, error: undefined};
  if (offline) {
    return result;
  }

  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  try {
    let params: any = {};
    if (projectId) params.project = projectId;
    else if (noticeId) params.notice = noticeId;
    else if (costCodeId) params.cost_code = costCodeId;
    else throw 'must provide project or notice Id or cost code Id';
    //console.log("params", params)
    const response = await axios.get(
      'http://' + baseAddress + '/checklist_group/',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
        params: params,
      },
    );

    result.data = response.data.results as Array<Permit>;
    //console.log("PERMIT", result)
  } catch (error: any) {
    console.error('permitAPI.getList', error);
    result = {...result, error: 'permitAPI.getList'};
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

const getDetailed = async (
  permitId: string,
  accessToken: string | undefined,
) => {
  interface IResult {
    data: Permit | undefined;
    error: string | undefined;
  }
  let result: IResult = {data: undefined, error: undefined};
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";;
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  try {
    const response = await axios.get(
      'http://' + baseAddress + '/checklist_group/' + permitId + '/',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    result.data = response.data as Permit;
    console.log('PERMIT DETAILED', result);
  } catch (error: any) {
    console.error('permitAPI.getDetailed', error);
    result.error = 'permitAPI.getDetailed';
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

const remove = async (permitId: string, accessToken: string | undefined) => {
  interface IResult {
    data: boolean;
    error: undefined | string;
  }
  let result: IResult = {data: false, error: undefined};
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";;
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  try {
    const response = await axios.delete(
      'http://' + baseAddress + '/checklist_group/' + permitId + '/',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    result =
      response.status === 204
        ? {...result, data: response.status === 204}
        : {...result, data: false};
  } catch (error: any) {
    console.error('permitAPI.remove', error);
    result.error = 'permitAPI.remove';
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

const add = async (
  permit: Permit,
  userId: string,
  accessToken: string | undefined,
) => {
  //if (offline){ return dummy.newDummyCostCode(notice); }
  // Add a new costcode
  interface IResult {
    data: Permit | undefined;
    error: undefined | string;
  }
  let result: IResult = {data: undefined, error: undefined};
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";;
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  const payload = {...permit, user: userId};
  console.log('payload', payload);
  try {
    const response = await axios.post(
      'http://' + baseAddress + '/checklist_group/',
      payload,
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    //console.log("response", response)
    result =
      response.status === 201
        ? {...result, data: response.data as Permit}
        : {...result, data: undefined};
    console.log('ADDED PERMIT', result);
  } catch (error: any) {
    console.error('permitAPI.add', error);
    result.error = 'permitAPI.add';
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

interface UpdateBody {
  title?: string;
  startDate?: string;
  endDate?: string;
  userId: string;
}

interface Payload {
  title?: string;
  body?: string;
  startDate?: string;
  endDate?: string;
  lastModifiedBy: string;
  lastModified: string;
}

const update = async (
  permitId: string,
  {title, startDate, endDate, userId}: UpdateBody,
  accessToken: string | undefined,
) => {
  console.log('PERMIT ID:', permitId);
  interface IResult {
    data: Permit | undefined;
    error: undefined | string;
  }
  // Update one or more property of a notice without affecting other values
  // Only pass in what is needed to be updated
  let result: IResult = {data: undefined, error: undefined};
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";;
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  try {
    let payload: Payload = {
      lastModifiedBy: userId,
      lastModified: new Date().toISOString(),
    };
    if (title) {
      payload.title = title;
    }
    if (startDate) {
      payload.startDate = startDate;
    }
    if (endDate) {
      payload.endDate = endDate;
    }
    // console.log(payload);
    const response = await axios.patch(
      'http://' + baseAddress + '/checklist_group/' + permitId + '/',
      payload,
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    result =
      response.status === 200
        ? {...result, data: response.data as Permit}
        : {...result, data: undefined};
    //console.log("RESPONSE FROM SERVER:", response.data)
  } catch (error: any) {
    console.error('permitAPI.update', error);
    result.error = 'permitAPI.update';
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

const checklistGroupAPI = {
  getList,
  getDetailed,
  remove,
  update,
  add,
};

export default checklistGroupAPI;
