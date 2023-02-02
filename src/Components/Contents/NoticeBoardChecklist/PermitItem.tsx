import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {Permit} from '../../../Models/permit';
import {Checklist} from '../../../Models/checklist';
import Dialog from 'react-native-dialog';

import checklistAPI from '../../../Services/DoxleAPI/checklistAPI';
import {IChecklistContext, useChecklistContext} from './ChecklistsTab';

import ChecklistAPI from '../../../Services/DoxleAPI/checklistAPI';
import useMountStatus from '../../../Utilities/checkMountStatus';
import {authContextInterface, useAuth} from '../../Provider/AuthProvider';
import SwipableDeleteButton from '../../GeneralComponents/SwipableDeleteButton';
import CheckListQuestionItem from './CheckListQuestionItem';
import {
  RootPermitItemContainer,
  StyledNewCheckItemTextInput,
  StyledPermitTitleText,
} from './StyledComponentsCheckist';
import PermitTitleDialog from './PermitTitleDialog';

type Props = {
  permit: Permit;
  handleDeletePermitApiCall: (permitId: string) => Promise<void>;
};

const PermitItem = ({permit, handleDeletePermitApiCall}: Props) => {
  //####################STATES#############################
  //constrol show dialog edit permit title
  const [showDialogEditTitle, setShowDialogEditTitle] =
    useState<boolean>(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState<string>('');
  //######################################################

  const unmounted = useMountStatus();
  //#############AUTH PROVIDER############
  const {getAccessToken, logOut, user, loggedIn} =
    useAuth() as authContextInterface;
  //####################################

  //############CHECKLIST PROVIDER######
  const {setCheckListLists, checkListLists, setnotificationMessage} =
    useChecklistContext() as IChecklistContext;
  //##############################################

  //handle delete checklist item api call
  const handleDeleteChecklistQuestion = async (checklistId: string) => {
    try {
      const accessToken = await getAccessToken();
      if (unmounted) return;
      const response = await checklistAPI.remove(checklistId, accessToken);
      if (response.data) {
        // setCompleteMessage('Item Deleted');

        let newPermitItems: Permit[] = [];
        checkListLists.map(list => {
          if (list.checklistGroupId === permit.checklistGroupId) {
            if (list.checklistItems) {
              newPermitItems.push({
                ...list,
                checklistItems: [
                  ...list.checklistItems.filter(
                    checklist => checklist.checklistId !== checklistId,
                  ),
                ],
              });
            }
          } else newPermitItems.push(list);
        });
        setCheckListLists([...newPermitItems]);
        setnotificationMessage({
          messageText: 'Checklist Deleted',
          messageType: 'success',
        });
      } else throw response.error;
    } catch (err: any) {
      if (err === 'AuthenticationFailure') {
        logOut();
        return;
      }
      console.error(
        'Error in PermitItem.handleDeleteChecklistQuestion()',
        err.toString(),
      );
      Alert.alert(
        'Error in PermitItem.handleDeleteChecklistQuestion()',
        err.toString(),
      );
    }
  };

  //#########Control opacity animation of checklist title#######
  //get layout width of touchableopacity component to set target value of animatedViewWidth
  const getLayoutTouchOpacity = (e: LayoutChangeEvent) => {
    const {width} = e.nativeEvent.layout;
    setTouchOpacityWidth(width);
  };
  const [touchOpacityWidth, setTouchOpacityWidth] = useState<
    number | undefined
  >(undefined);
  const animatedViewWidth = new Animated.Value(0);
  const opacityIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(animatedViewWidth, {
      toValue: touchOpacityWidth ? touchOpacityWidth : 144,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const opacityOut = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(animatedViewWidth, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };
  //############################################################

  //handle add checklist api call
  const handleAddChecklist = async () => {
    //reset states
    setNewChecklistTitle('');
    try {
      if (!user?.userId) throw 'handleAddChecklist: userId not found';
      const accessToken = await getAccessToken();
      if (unmounted) return;
      const response = await checklistAPI.addChecklist(
        {
          question: newChecklistTitle,
          answer: null,
          // notice: notice.noticeId,
          timeStamp: new Date().toISOString(),
          permit: permit.checklistGroupId,
        },
        user.userId,
        accessToken,
      );
      if (response.data) {
        let newPermitItems: Permit[] = [];
        checkListLists.map(list => {
          if (list.checklistGroupId === permit.checklistGroupId) {
            if (list.checklistItems) {
              newPermitItems.push({
                ...list,
                checklistItems: [
                  ...list.checklistItems,
                  response.data as Checklist,
                ],
              });
            } else {
              newPermitItems.push({
                ...list,
                checklistItems: [response.data as Checklist],
              });
            }
          } else newPermitItems.push(list);
        });
        setCheckListLists([...newPermitItems]);

        setnotificationMessage({
          messageText: 'Checklist Added',
          messageType: 'success',
        });
      } else throw response.error;
    } catch (err: any) {
      if (err === 'AuthenticationFailure') {
        logOut();
        return;
      }
      console.error('Error in PermitItem.handleAddChecklist()', err.toString());
      Alert.alert('Error in PermitItem.handleAddChecklist()', err.toString());
    }
  };

  //handle edit checklist question api call
  const handleEditChecklistQuestion = async (
    checklistId: string,
    newQuestion: string,
  ) => {
    try {
      if (!user?.userId) throw 'handleEditChecklistQuestion: userId not found';
      const accessToken = await getAccessToken();
      if (unmounted) return;
      const response = await ChecklistAPI.updateChecklist(
        checklistId,
        {question: newQuestion},
        user.userId,
        accessToken,
      );
      if (response.data) {
        //UPDATE CURRENT PERMIT WITH NEW PermitItem LIST
        let newChecklistItems: Checklist[] = [];

        if (permit.checklistItems) {
          permit.checklistItems.map(checklistPermit => {
            if (checklistPermit.checklistId === checklistId) {
              newChecklistItems.push(response.data as Checklist);
            } else newChecklistItems.push(checklistPermit);
          });
        }
        let newPermit: Permit = {
          ...permit,
          checklistItems: [...newChecklistItems],
        };
        //########

        //##UPDATE PERMIT LIST

        let newPermitList: Permit[] = [];
        checkListLists.map(permitChecklist => {
          if (permitChecklist.checklistGroupId === permit.checklistGroupId) {
            newPermitList.push(newPermit);
          } else newPermitList.push(permitChecklist);
        });

        setCheckListLists([...newPermitList]);
        setnotificationMessage({
          messageText: 'Checklist Updated',
          messageType: 'success',
        });
      } else throw response.error;
    } catch (err: any) {
      if (err === 'AuthenticationFailure') {
        logOut();
        return;
      }
      console.error(
        'Error in PermitItem.handleEditChecklistQuestion()',
        err.toString(),
      );
      Alert.alert(
        'Error in PermitItem.handleEditChecklistQuestion()',
        err.toString(),
      );
    }
  };

  //handle tick checklist api call
  const handleChecklistCheck = async (
    checklistId: string,
    tickValue: boolean,
  ) => {
    try {
      if (!user?.userId) throw 'handleChecklistCheck: userId not found';
      const accessToken = await getAccessToken();
      if (unmounted) return;
      const updateAnswer = tickValue ? 'YES' : null;
      const response = await ChecklistAPI.updateChecklist(
        checklistId,
        {answer: updateAnswer},
        user.userId,
        accessToken,
      );
      if (response.data) {
        let newChecklistItems: Checklist[] = [];
        if (permit.checklistItems) {
          permit.checklistItems.map(checklistPermit => {
            if (checklistPermit.checklistId === checklistId) {
              newChecklistItems.push(response.data as Checklist);
            } else newChecklistItems.push(checklistPermit);
          });
        }
        let newPermit: Permit = {
          ...permit,
          checklistItems: [...newChecklistItems],
        };

        //##UPDATE PERMIT LIST

        let newPermitList: Permit[] = [];
        checkListLists.map(permitChecklist => {
          if (permitChecklist.checklistGroupId === permit.checklistGroupId) {
            newPermitList.push(newPermit);
          } else newPermitList.push(permitChecklist);
        });

        setCheckListLists([...newPermitList]);
      } else throw response.error;
    } catch (err: any) {
      console.error(
        'Error in PermitItem.handleChecklistCheck()',
        err.toString(),
      );
      Alert.alert('Error in PermitItem.handleChecklistCheck()', err.toString());
    }
  };

  //handle press permit title
  const handlePressTitle = () => {
    Alert.alert('Delete Checklist?', '', [
      {
        text: 'Delete',
        onPress: async () => handleDeletePermitApiCall(permit.checklistGroupId),
      },
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'destructive',
      },
    ]);
  };

  return (
    <RootPermitItemContainer>
      {/**Dialog to edit permit title */}
      {showDialogEditTitle && (
        <PermitTitleDialog
          action="editPermitTitle"
          showDialog={showDialogEditTitle}
          setShowDialog={setShowDialogEditTitle}
          permit={permit}
        />
      )}

      <TouchableOpacity
        onLayout={e => getLayoutTouchOpacity(e)}
        delayPressIn={0}
        onPress={handlePressTitle}
        onLongPress={() => setShowDialogEditTitle(true)}
        delayLongPress={400}
        onPressIn={() => {
          opacityIn();
        }}
        onPressOut={() => {
          opacityOut();
        }}
        style={styles.titlePermitItem}>
        <Animated.View
          style={{
            position: 'absolute',
            width: animatedViewWidth,
            height: '50%',
            backgroundColor: 'rgba(76, 43, 167, 0.8)',
            opacity: 0.5,
            borderRadius: 10,
          }}></Animated.View>
        <StyledPermitTitleText>{permit.title}</StyledPermitTitleText>
      </TouchableOpacity>

      {/*CHECK LIST ITEMS */}
      {permit.checklistItems
        ? permit.checklistItems.map((item: Checklist, indexItem) => {
            if (item.checklistId !== undefined) {
              return (
                <GestureHandlerRootView
                  key={indexItem}
                  style={{
                    width: '100%',
                    height: 40,
                    borderRadius: 8,
                    backgroundColor: '#F5F6F7',
                    marginBottom: 5,
                  }}>
                  <Swipeable
                    containerStyle={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                    }}
                    renderRightActions={(progress, dragX) => {
                      return (
                        <SwipableDeleteButton
                          dragX={dragX}
                          buttonWidth={80}
                          PermitItem={{
                            checklist: item,
                            deleteFunction: handleDeleteChecklistQuestion,
                          }}
                        />
                      );
                    }}>
                    <CheckListQuestionItem
                      checklist={item}
                      permit={permit}
                      handleEditChecklistQuestion={handleEditChecklistQuestion}
                      handleChecklistCheck={handleChecklistCheck}
                    />
                  </Swipeable>
                </GestureHandlerRootView>
              );
            } else return <></>;
          })
        : null}

      <StyledNewCheckItemTextInput
        placeholder="Add Another Item Here ..."
        placeholderTextColor="#dcd8d8"
        value={newChecklistTitle}
        onChangeText={text => setNewChecklistTitle(text)}
        onSubmitEditing={
          newChecklistTitle !== '' ? handleAddChecklist : () => {}
        }
      />
    </RootPermitItemContainer>
  );
};

export default PermitItem;

const styles = StyleSheet.create({
  addSubChecklistTextInputStyle: {
    width: '100%',
    height: 30,
    backgroundColor: 'transparent',
    paddingLeft: 20,
    fontWeight: '600',
    fontSize: 10,
    fontFamily: 'Roboto_Mono',
    fontStyle: 'normal',
    lineHeight: 12,
  },
  checklistTitleTextStyle: {
    color: 'rgb(90, 54, 190)',
    fontWeight: '900',
    fontSize: 12,
    fontFamily: 'Roboto_Mono',
    fontStyle: 'normal',
    lineHeight: 16,
    zIndex: 100,
  },
  rootContainer: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 60,
  },
  titlePermitItem: {
    width: '100%',
    height: 40,
    paddingLeft: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
