//!PT- ASYNCSTORAGE KEYS USED IN NOTICEBOARD:
//$ "columnFilter": the last state of column filter, type INoticeTableDataColumn
//$ "selectedCategory": the last state of selected category, type NoticeCategory
//$ "filterList": the last state of all the filter options, type INoticeBoardFilterData
//$ "noticeViewTab": the last state of notice view tab menu, type TNoticeViewTab

import {View, Alert, TouchableOpacity, Platform} from 'react-native';
import React, {createContext, useCallback, useEffect, useState} from 'react';

import CategoryDropdownSelection from './CategoryDropdownSelection';

import {
  MenuIcon,
  NoticeBoardAddNewIcon,
  NoticeBoardFilterIcon,
  NoticeBoardSettingIcon,
  ProjectFilterIcon,
  SettingIcon,
} from './NoticeBoardIcon';

import {Company} from '../../../Models/company';
import {Notice, NoticeCategory} from '../../../Models/notice';
import {
  IOrientation,
  useOrientation,
} from '../../Provider/Orientation/OrientationContext';
import BottomNotificationBar, {
  INotificationMessage,
} from '../../GeneralComponents/BottomNotificationBar';
import {
  MenuIconButton,
  StyledAddNoticeButton,
  StyledAddNoticeButtonContainer,
  StyledDrawerMenuIconContainer,
  StyledDropdownCategoryContainer,
  StyledFilterIconButton,
  StyledNoticeTableContainer,
  StyledNoticeTableViewMenuContainer,
  StyledPhonePortraitFilterAndSettingIconContainer,
  StyledPortraitTabletIconButton,
  StyledRootNoticeBoardContainer,
  StyledSettingAndFilterIconContainer,
  StyledSettingIconButton,
  StyledTabMenuButton,
  StyledTabMenuTextView,
  StyledTopMenuContainer,
} from './StyledComponentsNoticeBoard';
import useMountStatus from '../../../Utilities/checkMountStatus';
import {authContextInterface, useAuth} from '../../Provider/AuthProvider';
import NoticeAPI, {NoticeGetParams} from '../../../Services/DoxleAPI/noticeAPI';
import {User} from '../../../Models/user';
import NoticeTable from './NoticeTable';
import {BlurView} from '@react-native-community/blur';
import LoadingScreen from '../../../Utilities/LottiesAnimation/LoadingScreen';
import userAPI from '../../../Services/DoxleAPI/userAPI';
import NoticeFilter from './NoticeFilter';
import ModalAddNotice from './ModalAddNotice';
import {saveNoticeBoardState} from './NoticeBoardCommonResource';
import {useSocket} from '../../Provider/Sockets/useSocket';
import {ISocketNoticeUpdateDate} from '../ModalEditNoticeDetails/NoticeTab';
import {FileData} from '../../../Models/storage';
type Props = {
  company: Company;
  setshowDrawer: (show: boolean) => void;
};

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
const NoticeBoard = ({company, setshowDrawer}: Props) => {
  const unmounted = useMountStatus();
  const {getAccessToken, user, noticeBoardLastState} =
    useAuth() as authContextInterface;

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

  //!the api string of the next notices should be fetched, it will be returned by the previous fetch if there are still notices to be fetched, one fetching batch is 25 notices. when there is no more notices to be fetched, the last api string will be return as null value then the fetch process will end
  const [nextFetchingBatch, setnextFetchingBatch] = useState<string | null>(
    null,
  );
  //*************Handle Orientation*************** */
  const useOri = useOrientation() as IOrientation;
  const {deviceSize, isPortraitMode} = useOri;
  //*********************************************** */

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
      if (!accessToken) throw 'ACCESS DENIED';
      const response = await NoticeAPI.getList(noticeFilter, accessToken);
      if (unmounted) return;
      if (response.data) {
        setLoading(false);
        setNotices([...response.data]);
        //initialise the total number of notices
        setTotalNoticeCount(response.noticeCount);

        //get the next api path for upcoming notices to be fetched
        setnextFetchingBatch(response.nextNoticesApiString);

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
      setLoading(false);
      // console.error(
      //   'Error in NoticeTable.fetchNotices()',
      //   err.toString(),
      // );
      // Alert.alert('Error in NoticeTable.fetchNotices()', err.toString());
      setnotificationMessage({
        messageText: 'Error in NoticeTable.fetchNotices()',
        messageType: 'error',
      });
      if (err === 'ACCESS DENIED')
        Alert.alert('AUTHORISATION DENIED!', 'You may have to log in again');
    }
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

  //fetch function to continue fetching the rest notices based on the first fetch.
  const fetchNextPageNotices = async (apiString: string) => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) throw 'ACCESS DENIED';
      let result = await NoticeAPI.getListByAPIString(apiString, accessToken);
      if (result.data) {
        //add returned notices to the initial notices
        let newNoticeList: Notice[] = [...notices, ...result.data];
        setNotices([...newNoticeList]);

        //#######################
        //update next page api path
        setnextFetchingBatch(result.nextNoticesApiString);

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
      // console.error('Error in NoticeFilter.fetchUsers()', err.toString());
      setnotificationMessage({
        messageText: 'Error in NoticeFilter.fetchUsers()',
        messageType: 'error',
      });
      // Alert.alert('Error in NoticeFilter.fetchUsers()', err.toString());
      if (err === 'ACCESS DENIED')
        Alert.alert('AUTHORISATION DENIED!', 'You may have to log in again');
    }
  };

  //intial fetch
  useEffect(() => {
    fetchNotices();
    fetchNoticeCategories();
    fetchUsers();
  }, []);

  //fetch notices whenever something change except column views
  useEffect(() => {
    //clear notices state first to avoid asynchronus data from the last fetch on progress
    setNotices([]);

    //stop continuous fetching from the last batch by set nextFetchingBatch state to null
    setnextFetchingBatch(null);

    fetchNotices();
  }, [filterList, selectedCategory, tabValue]);

  //update async storage of last state
  useEffect(() => {
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

  //! <--- SOCKETS LISTENER
  const socket = useSocket();
  const onMessage = useCallback((message: any) => {
    const data = JSON.parse(message?.data);

    const serverStatus: string = data.status;
    const messageType: string = data.message_type;
    // console.log(
    //     "%cDOXLE SOCKETS=RECEIVE SUCCESS DATA", "background:green; color:white"
    // );
    console.log(
      'NOTICE SOCKET RECEIVE DATA ON PLATFORM ',
      Platform.OS,
      ':',
      data,
    );
    if (messageType === 'SocketDataUpdate') {
      if (serverStatus === 'SUCCESS') {
        let receivedData: ISocketNoticeUpdateDate = data.message;
        const {
          noticeId,
          status,
          description,
          assignedUsers,
          category,
          categoryId,
          pinned,
          attachments,
          isArchived,
          isComplete,
          isPrivate,
          isFollowup,
          dueDate,
          startDate,
        } = receivedData;
        console.log('DATA on Platform ', Platform.OS, ':', data.message);

        if (noticeId && notices.find(notice => notice.noticeId === noticeId)) {
          console.log('MATCH');
          let updatedNotice: Notice = notices.filter(
            notice => notice.noticeId === noticeId,
          )[0];
          console.log('CHANGES HAPPEN');
          if (status) updatedNotice.status = status;

          if (description) updatedNotice.description = description;

          if (assignedUsers) {
            let newAssignedUserList: Array<User> = [];
            (assignedUsers as string[]).forEach(userId => {
              let userMatch: User | undefined = userList.filter(
                user => user.userId === userId,
              )[0];
              if (userMatch) newAssignedUserList.push(userMatch);
            });
            updatedNotice.assignedUsers = [...newAssignedUserList];
          }

          if (category) updatedNotice.category = category;

          if (categoryId) updatedNotice.categoryId = categoryId;

          if (pinned) updatedNotice.pinned = pinned;

          if (attachments) {
            //update attachment delete action
            if (attachments.action === 'delete' && updatedNotice.attachments) {
              updatedNotice.attachments = updatedNotice.attachments.filter(
                file => file.fileId !== attachments.fileChanges[0].fileId,
              );
            }

            if (attachments.action === 'add') {
              updatedNotice.attachments = updatedNotice.attachments
                ? [...updatedNotice.attachments, ...attachments.fileChanges]
                : [...attachments.fileChanges];
            }
          }

          if (isArchived) updatedNotice.isArchived = isArchived;

          if (isComplete) updatedNotice.isComplete = isComplete;

          if (isPrivate) updatedNotice.isPrivate = isPrivate;

          if (isFollowup) updatedNotice.isFollowup = isFollowup;

          if (dueDate) updatedNotice.dueDate = dueDate;

          if (startDate) updatedNotice.startDate = startDate;
          console.log('NOTICES BEFORE:', notices.length);
          let newNotices: Notice[] = [];
          notices.forEach(notice => {
            if (notice.noticeId === noticeId) newNotices.push(updatedNotice);
            else newNotices.push(notice);
          });
          console.log('UPDATED NOTICES:', newNotices.length);
          setNotices([...newNotices]);
        }
      } else {
        console.log(
          '%cDOXLE SOCKETS=DATA ERROR',
          'background:red; color:white',
        );
      }
    }
  }, []);

  useEffect(() => {
    socket.addEventListener('message', onMessage);

    return () => {
      socket.removeEventListener('message', onMessage);
    };
  }, [socket, onMessage]);
  // ! SOCKETS --->

  useEffect(() => {
    console.log(
      'NOTICE LENGTH ON PLAT FORM',
      Platform.OS,
      ' :',
      notices.length,
    );
  }, [notices]);

  return (
    <NoticeBoardContext.Provider value={noticeBoardValue}>
      <StyledRootNoticeBoardContainer>
        {notificationMessage && (
          <BottomNotificationBar
            messageText={notificationMessage.messageText}
            unmountControl={setnotificationMessage}
            messageType={notificationMessage.messageType}
          />
        )}

        {/*SHOW MODAL ADD NEW NOTICE */}
        {showAddNoticeModal && (
          <ModalAddNotice
            showAddNoticeModal={showAddNoticeModal}
            setShowAddNoticeModal={setShowAddNoticeModal}
            company={company}
          />
        )}

        <NoticeFilter filterShow={filterShow} setFilterShow={setFilterShow} />
        <StyledTopMenuContainer>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <StyledDrawerMenuIconContainer>
              <MenuIconButton
                delayPressIn={0}
                onPress={() => setshowDrawer(true)}>
                <MenuIcon />
              </MenuIconButton>
            </StyledDrawerMenuIconContainer>

            {/*Dropdown section */}
            <StyledDropdownCategoryContainer>
              <CategoryDropdownSelection
                categoryList={categoryList}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </StyledDropdownCategoryContainer>

            {/*Setting and Filter Icon section */}

            {isPortraitMode &&
            isPortraitMode === true &&
            deviceSize.deviceWidth < 700 ? (
              <StyledPhonePortraitFilterAndSettingIconContainer>
                <StyledFilterIconButton
                  delayPressIn={0}
                  onPress={() => handleFilterShow()}>
                  <ProjectFilterIcon />
                </StyledFilterIconButton>
                <StyledSettingIconButton
                  delayPressIn={0}
                  onPress={() => Alert.alert('Setting Icon', 'Clicked')}>
                  <SettingIcon />
                </StyledSettingIconButton>
              </StyledPhonePortraitFilterAndSettingIconContainer>
            ) : null}
          </View>
        </StyledTopMenuContainer>

        <StyledNoticeTableViewMenuContainer>
          {noticeViewTabMenu.map((item, i) => (
            <StyledTabMenuButton
              delayPressIn={0}
              key={i + item}
              style={[
                isPortraitMode && deviceSize.deviceWidth > 700
                  ? {width: 90}
                  : {width: '20%'},
                i < noticeViewTabMenu.length - 1
                  ? {
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 9,
                      borderRightWidth: 1,
                      borderRightColor: 'rgb(214, 217, 223)',
                    }
                  : null,
              ]}
              onPress={() => handleTabMenuPress(item)}>
              <StyledTabMenuTextView
                style={{
                  color:
                    tabValue === item.toLowerCase() ? '#5E32DE' : '#000000',
                }}>
                {item}
              </StyledTabMenuTextView>
            </StyledTabMenuButton>
          ))}

          {/*Setting and filter icon container only display on ipad */}
          {isPortraitMode && deviceSize.deviceWidth > 700 ? (
            <StyledSettingAndFilterIconContainer>
              <StyledPortraitTabletIconButton
                delayPressIn={0}
                onPress={() => handleFilterShow()}>
                <NoticeBoardFilterIcon />
              </StyledPortraitTabletIconButton>
              <TouchableOpacity
                delayPressIn={0}
                onPress={() => Alert.alert('Setting Icon', 'Clicked')}>
                <NoticeBoardSettingIcon />
              </TouchableOpacity>
            </StyledSettingAndFilterIconContainer>
          ) : null}
        </StyledNoticeTableViewMenuContainer>

        <StyledNoticeTableContainer>
          <NoticeTable
            company={company}
            notices={notices}
            fetchNextPageNotices={fetchNextPageNotices}
            nextFetchingBatch={nextFetchingBatch}
          />
          {loading && (
            <BlurView
              blurType="dark"
              blurAmount={4}
              style={{
                position: 'absolute',
                width: '96%',
                height: '100%',
                top: 0,
                left: '2%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
              }}
              reducedTransparencyFallbackColor="white">
              <LoadingScreen />
            </BlurView>
          )}
        </StyledNoticeTableContainer>

        <StyledAddNoticeButtonContainer
          style={[
            loading ? {zIndex: -100} : null,
            notificationMessage ? {transform: [{translateY: -60}]} : null,
          ]}>
          <StyledAddNoticeButton
            onPress={() => {
              setShowAddNoticeModal(true);
            }}>
            <NoticeBoardAddNewIcon />
          </StyledAddNoticeButton>
        </StyledAddNoticeButtonContainer>
      </StyledRootNoticeBoardContainer>
    </NoticeBoardContext.Provider>
  );
};

export default React.memo(NoticeBoard);

//=============Styling===================//

// const styles = StyleSheet.create({
//   addNoticeBtnStyle: {
//     position: "absolute",
//     bottom: 30,
//     right: 10,
//     width: 50,
//     height: 50,
//     borderRadius: 22,
//     backgroundColor: "#5E32DE",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     opacity: 0.5,
//   },
//   projectRootContainer: {
//     width: "100%",
//     height: "100%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#D5D7E3",
//   },
//   topMenu: {
//     paddingBottom: "1%",
//     width: "96%",
//     height: "8%",
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "transparent",
//   },
//   bodyProject: {
//     height: "91%",
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingBottom: "2%",
//   },
//   menuItem: {
//     display: "flex",
//     justifyContent: "flex-start",
//     // width: '30%',
//     height: "100%",
//   },
//   StyledDrawerMenuIconContainer: {
//     display: "flex",
//     justifyContent: "center",
//     height: "100%",
//     width: 30,
//   },
//   settingAndFilterIconContainer: {
//     display: "flex",
//     flexDirection: "row",
//     height: "100%",
//     justifyContent: "center",
//   },
//   dropdownProjectContainer: {
//     display: "flex",
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: "70%",
//     flexDirection: "row",
//   },
//   spinner: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//   },
// });
