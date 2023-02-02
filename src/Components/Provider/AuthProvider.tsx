import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {baseAddress} from '../../Services/settings';
import {User} from '../../Models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {
  INoticeBoardFilterData,
  INoticeTableDataColumn,
  TNoticeViewTab,
} from '../Contents/NoticeBoard/NoticeBoard';
import {NoticeCategory} from '../../Models/notice';

export interface authContextInterface {
  loginWithDetails: Function;
  getAccessToken: Function;
  loggedIn: boolean;
  user: User | undefined;
  isCheckingLogInStatus: boolean;
  logOut: () => void;
  noticeBoardLastState: INoticeBoardLastState;
}

export interface INoticeBoardLastState {
  columnFilter: INoticeTableDataColumn[] | null;
  selectedCategory: NoticeCategory | null;
  filterList: INoticeBoardFilterData | null;
  noticeViewTab: TNoticeViewTab | null;
}
const AuthContext = createContext({});

const AuthProvider = (children: any) => {
  const [isCheckingLogInStatus, setIsCheckingLogInStatus] =
    useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [accessTokenExpiry, setAccessTokenExpiry] = useState<
    number | undefined
  >(undefined);
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    undefined,
  );
  const [user, setUser] = useState<User | undefined>(undefined);
  const [noticeBoardLastState, setnoticeBoardLastState] =
    useState<INoticeBoardLastState>({
      columnFilter: null,
      selectedCategory: null,
      filterList: null,
      noticeViewTab: null,
    });
  let timer: ReturnType<typeof setTimeout> | null = null;

  const checkExpiry = (expiry: Number) => {
    try {
      const currentTime = new Date().getTime() / 1000;
      return currentTime < expiry;
    } catch {
      console.error('Error Checking Expiry');
      return false;
    }
  };

  const getAccessToken = async () => {
    if (accessToken && accessTokenExpiry && checkExpiry(accessTokenExpiry))
      return accessToken;
    const exchangeResult = await exchangeRefreshToken();
    if (exchangeResult) return exchangeResult;
    return undefined;
  };

  const initializeAuth = async () => {
    try {
      const storageRefreshToken: string | null = await AsyncStorage.getItem(
        'refreshToken',
      );
      const storageRefreshTokenExpiry: string | null =
        await AsyncStorage.getItem('refreshTokenExpiry');
      const parsedRefreshTokenExpiry: number | undefined =
        storageRefreshTokenExpiry && !isNaN(parseInt(storageRefreshTokenExpiry))
          ? parseInt(storageRefreshTokenExpiry)
          : undefined;
      const refreshTokenIsValid = checkExpiry(
        parsedRefreshTokenExpiry ? parsedRefreshTokenExpiry : 0,
      );
      // console.log(storageRefreshToken);
      // console.log(refreshTokenIsValid);
      if (storageRefreshToken && refreshTokenIsValid) {
        getNoticeBoardLastState();
        exchangeRefreshToken(storageRefreshToken);
      } else setIsCheckingLogInStatus(false);
    } catch (err) {
      console.error(err);
      setUser(undefined);
      Alert.alert(
        'SOMETHING WRONG WITH LOCAL STORAGE',
        'Happen at getInitialUser, please log in again',
        [
          {
            text: 'OK',
            onPress: () => {
              setIsCheckingLogInStatus(false);
              clearAuthAsyncStorage();
              setLoggedIn(false);
            },
          },
        ],
      );
    }
  };

  //this useeffect will automatically exchange the refresh token in the background prior to the access token expiry
  useEffect(() => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    if (refreshToken) {
      timer = setTimeout(() => {
        exchangeRefreshToken();
      }, 3000000);
    }
  }, [refreshToken]);

  //this useeffect will run initial to check if user is existed in asyncstorage
  //+Existed => continue to check the other conditions to log user in app
  //+NOT existed=> user has to log in

  useEffect(() => {
    initializeAuth();
  }, []);

  const clearAuthAsyncStorage = () => {
    AsyncStorage.removeItem('refreshToken');
    AsyncStorage.removeItem('refreshTokenExpiry');
    setRefreshToken(undefined);
    setAccessToken(undefined);
    setUser(undefined);
  };

  interface LoginDetails {
    user: string;
    password: string;
  }
  const loginWithDetails = async (login: LoginDetails) => {
    try {
      const requestBody: any = {
        grant_type: 'password',
        client_id: 'b5Y0MqZdwi3NMdaEcJSJWIPSGBm3hr0NTMQT4RUK',
        client_secret:
          'TDOIue9kSmQUXV9JVe4cUHWcRnN7CZdflDGuNir4khFrhwI43pBpYbn3ZM4w2xfY4TK91QApEGT91oeDcz8UVOjYIOVVAKsb2KgzOwYTLwE3AzZdeI5Jh6RnOijeb3tp',
        username: login.user,
        password: login.password,
      };
      let formBody: string[] = [];
      for (let property in requestBody) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(requestBody[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      const formBodyStr: string = formBody.join('&');
      const response = await axios.post(
        'http://' + baseAddress + '/token/',
        formBodyStr,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: '*/*',
          },
        },
      );
      console.log('RESPONSE', response.data);
      if (response?.data?.access_token && response?.data?.refresh_token) {
        let date = new Date();

        //set refresh token time in second + 26days in second because the refresh token will get deleted in 1 month since the time it's got generated by back end
        let refreshTokenExpire: number =
          Math.floor(date.getTime() / 1000) + 2246400;

        //set all the token information in async storage for using app next time
        AsyncStorage.setItem('refreshToken', response.data.refresh_token);
        AsyncStorage.setItem(
          'refreshTokenExpiry',
          refreshTokenExpire.toString(),
        );

        //UPDATE STATE
        setAccessToken(response?.data?.access_token);
        setRefreshToken(response?.data?.refresh_token);

        //set user state and async
        if (response?.data?.user as User) setUser(response?.data?.user as User);
        setLoggedIn(true);
        setIsCheckingLogInStatus(false);
        return true;
      } else throw 'unknown error';
    } catch (error: any) {
      clearAuthAsyncStorage();
      setIsCheckingLogInStatus(false);
      return false;
    }
  };

  const exchangeRefreshToken = async (storageRefreshToken?: string) => {
    const useRefreshToken = storageRefreshToken
      ? storageRefreshToken
      : refreshToken;
    if (!useRefreshToken) {
      console.error('exchangeRefreshToken: No useRefreshToken');
      clearAuthAsyncStorage();
      setLoggedIn(false);
      return false;
    }
    setIsCheckingLogInStatus(true);
    try {
      const requestBody: any = {
        grant_type: 'refresh_token',
        client_id: 'b5Y0MqZdwi3NMdaEcJSJWIPSGBm3hr0NTMQT4RUK',
        client_secret:
          'TDOIue9kSmQUXV9JVe4cUHWcRnN7CZdflDGuNir4khFrhwI43pBpYbn3ZM4w2xfY4TK91QApEGT91oeDcz8UVOjYIOVVAKsb2KgzOwYTLwE3AzZdeI5Jh6RnOijeb3tp',
        refresh_token: useRefreshToken,
      };
      let formBody: string[] = [];
      for (let property in requestBody) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(requestBody[property]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      const formBodyStr: string = formBody.join('&');
      const response = await axios.post(
        'http://' + baseAddress + '/token/',
        formBodyStr,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: '*/*',
          },
        },
      );
      // console.log('EXCHANGED TOKENS RESPONSE', response.data);
      //all tokens are returned
      if (response?.data?.access_token && response?.data?.refresh_token) {
        console.log('SUCCESSFULLY EXCHANGED TOKENS', response.data);
        let date = new Date();

        //set refresh token time in second + 26days in second because the refresh token will get deleted in 1 month since the time it's got generated by back end
        let refreshTokenExpire: number =
          Math.floor(date.getTime() / 1000) + 2246400;

        //set all the token information in async storage for using app next time
        AsyncStorage.setItem('refreshToken', response.data.refresh_token);
        AsyncStorage.setItem(
          'refreshTokenExpiry',
          refreshTokenExpire.toString(),
        );

        //UPDATE STATE
        setAccessToken(response?.data?.access_token);
        setAccessTokenExpiry(Math.floor(date.getTime() / 1000) + 3000);
        setRefreshToken(response?.data?.refresh_token);
        setLoggedIn(true);
        // console.log(response?.data?.user);
        if (response?.data?.user as User) setUser(response?.data?.user as User);
        setIsCheckingLogInStatus(false);
        return response?.data?.access_token;
      } else {
        console.log('FAILED TO EXCHANGE TOKEN');
        console.log('RESULT FAILED:', response.data);
        console.log('RESULT STATUS:', response.status);
        throw response;
      }
    } catch (error: any) {
      console.log(error);
      //log in again
      setLoggedIn(false);
      //remove all async storage
      clearAuthAsyncStorage();
      setIsCheckingLogInStatus(false);
      return false;
    }
  };

  //###################GET LAST STATE OF DIFFERENT SCREEN ###############

  const getNoticeBoardLastState = async () => {
    let columnFilterAsyncString: string | null =
      (await AsyncStorage.getItem('columnFilter')) || null;
    let selectedCategoryAsyncString: string | null =
      (await AsyncStorage.getItem('selectedCategory')) || null;
    let filterListAsyncString: string | null =
      (await AsyncStorage.getItem('filterList')) || null;
    let noticeViewTabAsyncString: string | null =
      (await AsyncStorage.getItem('noticeViewTab')) || null;

    setnoticeBoardLastState({
      ...noticeBoardLastState,
      columnFilter: columnFilterAsyncString
        ? (JSON.parse(columnFilterAsyncString) as INoticeTableDataColumn[])
        : null,
      selectedCategory: selectedCategoryAsyncString
        ? (JSON.parse(selectedCategoryAsyncString) as NoticeCategory)
        : null,
      filterList: filterListAsyncString
        ? (JSON.parse(filterListAsyncString) as INoticeBoardFilterData)
        : null,
      noticeViewTab: noticeViewTabAsyncString
        ? (JSON.parse(noticeViewTabAsyncString) as TNoticeViewTab)
        : null,
    });
  };

  const authContextValue: authContextInterface = {
    loginWithDetails,
    getAccessToken,
    loggedIn,
    user,
    isCheckingLogInStatus,
    logOut: clearAuthAsyncStorage,
    noticeBoardLastState: noticeBoardLastState,
  };
  return <AuthContext.Provider value={authContextValue} {...children} />;
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};
