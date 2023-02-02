import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';

import PermitItem from './PermitItem';
import {Notice} from '../../../Models/notice';
import {Permit} from '../../../Models/permit';

import Dialog from 'react-native-dialog';
import ProgressBarScreen from '../../GeneralComponents/ProgressBarScreen';
import NoticeBoardLoadingScreenIOS from '../NoticeBoard/NoticeBoardLoadingScreenIOS';
import {authContextInterface, useAuth} from '../../Provider/AuthProvider';
import AddButtonWithText from '../../GeneralComponents/AddButtonWithText';
import useMountStatus from '../../../Utilities/checkMountStatus';
import {
  RootChecklistTab,
  StyledAddCheckListButtonContainer,
  StyledScrollableChecklistContainer,
} from './StyledComponentsCheckist';
import BottomNotificationBar, {
  INotificationMessage,
} from '../../GeneralComponents/BottomNotificationBar';
import PermitTitleDialog from './PermitTitleDialog';
import {BlurView} from '@react-native-community/blur';
import LoadingScreen from '../../../Utilities/LottiesAnimation/LoadingScreen';
import checklistGroupAPI from '../../../Services/DoxleAPI/checklistGroupAPI';

type Props = {
  notice: Notice;
};

export interface IChecklistContext {
  setCheckListLists: Function;
  checkListLists: Permit[];
  handleTitlePermitUpdate: (
    permitId: string,
    newTitle: string,
  ) => Promise<void>;
  handleAddNewPermit: (permitTitle: string) => Promise<void>;
  setnotificationMessage: (message: INotificationMessage | undefined) => void;
}

