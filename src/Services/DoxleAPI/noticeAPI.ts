import axios from 'axios';
import {Notice, NewNotice, NoticeCategory} from '../../Models/notice';
import {User} from '../../Models/user';
import {offline, baseAddress} from '../settings';
import {IAxiosErrorReturnType} from '../ErrorHandling/ErrorHandler';
import {STATUS_SYMBOL} from '../../Utilities/constants';
import {FileData} from '../../Models/storage';

const availableStatuses = Object.values(STATUS_SYMBOL);
const availableSymbols = Object.keys(STATUS_SYMBOL);

const getStatusValue = (symbol: string) => {
  if (symbol) {
    return availableStatuses[availableSymbols.findIndex(sy => sy === symbol)];
  }
};

export interface NoticeGetParams {
  companyId: string;
  orderBy?: string;
  page?: number;
  isArchived?: boolean;
  categoryId?: string;
  assignedUsers?: string;
  status?: string;
  creator?: string;
}

const getList = async (
  {
    companyId,
    orderBy = 'timeStamp',
    page = 1,
    isArchived = false,
    categoryId,
    assignedUsers,
    status,
    creator,
  }: NoticeGetParams,
  accessToken: string | undefined,
) => {
  interface IResult {
    data: Notice[] | undefined;
    noticeCount: number | undefined;
    nextNoticesApiString: string | null;
    error: undefined | IAxiosErrorReturnType | 'STOCK_ERROR';
  }
  // Get's a list of notices for a given project selected with projectId
  // Order costcode with orderBy, options =  title, startDate, endDate
  // Pagination 100 notices per result - call for next page when scrolling
  let result: IResult = {
    data: undefined,
    error: undefined,
    noticeCount: undefined,
    nextNoticesApiString: null,
  };

  if (offline) {
    return result;
  }
  // const accessToken: string|null = await AsyncStorage.getItem("access_token") || "";
  let error: any | undefined = undefined;

  if (accessToken === null) {
    throw 'AccessTokenNotFound';
  }
  try {
    let params: any = {company: companyId};
    if (orderBy) params.order_by = orderBy;
    if (page) params.page = page;
    if (isArchived) params.is_archived = isArchived;
    if (categoryId) params.category_id = categoryId;
    if (assignedUsers) params.assigned_users = assignedUsers;
    if (creator) params.creator = creator;
    if (status) params.status = status;

    const response = await axios.get('http://' + baseAddress + '/notices/', {
      headers: {Authorization: 'Bearer ' + accessToken},
      params: params,
    });

    if (response)
      result = {
        ...result,
        data: response.data.results as Array<Notice>,
        noticeCount: response.data.count,
        nextNoticesApiString: response.data.next,
      };
    //console.log ("RESPONSE FETCHING NOTICE:", response.data)
  } catch (error: any) {
    console.error('noticeAPI.getList', error);
    result = {...result, error: error.toString()};
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    // console.warn('RESPONSE', error?.response);
    // console.warn('RESPONSE DATA', error?.response?.data);
    // console.warn('REQUEST', error?.request);
  }
  return result;
};

const getListByAPIString = async (
  apiString: string,
  accessToken: string | undefined,
) => {
  interface IResult {
    data: Notice[] | undefined;
    noticeCount: number | undefined;
    nextNoticesApiString: string | null;
    error: undefined | IAxiosErrorReturnType | 'STOCK_ERROR';
  }
  // Get's a list of notices for a given project selected with projectId
  // Order costcode with orderBy, options =  title, startDate, endDate
  // Pagination 100 notices per result - call for next page when scrolling
  let result: IResult = {
    data: undefined,
    error: undefined,
    noticeCount: undefined,
    nextNoticesApiString: null,
  };

  if (offline) {
    return result;
  }

  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  try {
    const response = await axios.get(apiString, {
      headers: {Authorization: 'Bearer ' + accessToken},
    });

    if (response)
      result = {
        ...result,
        data: response.data.results as Array<Notice>,
        noticeCount: response.data.count,
        nextNoticesApiString: response.data.next,
      };
    //console.log ("RESPONSE FETCHING NOTICE:", response.data)
  } catch (error: any) {
    console.error('noticeAPI.getListByAPIString', error);
    result = {...result, error: error.toString()};
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    console.warn('RESPONSE', error?.response);
    console.warn('RESPONSE DATA', error?.response?.data);
    console.warn('REQUEST', error?.request);
  }
  return result;
};

