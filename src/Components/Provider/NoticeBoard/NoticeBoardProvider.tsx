import {StyleSheet, Text, View} from 'react-native';
import React, {createContext, useEffect, useState} from 'react';
import {Notice, NoticeCategory} from '../../../Models/notice';
import {INotificationMessage} from '../../GeneralComponents/BottomNotificationBar';
import {User} from '../../../Models/user';
import useMountStatus from '../../../Utilities/checkMountStatus';
import {authContextInterface, useAuth} from '../AuthProvider';
import NoticeAPI, {NoticeGetParams} from '../../../Services/DoxleAPI/noticeAPI';
import {saveNoticeBoardState} from '../../Contents/NoticeBoard/NoticeBoardCommonResource';
import userAPI from '../../../Services/DoxleAPI/userAPI';
import {Company} from '../../../Models/company';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface INoticeBoardFilterData {
  assignedUsers?: string;
  categoryId?: string;
  status?: string;
  creator?: string;
}
export interface INoticeBoardContext {
  notices: Notice[];
  setNotices: (data: Notice[]) => void;
  selectedCategory: NoticeCategory | null;
  setSelectedCategory: (category: NoticeCategory | null) => void;
  filterList: INoticeBoardFilterData;
  setFilterList: (filterData: INoticeBoardFilterData) => void;
  categoryList: NoticeCategory[];
  setCategoryList: (categoryList: NoticeCategory[]) => void;
  notificationMessage: INotificationMessage | undefined;
  setnotificationMessage: (
    notification: INotificationMessage | undefined,
  ) => void;
  noticeColumnView: INoticeTableDataColumn[];
  setNoticeColumnView: (data: INoticeTableDataColumn[]) => void;
  handleDeleteNoticeApi: (noticeId: string) => Promise<void>;
  userList: User[];
}

export type TNoticeViewTab =
  | 'live'
  | 'my notices'
  | 'created by'
  | 'follow up'
  | 'archived';
const noticeViewTabMenu: TNoticeViewTab[] = [
  'live',
  'my notices',
  'created by',
  'follow up',
  'archived',
];
export interface INoticeTableDataColumn {
  name: string;
  key: keyof Notice;
  display: boolean;
}
const NoticeColumnView: INoticeTableDataColumn[] = [
  {name: 'Start Date', key: 'startDate', display: true},
  {name: 'Due Date', key: 'dueDate', display: true},
];

