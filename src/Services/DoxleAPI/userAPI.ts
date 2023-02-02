import axios, {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {offline, baseAddress} from '../settings';
import {User} from '../../Models/user';
import {Alert} from 'react-native';
import {
  authContextInterface,
  useAuth,
} from '../../Components/Provider/AuthProvider';

//? return the PermitItems for the particular costcode
const getList = async (
  accessToken: string | undefined,
  company?: string,
  project?: string,
) => {
  let result: User[] = [];
  if (offline) {
    return result;
  }
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  try {
    let params: any = {};
    if (company) {
      params.company = company;
    }
    if (project) {
      params.project = project;
    }

    const response = await axios.get('http://' + baseAddress + '/user/', {
      headers: {Authorization: 'Bearer ' + accessToken},
      params: params,
    });
    result = response.data as Array<User>;
  } catch (error: any) {
    console.error('userAPI.getList', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

const UserAPI = {
  getList,
};

export default UserAPI;