export const CheckListContext = createContext({});
const ChecklistsTab = ({notice}: Props) => {
  //######## STATES##########
  const [loading, setLoading] = useState<boolean>(false);
  const [checkListLists, setCheckListLists] = useState<Permit[]>([]);
  const [notificationMessage, setnotificationMessage] = useState<
    INotificationMessage | undefined
  >(undefined);
  //control show dialog for new permit title
  const [showDialogPermitTitle, setShowDialogPermitTitle] =
    useState<boolean>(false);

  //#####################
  const unmounted = useMountStatus();
  const {getAccessToken, logOut, user, loggedIn} =
    useAuth() as authContextInterface;

  //====fetch all permits====
  const fetchPermits = async () => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      if (unmounted) return;
      if (!accessToken) throw 'ACCESS DENIED';
      const response = await checklistGroupAPI.getList(
        null,
        notice.noticeId,
        null,
        accessToken,
      );

      //if no error=>has data returned from server
      if (response.data) {
        // if (unmounted) return;
        setCheckListLists([...(response.data as Permit[])]);
        setLoading(false);
      } else throw response.error;
    } catch (err: any) {
      setLoading(false);
      if (err === 'AuthenticationFailure') {
        logOut();
        return;
      }
      console.error('Error in ChecklistTab.fetchPermits()');
      Alert.alert('Error in ChecklistTab.fetchPermits()', 'NETWORK ERROR', [
        {text: 'Try again', onPress: () => fetchPermits()},
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
          style: 'destructive',
        },
      ]);
    }
  };
  //useEffect runs to fetch permits when notice change
  useEffect(() => {
    fetchPermits();
  }, [notice]);
  //=============================

  //add new permit api call
  const handleAddNewPermit = async (permitTitle: string) => {
    const newPermitTemplate: Permit = {
      title: permitTitle,
      checklistGroupId: '',
      notice: notice.noticeId,
      timeStamp: new Date().toISOString(),
      startDate: new Date().toISOString().substring(0, 10),
      endDate: new Date().toISOString().substring(0, 10),
    };
    setShowDialogPermitTitle(false);
    try {
      if (!user?.userId) throw 'handleAddNewPermit: userId not found';
      const accessToken = await getAccessToken();
      if (unmounted) return;
      const response = await checklistGroupAPI.add(
        newPermitTemplate,
        user.userId,
        accessToken,
      );
      if (response.data) {
        setCheckListLists([...checkListLists, response.data as Permit]);
        setnotificationMessage({
          messageText: 'Item Added',
          messageType: 'success',
        });
      }

      //if error adding=> throw error
      else if (response.error) throw response.error;
    } catch (err: any) {
      if (err === 'AuthenticationFailure') {
        logOut();
        return;
      }
      console.error(
        'Error in ChecklistTab.handleAddNewPermit()',
        err.toString(),
      );
      Alert.alert('Error in ChecklistTab.handleAddNewPermit()', err.toString());
    }
  };

  //#####################################

  //edit title api call
  const handleTitlePermitUpdate = async (
    permitId: string,
    newTitle: string,
  ) => {
    try {
      if (!user?.userId) throw 'handleTitlePermitUpdate : userId not found';
      const accessToken = await getAccessToken();
      if (unmounted) return;
      if (!accessToken) throw 'ACCESS DENIED';
      const response = await checklistGroupAPI.update(
        permitId,
        {
          title: newTitle,
          userId: user.userId,
        },
        accessToken,
      );
      //update successfully
      if (response.data) {
        let newChecklistLists: Permit[] = [];
        checkListLists.map(list => {
          if (list.checklistGroupId === permitId)
            newChecklistLists.push({
              ...list,
              title: (response.data as Permit).title,
            });
          else newChecklistLists.push(list);
        });
        setCheckListLists([...newChecklistLists]);
        setnotificationMessage({
          messageText: 'Item Updated',
          messageType: 'success',
        });
      } else throw response.error;
    } catch (err: any) {
      if (err === 'AuthenticationFailure') {
        logOut();
        return;
      }
      console.error(
        'Error in ChecklistTab.handleTitlePermitUpdate()',
        err.toString(),
      );
      Alert.alert(
        'Error in ChecklistTab.handleTitlePermitUpdate()',
        err.toString(),
      );
    }
  };

  //delete permit api call
  const handleDeletePermit = async (permitId: string) => {
    try {
      const accessToken = await getAccessToken();
      if (unmounted) return;
      const response = await checklistGroupAPI.remove(permitId, accessToken);
      //update successfully
      if (response.data) {
        setCheckListLists([
          ...checkListLists.filter(list => list.checklistGroupId !== permitId),
        ]);
        setnotificationMessage({
          messageText: 'Item Deleted',
          messageType: 'success',
        });
      } else throw response.error;
    } catch (err: any) {
      if (err === 'AuthenticationFailure') {
        logOut();
        return;
      }
      console.error(
        'Error in ChecklistTab.handleDeletePermit()',
        err.toString(),
      );
      Alert.alert('Error in ChecklistTab.handleDeletePermit()', err.toString());
    }
  };

  //########control notification#######

  const checklistContextValue: IChecklistContext = {
    setCheckListLists: setCheckListLists,
    checkListLists: checkListLists,
    handleTitlePermitUpdate: handleTitlePermitUpdate,
    handleAddNewPermit: handleAddNewPermit,
    setnotificationMessage: setnotificationMessage,
  };

  const [progress, setProgress] = useState<number | undefined>(undefined);
  //###################################

  return (
    <CheckListContext.Provider value={checklistContextValue}>
      <RootChecklistTab>
        {notificationMessage && (
          <BottomNotificationBar
            messageText={notificationMessage.messageText}
            messageType={notificationMessage.messageType}
            unmountControl={setnotificationMessage}
          />
        )}
        {loading && (
          <BlurView
            blurType="light"
            blurAmount={10}
            blurRadius={10}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
            reducedTransparencyFallbackColor="white">
            <LoadingScreen />
          </BlurView>
        )}
        {/**Dialog to add new permit */}
        {showDialogPermitTitle && (
          <PermitTitleDialog
            action="addPermit"
            showDialog={showDialogPermitTitle}
            setShowDialog={setShowDialogPermitTitle}
          />
        )}
        {/* <View>
          <Dialog.Container
            visible={showDialogPermitTitle}
            contentStyle={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
            buttonSeparatorStyle={false}
            verticalButtons={true}>
            <Dialog.Title style={{fontFamily: 'Roboto_Mono'}}>
              Add New Checklist
            </Dialog.Title>
            <View
              style={{
                borderTopColor: 'rgb(150, 162, 190)',
                borderTopWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <Dialog.Description
                style={{
                  textAlign: 'left',
                  marginBottom: 14,
                  paddingLeft: 20,
                  fontFamily: 'Roboto_Mono',
                }}>
                Checklist Title
              </Dialog.Description>

              <Dialog.Input
                value={newPermitTitle}
                onChangeText={text => setNewPermitTitle(text)}
              />
            </View>
            <Dialog.Button
              label="Add"
              onPress={handleAddNewPermit}
              disabled={newPermitTitle === ''}
            />
            <Dialog.Button
              label="Cancel"
              onPress={() => {
                setNewPermitTitle(''); //clear title
                setShowDialogPermitTitle(false); //close dialog
              }}
              color="red"
            />
          </Dialog.Container>
        </View> */}

        {/*Progress bar */}
        {progress ? <ProgressBarScreen progress={progress} /> : null}

        {/*ADD LIST BTN CONTAINER */}
        <StyledAddCheckListButtonContainer>
          <TouchableOpacity onPress={() => setShowDialogPermitTitle(true)}>
            <AddButtonWithText title="ADD LIST" height={30} width={88} />
          </TouchableOpacity>
        </StyledAddCheckListButtonContainer>

        {/*List Container */}
        <StyledScrollableChecklistContainer
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          {checkListLists.map((list: Permit, index) => {
            return (
              <PermitItem
                key={index}
                permit={list}
                handleDeletePermitApiCall={handleDeletePermit}
              />
            );
          })}
        </StyledScrollableChecklistContainer>
      </RootChecklistTab>
    </CheckListContext.Provider>
  );
};

export default ChecklistsTab;

export const useChecklistContext = () => useContext(CheckListContext);