export const NoticeBoardContext = createContext({});
const NoticeBoardProvider = (children: any) => {
  const unmounted = useMountStatus();
  const {getAccessToken, user, noticeBoardLastState} =
    useAuth() as authContextInterface;

  //#######STATES#########
  const [notices, setNotices] = useState<Array<Notice>>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<NoticeCategory | null>(noticeBoardLastState.selectedCategory);
  const [filterList, setFilterList] = useState<INoticeBoardFilterData>(
    noticeBoardLastState.filterList ? noticeBoardLastState.filterList : {},
  );
  const [categoryList, setCategoryList] = useState<NoticeCategory[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [noticeColumnView, setNoticeColumnView] = useState<
    INoticeTableDataColumn[]
  >(
    noticeBoardLastState.columnFilter
      ? noticeBoardLastState.columnFilter
      : NoticeColumnView,
  );
  const [filterShow, setFilterShow] = useState<boolean>(false);
  //control show add notice dialog
  const [showAddNoticeModal, setShowAddNoticeModal] = useState<boolean>(false);
  const [notificationMessage, setnotificationMessage] = useState<
    INotificationMessage | undefined
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<TNoticeViewTab>(
    noticeBoardLastState.noticeViewTab
      ? noticeBoardLastState.noticeViewTab
      : 'live',
  );
  //total number of notices (get initialised from first fetch)
  const [totalNoticeCount, setTotalNoticeCount] = useState<number | undefined>(
    undefined,
  );
  //the api string of the next notices will be fetch when scrolling down (this state will have value if there are still notices not fetched from server)
  const [nextNoticesAPISPath, setNextNoticesAPISPath] = useState<string | null>(
    null,
  );
  //################################

  //fetch notices
  const fetchNotices = async (data = 'all', newTabValue?: string) => {
    setLoading(true);
    const archived = tabValue === 'archived' ? true : false;
    let noticeFilter: NoticeGetParams = {
      companyId: company.companyId,
      isArchived: archived,
      assignedUsers: filterList.assignedUsers
        ? filterList.assignedUsers
        : tabValue === 'my notices' && user
        ? user?.userId
        : undefined,
      status: filterList.status ? filterList.status : undefined,
      categoryId: selectedCategory
        ? selectedCategory.noticeCategoryId
        : undefined,
      creator: tabValue === 'created by' && user ? user.userId : undefined,
    };

    try {
      if (!company) throw 'company not founc';
      const accessToken = await getAccessToken();
      const response = await NoticeAPI.getList(noticeFilter, accessToken);
      if (unmounted) return;
      if (response.data) {
        setLoading(false);
        setNotices([...response.data]);
        //initialise the total number of notices
        setTotalNoticeCount(response.noticeCount);

        //get the next api path for upcoming notices to be fetched
        setNextNoticesAPISPath(response.nextNoticesApiString);

        // filterByTab(newTabValue ? newTabValue : tabValue, response.data);
        // let tempList: string[] = [];
        // response.data.forEach((notice: Notice) => {
        //   if (
        //     notice.category &&
        //     notice.category !== 'ARCHIVED' &&
        //     tempList.indexOf(notice.category) === -1
        //   ) {
        //     tempList.push(notice.category);
        //   }
        // });
        // tempList.sort((a, b) => a.localeCompare(b));
        // setCategoryList([...tempList]);
      } else throw response.error;
    } catch (err: any) {
      // console.error(
      //   'Error in NoticeTable.fetchNotices()',
      //   err.toString(),
      // );
      // Alert.alert('Error in NoticeTable.fetchNotices()', err.toString());
      setnotificationMessage({
        messageText: err.toString(),
        messageType: 'error',
      });
    }
    setLoading(false);
  };

  const fetchNoticeCategories = async () => {
    try {
      if (!company) throw 'company not founc';
      const accessToken = await getAccessToken();
      const response = await NoticeAPI.getNoticeCategories(
        company.companyId,
        accessToken,
      );
      if (response.data) setCategoryList([...response.data]);
      else throw response.error;
    } catch (error: any) {
      setnotificationMessage({
        messageText: error.toString(),
        messageType: 'error',
      });
    }
  };
  const fetchNextPageNotices = async (
    apiString: string,
    newTabValue?: string,
  ) => {
    try {
      const accessToken = await getAccessToken();
      let result = await NoticeAPI.getListByAPIString(apiString, accessToken);
      if (result.data) {
        //add returned notices to the initial notices
        let newNoticeList: Notice[] = [...notices, ...result.data];
        setNotices([...newNoticeList]);

        //#######################
        //update next page api path
        setNextNoticesAPISPath(result.nextNoticesApiString);

        //update notice count in case something change
        setTotalNoticeCount(result.noticeCount);
      }
    } catch (err: any) {
      console.error(
        'Error in NoticeTable.fetchNextPageNotices()',
        err.toString(),
      );
      // Alert.alert(
      //   "Error in NoticeTable.fetchNextPageNotices()",
      //   err.toString()
      // );

      setnotificationMessage({
        messageText: 'Error in NoticeTable.fetchNextPageNotices()',
        messageType: 'error',
      });
    }
    setLoading(false);
  };
  const fetchUsers = async () => {
    //only call if token is useable
    try {
      if (!company) throw 'company not found';
      const accessToken = await getAccessToken();
      if (!accessToken) throw 'ACCESS DENIED';
      const response = (await userAPI.getList(
        accessToken,
        company.companyId,
      )) as User[];
      if (unmounted) return;
      setUserList([...response]);
    } catch (err: any) {
      console.error('Error in NoticeFilter.fetchUsers()', err.toString());
      setnotificationMessage({
        messageText: 'Error in NoticeFilter.fetchUsers()',
        messageType: 'error',
      });
      // Alert.alert('Error in NoticeFilter.fetchUsers()', err.toString());
    }
  };

  useEffect(() => {
    fetchNotices();
    fetchNoticeCategories();
    fetchUsers();
  }, []);

  //fetch notices whenever something change except column views
  useEffect(() => {
    fetchNotices();
  }, [filterList, selectedCategory, tabValue]);

  //update async storage of last state
  useEffect(() => {
    console.log('SET ASYNC:');
    saveNoticeBoardState({
      filterList: filterList,
      selectedCategory: selectedCategory,
      noticeViewTab: tabValue,
      columnFilter: noticeColumnView,
    });
  }, [filterList, selectedCategory, tabValue, noticeColumnView]);

  //handle filter show
  const handleFilterShow = () => {
    setFilterShow(!filterShow);
  };
  //handle notice view tab press
  const handleTabMenuPress = (newTabValue: TNoticeViewTab): void => {
    setTabValue(newTabValue);

    // if (tabValue !== "archived" && newTabValue === "archived") {
    //   fetchNotices("archive", newTabValue);
    // } else if (tabValue === "archived" && newTabValue !== "archived") {
    //   fetchNotices("all", newTabValue);
    // } else {
    //   filterByTab(newTabValue, notices);
    // }
  };
  //api call to handle deleting notice
  const handleDeleteNoticeApi = async (noticeId: string) => {
    try {
      const accessToken = await getAccessToken();
      let resultDelete: boolean = await NoticeAPI.remove(noticeId, accessToken);
      console.log(resultDelete);
      if (resultDelete && resultDelete === true) {
        setNotices(notices.filter(notice => notice.noticeId !== noticeId));
        //show notification
        setnotificationMessage({
          messageText: 'Deleted Successfully',
          messageType: 'success',
        });
      } else {
        throw 'FAILED TO DELETE';
      }
    } catch (err: any) {
      console.error(
        'Error in NoticeTable.handleDeleteNoticeApi()',
        err.toString(),
      );
      // Alert.alert("Error in NoticeTable.handleDeleteNoticeApi()", err.toString());
      setnotificationMessage({
        messageText: 'Deleted Failed',
        messageType: 'error',
      });
    }
  };
  //handle rendering notices when category changes

  const noticeBoardValue: INoticeBoardContext = {
    notices,
    setNotices,
    selectedCategory,
    setSelectedCategory,
    filterList,
    setFilterList,
    categoryList,
    setCategoryList,
    notificationMessage,
    setnotificationMessage,
    noticeColumnView,
    setNoticeColumnView,
    handleDeleteNoticeApi,
    userList,
  };

  return <NoticeBoardContext.Provider value={noticeBoardValue} {...children} />;
};

export default NoticeBoardProvider;

const styles = StyleSheet.create({});
