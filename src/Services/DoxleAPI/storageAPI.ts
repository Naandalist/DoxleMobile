import axios from 'axios';
import {offline, baseAddress} from '../../Services/settings';
// import dummy from './dummyData';
import {FileData, Folder} from '../../Models/storage';
import {Platform} from 'react-native';

const getFileList = async (
  projectId: string | null,
  costCodeId: string | null,
  noticeId: string | null,
  folderId?: string,
  accessToken?: string | undefined,
) => {
  let result: FileData[] = [];
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  console.log('CC ID:', costCodeId);
  console.log('PROJECT ID:', projectId);
  try {
    let params: object;
    if (costCodeId) params = {cost_code: costCodeId};
    else if (projectId) params = {project: projectId};
    else if (noticeId) params = {notice: noticeId};
    else {
      return result;
    }
    const response = await axios.get(
      'http://' + baseAddress + '/storage/file/',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
        params: params,
      },
    );
    result = response.status === 200 ? (response.data as Array<FileData>) : [];
    console.log('RESPONSE', response);
  } catch (error: any) {
    console.error('storageAPI.getFileList', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

const getFolderList = async (
  projectId: string | null,
  costCodeId: string | null,
  type: 'F' | 'P',
  accessToken: string | undefined,
) => {
  let result: Folder[] = [];
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  console.log(accessToken);
  if (!accessToken) {
    console.log('here', accessToken);
    throw 'AccessTokenNotFound';
  }
  try {
    let params: any;
    if (costCodeId && costCodeId !== null)
      params = {cost_code: costCodeId, ordering: 'name', type: type};
    else if (projectId !== null && projectId !== null)
      params = {project: projectId, ordering: 'name', type: type};
    else {
      return result;
    }
    const response = await axios.get(
      'http://' + baseAddress + '/storage/folder/',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
        params: params,
      },
    );
    result = response.status === 200 ? (response.data as Array<Folder>) : [];
  } catch (error: any) {
    console.error('storageAPI.getFolderList', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

const createFolder = async (
  folderName: string,
  projectId: string | null,
  costCodeId: string | null,
  type: 'F' | 'P',
  accessToken: string | undefined,
) => {
  let result: Folder | undefined = undefined;
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  try {
    const response = await axios.post(
      'http://' + baseAddress + '/storage/folder/',
      {name: folderName, costCode: costCodeId, project: projectId, type: type},
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    console.log(response.status);
    result = response.status === 201 ? (response.data as Folder) : undefined;
  } catch (error: any) {
    console.error('storageAPI.createFolder', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

const uploadCCFiles = async (
  files: Blob[],
  file: any[],
  currentFolder: string | null,
  folderName: string | null,
  setProgress: Function,
  selectedCostCodeId: string,
  selectedCostCodeTitle: string,
  projectId: string,
  companyId: string,
  type?: string,
  fileName?: string,
  accessToken?: string | undefined,
) => {
  interface Result {
    files: FileData[];
    errors: string[];
  }
  let result: Result | undefined = {files: [], errors: []};
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  try {
    const formData = new FormData();
    formData.append('company', companyId);
    formData.append('costCodeTitle', selectedCostCodeTitle);
    formData.append('costCodeId', selectedCostCodeId);
    formData.append('project', projectId);
    // if (costCode && costCodeId) {
    //     formData.append("costCodeTitle", costCode);
    //     formData.append("costCodeId", costCodeId);
    // }
    if (folderName) {
      formData.append('folder', folderName);
    } else {
      return {files: [], errors: ['Missing folderName']};
    }
    if (currentFolder) {
      formData.append('folderId', currentFolder);
    } else {
      return {files: [], errors: ['Missing folderId']};
    }
    if (type && fileName) {
      formData.append('files', {uri: file[0], name: fileName, type: type});
    } else {
      if (file.length > 0) {
        file.map(item => {
          formData.append('files', {
            uri: item,
            name: `photo_note-${(new Date().getTime() / 1000) | 0}.jpg`,
            type: 'image/jpeg',
          });
        });
      }
    }
    const response = await axios.post(
      'http://' + baseAddress + '/storage/file/',
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          if (progressEvent.total)
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            );
        },
      },
    );
    if (response.data && response.data.files) {
      result.files = response.data.files as FileData[];
    }
    if (response.data && response.data.errors) {
      result.errors = response.data.files as string[];
    }
  } catch (error: any) {
    result.errors = [...result.errors, error];
    console.error('storageAPI.uploadCCFiles', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

const uploadNoticeFiles = async (
  files: FileData[],
  setProgress: Function,
  noticeId: string,
  companyId: string,
  accessToken: string | undefined,
) => {
  interface Result {
    files: FileData[];
    errors: string[];
  }
  let result: Result = {files: [], errors: []};
  if (offline) {
    return result;
  }
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  try {
    const formData = new FormData();
    // let company: string = "";
    // if (await AsyncStorage.getItem("currentCompany")) company = JSON.parse(await AsyncStorage.getItem("currentCompany") || '{}').companyId;
    // if (company === undefined || company === "") { result.errors.push("Could not get company from local storage"); return result }

    formData.append('company', companyId);
    formData.append('noticeId', noticeId);

    files.forEach(function (file) {
      const trimmedURI = file.url.replace('file://', '');
      const fileName = trimmedURI.split('/').pop();
      const media = {
        name: fileName,
        type: file.type,
        uri: trimmedURI,
      };
      formData.append('files', media);
    });

    console.log('UPLOAD NOTICE FILES FORM DATA:', JSON.stringify(formData));
    const response = await axios.post(
      'http://' + baseAddress + '/storage/file/',
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          if (progressEvent.total)
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            );
        },
      },
    );
    if (response.data && response.data.files) {
      result.files = response.data.files as FileData[];
    }
    if (response.data && response.data.errors) {
      //   result.errors = response.data.files as string[];
      throw 'FAILED TO ADD FILES';
    }
  } catch (error: any) {
    // console.error('storageAPI.uploadNoticeFiles', error);
    result.errors = [error.toString()];
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';

    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

const uploadProjectFiles = async (
  files: Blob[],
  file: any[],
  currentFolder: string | null,
  folderName: string | null,
  setProgress: Function,
  projectId: string,
  companyId: string,
  accessToken: string | undefined,
) => {
  interface Result {
    files: FileData[];
    errors: string[];
  }
  let result: Result = {files: [], errors: []};
  if (offline) {
    return result;
  }
  // const accessToken: string |undefined= await AsyncStorage.getItem("access_token") || undefined;
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  try {
    const formData = new FormData();

    formData.append('company', companyId);
    formData.append('project', projectId);
    if (folderName) {
      formData.append('folder', folderName);
    } else {
      return {files: [], errors: ['Missing folderName']};
    }
    if (currentFolder) {
      formData.append('folderId', currentFolder);
    } else {
      return {files: [], errors: ['Missing folderId']};
    }
    file.forEach(fileItem =>
      formData.append('files', {
        uri: fileItem,
        name: 'photo_note.jpg',
        type: 'image/jpeg',
      }),
    );

    const response = await axios.post(
      'http://' + baseAddress + '/storage/file/',
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          if (progressEvent.total)
            setProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
            );
        },
      },
    );

    if (response.data && response.data.files) {
      result.files = response.data.files as FileData[];
    }
    if (response.data && response.data.errors) {
      result.errors = response.data.files as string[];
    }
  } catch (error: any) {
    console.error('storageAPI.uploadProjectFiles', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

const deleteFolders = async (
  folders: string[],
  costCodeId: string | null,
  projectId: string | null,
  accessToken: string | undefined,
) => {
  let result: Folder[] = [];
  if (offline) {
    return result;
  }
  // const accessToken: string |undefined= await AsyncStorage.getItem("access_token") || undefined;
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  try {
    let params: object = {folders};
    if (costCodeId !== null) params = {...params, costCodeId};
    if (projectId !== null) params = {...params, projectId};

    console.log('params', params);

    const response = await axios.post(
      'http://' + baseAddress + '/storage/folder/delete/',
      params,
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );

    result = response.status === 200 ? (response.data as Folder[]) : [];
    console.log('RESPONSE DELETE:', response.data);
  } catch (error: any) {
    console.error('storageAPI.deleteFolders', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

const deleteFile = async (fileId: string, accessToken: string | undefined) => {
  let result: boolean = false;
  if (offline) {
    result = true;
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  try {
    const response = await axios.delete(
      'http://' + baseAddress + '/storage/file/' + fileId + '/',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    result = response.status === 204;
  } catch (error: any) {
    console.error('API.deleteFile', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

const updateFolder = async (
  folderId: string,
  name: string,
  accessToken: string | undefined,
) => {
  let result: Folder | undefined = undefined;
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  try {
    const response = await axios.patch(
      'http://' + baseAddress + '/storage/folder/' + folderId + '/',
      {name: name},
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    console.log('RESULT EDIT FOLDER:', response.data);
    result = response.status === 200 ? (response.data as Folder) : undefined;
  } catch (error: any) {
    console.error('storageAPI.updateFolder', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

interface IUpdateFileBody {
  name?: string;
  completed?: boolean;
}
const updateFile = async (
  fileId: string,
  updateBody: IUpdateFileBody,
  accessToken: string | undefined,
) => {
  let result: FileData | undefined = undefined;
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  try {
    const response = await axios.patch(
      'http://' + baseAddress + '/storage/file/' + fileId + '/',
      updateBody,
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    result = response.data as FileData;
  } catch (error: any) {
    console.error('storageAPI.updateFile', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

const storageAPI = {
  getFileList,
  getFolderList,
  uploadCCFiles,
  uploadProjectFiles,
  createFolder,
  deleteFolders,
  deleteFile,
  updateFolder,
  updateFile,
  uploadNoticeFiles,
};

export default storageAPI;
