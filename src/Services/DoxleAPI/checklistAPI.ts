import axios, {AxiosError} from 'axios';

import {Checklist} from '../../Models/checklist';
import {Costcode} from '../../Models/costcode';
import {Image} from '../../Models/image';
import {Permit} from '../../Models/permit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  checkErrorType,
  HandleAxiosError,
  IAxiosErrorReturnType,
} from '../ErrorHandling/ErrorHandler';
import {baseAddress, offline} from '../settings';

interface GetParams {
  costCodeId?: string;
  permitId?: string;
  ordering?: string;
}

//? return the PermitItems for the particular costcode
const getList = async (
  {costCodeId, permitId, ordering}: GetParams,
  accessToken: string | undefined,
) => {
  let result: Checklist[] = [];
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  try {
    let params: any = {};
    if (ordering) {
      params.ordering = ordering;
    }
    if (costCodeId) {
      params.cost_code = costCodeId;
    }
    if (permitId) {
      params.permit = permitId;
    }
    const response = await axios.get('http://' + baseAddress + '/checklist/', {
      headers: {Authorization: 'Bearer ' + accessToken},
      params: params,
    });
    result = response.data as Array<Checklist>;
    console.log('CHECKLIST:', result);
  } catch (error: any) {
    console.error('checklistAPI.getList', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

//? adds a PermitItem for a particular costcode
const addChecklist = async (
  checklist: Checklist,
  userId: string,
  accessToken: string | undefined,
) => {
  // console.log("Adding New Checklist", checklist);
  interface IResult {
    data: Checklist | undefined;
    error: undefined | IAxiosErrorReturnType | 'STOCK_ERROR';
  }
  let result: IResult = {data: undefined, error: undefined};
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  try {
    let payload: any = checklist;
    payload.lastModifiedBy = userId;
    const response = await axios.post(
      'http://' + baseAddress + '/checklist/',
      payload,
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    if (response.status === 201) {
      result = {...result, data: response.data};
    }
  } catch (error: any) {
    console.error('checklistAPI.addChecklist', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

interface UpdateBody {
  question?: string;
  answer?: 'YES' | 'NO' | 'NA' | null;
  assignedUsers?: string[];
  assignedContractor?: string | null;
}
//? updating a  PermitItem with checklistId
const updateChecklist = async (
  checklistId: string,
  {question, answer, assignedUsers, assignedContractor}: UpdateBody,
  userId: string,
  accessToken: string | undefined,
) => {
  //console.log("Updating Checklist ", checklistId);
  interface IResult {
    data: Checklist | undefined;
    error: undefined | IAxiosErrorReturnType | 'STOCK_ERROR';
  }
  let result: IResult = {
    data: undefined,
    error: undefined,
  };
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  let body: any = {lastModifiedBy: userId};
  try {
    if (answer !== undefined) body.answer = answer;
    if (question) body.question = question;
    if (assignedUsers) body.assignedUsers = assignedUsers;
    if (typeof assignedContractor !== 'undefined')
      body.assignedContractor = assignedContractor;
    const response = await axios.patch(
      'http://' + baseAddress + '/checklist/' + checklistId + '/',
      body,
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );

    if (response.status === 200) {
      result = {...result, data: response.data};
    }
  } catch (error: any) {
    console.error('checklistAPI.function', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

const remove = async (checklistId: string, accessToken: string | undefined) => {
  //console.log("Deleting Checklist ", checklistId);
  interface IResult {
    data: boolean;
    error: undefined | IAxiosErrorReturnType | 'STOCK_ERROR';
  }
  let result: IResult = {data: false, error: undefined};
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  try {
    const response = await axios.delete(
      'http://' + baseAddress + '/checklist/' + checklistId + '/',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    result =
      response.status === 204
        ? {...result, data: response.status === 204}
        : {...result, data: false};
  } catch (error: any) {
    console.error('checklistAPI.remove', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

const addChecklistImage = async (
  checklistId: string,
  files: Blob[],
  setProgress: Function,
  accessToken: string | undefined,
) => {
  interface Result {
    images: Image[];
    errors: string[];
  }
  let result: Result = {images: [], errors: []};
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  try {
    const formData = new FormData();
    formData.append('checklistId', checklistId);
    files.forEach(file => {
      formData.append('images', file);
    });

    const response = await axios.post(
      'http://' + baseAddress + '/checklist/img/',
      formData,
      {
        headers: {Authorization: 'Bearer ' + accessToken},
        onUploadProgress: progressEvent => {
          if (progressEvent.total)
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            );
        },
      },
    );
    result.images =
      response.status == 201 || response.status == 207
        ? (response.data.images as Image[])
        : [];
    result.errors =
      response.status == 207 ? (response.data.errors as string[]) : [];
    console.log(
      result.images.length + 'IMAGES SAVED SUCCESSFULLY',
      result.images,
    );
    console.log(result.errors.length + 'ERRORS SAVING IMAGES', result.errors);
  } catch (error: any) {
    console.error('checklistAPI.addChecklistImage', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

const removeChecklistImage = async (
  imageId: string,
  accessToken: string | undefined,
) => {
  let result: boolean = false;
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  try {
    const response = await axios.delete(
      'http://' + baseAddress + '/checklist/img/' + imageId + '/',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    result = response.status == 204;
  } catch (error: any) {
    console.error('checklistAPI.removeChecklistImage', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

const uploadCSV = async (
  costCodeId: string,
  file: Blob,
  accessToken: string | undefined,
) => {
  interface Result {
    checklists: Permit[];
    errors: string[];
  }
  let result: Result = {checklists: [], errors: []};
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  const formData = new FormData();
  formData.append('cost_code', costCodeId);
  formData.append('file', file);
  try {
    const response = await axios.post(
      'http://' + baseAddress + '/checklist/csv/',
      formData,
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    if (response.status === 207) result = response.data as Result;
  } catch (error: any) {
    console.error('checklistAPI.uploadCSV', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

const ChecklistAPI = {
  getList,
  addChecklist,
  updateChecklist,
  // getDetailed,
  remove,
  // update,
  // add,
  addChecklistImage,
  removeChecklistImage,
  uploadCSV,
};

export default ChecklistAPI;