const getNoticeCategories = async (
  companyId: string,
  accessToken: string | undefined,
) => {
  interface IResult {
    data: NoticeCategory[] | undefined;
    error: undefined | IAxiosErrorReturnType | 'getNoticeCategoriesAPI';
  }
  let result: IResult = {
    data: undefined,
    error: undefined,
  };

  if (offline) {
    return result;
  }

  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }
  let params = {
    company: companyId,
    is_permit: false,
  };
  try {
    const response = await axios.get(
      'http://' + baseAddress + '/notices/category/',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
        params: params,
      },
    );

    if (response)
      result = {
        ...result,
        data: response.data.results as Array<NoticeCategory>,
      };
    //console.log ("RESPONSE FETCHING NOTICE:", response.data)
  } catch (error: any) {
    console.error('noticeAPI.getListByAPIString', error);
    result = {...result, error: 'getNoticeCategoriesAPI'};
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
    // console.warn('RESPONSE', error?.response);
    // console.warn('RESPONSE DATA', error?.response?.data);
    // console.warn('REQUEST', error?.request);
  }
  return result;
};

const getDetailed = async (
  noticeId: string,
  accessToken: string | undefined,
) => {
  interface IResult {
    data: Notice | undefined;
    error: undefined | string;
  }
  // Gets one notice only using the notice's UUID
  // At this stage there is no additional information from the detailed
  // Future back end change will mean this call will get storage, specs, comments with this call
  let result: IResult = {data: undefined, error: undefined};
  if (offline) {
    /* result = dummy.noticeFullResponse;*/ return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  try {
    const response = await axios.get(
      'http://' + baseAddress + '/notices/detail/' + noticeId + '/',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );

    result = response.data
      ? {...result, data: response.data as Notice}
      : {...result, data: undefined};
  } catch (error: any) {
    console.error('noticeAPI.getDetailed', error);
    result = {...result, error: 'noticeAPI.getDetailed'};
    // if (error?.status === 401 || error?.response?.status === 401)
    //   throw 'AuthenticationFailure';
  }
  return result;
};

const remove = async (noticeId: string, accessToken: string | undefined) => {
  /// Permanently delete notice by uuid
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
      'http://' + baseAddress + '/notices/' + noticeId + '/',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    console.log(response);
    result = response.status === 200;
  } catch (error: any) {
    console.error('noticeAPI.remove', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

const add = async (notice: NewNotice, accessToken: string | undefined) => {
  //if (offline){ return dummy.newDummyCostCode(notice); }
  // Add a new costcode
  let result: Notice | undefined = undefined;
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  notice.history = [
    {
      index: 0,
      shortText: 'Notice',
      longText: 'Created new "' + notice.description + '"',
      timeStamp: new Date().toString(),
    },
  ];

  console.log('NOTICE PASSED:', notice);
  try {
    const response = await axios.post(
      'http://' + baseAddress + '/notices/',
      notice,
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    result = response.status === 201 ? (response.data as Notice) : undefined;
  } catch (error: any) {
    console.error('noticeAPI.add', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

export interface UpdateBodyNotice {
  description?: string;
  creator?: string;
  assignedUsers?: string[];
  pinned?: boolean;
  status?: string;
  timeStamp?: string;
  category?: string;
  categoryId?: string;
  isArchived?: boolean;
  isComplete?: boolean;
  isPrivate?: boolean;
  isFollowup?: boolean;
  dueDate?: string | null;
  startDate?: string | null;
  history?: any[];
}

const update = async (
  accessToken: string | undefined,
  noticeId: string,
  user: User | undefined,
  {
    description,
    creator,
    assignedUsers,
    pinned,
    status,
    timeStamp,
    category,
    categoryId,
    isArchived,
    isComplete,
    isPrivate,
    isFollowup,
    dueDate,
    startDate,
  }: UpdateBodyNotice,
) => {
  console.log('DESCRIPTION:', description);
  console.log('USERS:', assignedUsers);

  // Update one or more property of a notice without affecting other values
  // Only pass in what is needed to be updated
  let result: Notice | undefined = undefined;
  if (offline) {
    return result;
  }
  // const accessToken: string = await AsyncStorage.getItem("access_token") || "";
  if (!accessToken) {
    throw 'AccessTokenNotFound';
  }

  try {
    let body: UpdateBodyNotice = {};
    let tittleText: string = 'Notice';
    let editText: string = '';

    if (description) {
      body.description = description;
      tittleText = 'Notice';
      editText += 'Change to "' + description + '"\n';
    }
    if (creator) {
      body.creator = creator;
    }
    if (assignedUsers) {
      body.assignedUsers = assignedUsers;
      tittleText = 'Notice';
      editText += 'Change assigned to ' + assignedUsers.length + ' user(s)\n';
    }
    if (pinned !== undefined) {
      body.pinned = pinned;
      if (pinned) {
        editText += 'Change to pinned\n';
      } else {
        editText += 'Change to  unpinned\n';
      }
    }
    if (status) {
      body.status = status;
      editText += 'Change to ' + getStatusValue(status) + '\n';
    }
    if (timeStamp) {
      body.timeStamp = timeStamp;
    }
    if (category) {
      body.category = category;
      editText += 'Change category to ' + category + '\n';
    }
    if (categoryId) {
      body.categoryId = categoryId;
      editText += 'Change categoryId to ' + categoryId + '\n';
    }
    if (isArchived !== undefined) {
      body.isArchived = isArchived;
      if (isArchived) {
        editText += 'Change to archived\n';
      } else {
        editText += 'Change to  unarchived\n';
      }
    }
    if (isComplete !== undefined) {
      body.isComplete = isComplete;
      if (isComplete) {
        editText += 'Change to completed\n';
      } else {
        editText += 'Change to uncompleted\n';
      }
    }
    if (isPrivate !== undefined) {
      body.isPrivate = isPrivate;
      if (isPrivate) {
        editText += 'Change to private\n';
      } else {
        editText += 'Change to unprivate\n';
      }
    }
    if (isFollowup !== undefined) {
      body.isFollowup = isFollowup;
      if (isFollowup) {
        editText += 'Change to follow up\n';
      } else {
        editText += 'Change to un follow up\n';
      }
    }
    if (dueDate !== undefined) {
      body.dueDate = dueDate;
      tittleText = 'Notice';
      editText += 'Change due date to ' + dueDate + '\n';
    }
    if (startDate !== undefined) {
      body.startDate = startDate;
      tittleText = 'Notice';
      editText += 'Change start date to ' + startDate + '\n';
    }

    body.history = [
      {
        short_text: tittleText,
        long_text: editText === '' ? 'Change' : editText,
        time_stamp: new Date().toString(),
        user: user?.userId,
      },
    ];

    const response = await axios.patch(
      'http://' + baseAddress + '/notices/' + noticeId + '/',
      body,
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    );
    result = response.status === 200 ? (response.data as Notice) : undefined;
  } catch (error: any) {
    console.error('noticeAPI.update', error);
    if (error?.status === 401 || error?.response?.status === 401)
      throw 'AuthenticationFailure';
  }
  return result;
};

const NoticeAPI = {
  getList,
  getDetailed,
  remove,
  update,
  add,
  getListByAPIString,
  getNoticeCategories,
};

export default NoticeAPI;
