import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

import {Costcode} from '../../../Models/costcode';
import {User} from '../../../Models/user';
import {Company} from '../../../Models/company';
import {authContextInterface, useAuth} from '../../Provider/AuthProvider';
import useMountStatus from '../../../Utilities/checkMountStatus';
import {
  INoticeBoardContext,
  INoticeTableDataColumn,
  NoticeBoardContext,
} from './NoticeBoard';
import NoticeFilterIconButton from './NoticeFilterIconButton';
import * as Icons from './NoticeBoardIcon';
import {
  StyledCloseButtonContainer,
  StyledColumnFieldContainer,
  StyledColumnFieldSelectionButton,
  StyledColumnFieldSelectionContainer,
  StyledDueDateFieldContainer,
  StyledHeaderText,
  StyledNoticeFilterEmptyUserAlertContainer,
  StyledNoticeFilterEmptyUserAlertText,
  StyledNoticeFilterLeftContainer,
  StyledNoticeFilterUsernameItemContainer,
} from './StyledComponentsNoticeBoard';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type Props = {
  setFilterShow: (show: boolean) => void;
  filterShow: boolean;
};
const NoticeFilter = ({setFilterShow, filterShow}: Props) => {
  const unmounted = useMountStatus();
  const {getAccessToken, logOut, user, loggedIn} =
    useAuth() as authContextInterface;
  const {
    userList,
    noticeColumnView,
    setNoticeColumnView,
    filterList,
    setFilterList,
  } = useContext(NoticeBoardContext) as INoticeBoardContext;

  //*********initialize due dates field data*********
  const dueDateType = ['Due This Week', 'Due This Fortnight', 'Due This Month'];
  const [dueDateData, setDueDateData] = useState<string[]>([]);
  //***************************************************

  //handle check box in "Column" field
  const handleCheckBoxTick = (field: INoticeTableDataColumn) => {
    let newColumnFieldData: INoticeTableDataColumn[] = [];
    noticeColumnView.forEach(column => {
      if (column.key === field.key)
        newColumnFieldData.push({...field, display: !field.display});
      else newColumnFieldData.push(column);
    });
    setNoticeColumnView([...newColumnFieldData]);
    console.log('TRIGGERED');
  };

  //handle press user filter
  const handlePressUser = (user: User) => {
    if (!filterList.assignedUsers || filterList.assignedUsers !== user.userId)
      setFilterList({...filterList, assignedUsers: user.userId});
    else setFilterList({...filterList, assignedUsers: undefined});
  };

  const handleCloseNotice = () => {
    setFilterShow(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={filterShow}
      onRequestClose={() => {
        setFilterShow(!filterShow);
      }}>
      <KeyboardAvoidingView
        style={styles.rootModalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}>
          <StyledNoticeFilterLeftContainer>
            <StyledCloseButtonContainer></StyledCloseButtonContainer>

            <StyledColumnFieldContainer>
              <View style={{width: '100%', height: '8%', maxHeight: 25}}>
                <StyledHeaderText>Columns</StyledHeaderText>
              </View>
              <ScrollView style={{width: '100%', flex: 1}}>
                {noticeColumnView.map(
                  (field: INoticeTableDataColumn, index) => {
                    return (
                      <StyledColumnFieldSelectionContainer
                        key={`columnSelection#${index}`}>
                        <StyledColumnFieldSelectionButton
                          delayPressIn={0}
                          // onPress={() => {
                          //   handleCheckBoxTick(field);
                          //   console.log('PRESS PARENT');
                          // }}
                        >
                          <View
                            style={{
                              width: '15%',
                              height: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                              display: 'flex',
                            }}>
                            <BouncyCheckbox
                              isChecked={field.display}
                              onPress={checked => {
                                handleCheckBoxTick(field);
                                console.log('CHECK CHILD PRESS');
                              }}
                              size={12}
                              disableText={true}
                              iconStyle={{
                                borderRadius: 5,
                              }}
                              innerIconStyle={{borderRadius: 5}}
                              fillColor="#5E32DE"
                              unfillColor="white"
                            />
                          </View>
                          {/*IconBtn */}
                          <View
                            style={{
                              width: '85%',
                              height: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <NoticeFilterIconButton title={field.key} />
                          </View>
                        </StyledColumnFieldSelectionButton>
                      </StyledColumnFieldSelectionContainer>
                    );
                  },
                )}
              </ScrollView>
            </StyledColumnFieldContainer>

            {/*duedate*/}
            <StyledDueDateFieldContainer>
              <View style={{width: '100%', height: '8%'}}>
                <StyledHeaderText>Due Dates</StyledHeaderText>
              </View>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                {dueDateType.map((type, index) => {
                  //check if dueDate type is checked
                  let isTypeChecked = false;
                  //only check if the dueDateData field not empty
                  if (dueDateData.length > 0) {
                    //map through the peopleData
                    dueDateData.map(addedType => {
                      //check the id if match=> the user is chosen
                      if (addedType === type) isTypeChecked = true;
                    });
                  }
                  return (
                    <View
                      key={index}
                      style={{
                        width: '100%',
                        height: 40,
                        borderBottomColor: '#E6E6E6',
                        borderBottomWidth: 0.6,
                        backgroundColor: isTypeChecked
                          ? '#F1F2F5'
                          : 'transparent',
                      }}>
                      <TouchableOpacity
                        delayPressIn={0}
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                        }}
                        //handle press item
                        onPress={() => {
                          //check the length of duedate data if >0=> some types were added to the list
                          if (dueDateData.length > 0) {
                            let isdueTypeChosen: boolean = false;
                            //map through the list
                            dueDateData.map(typeAdded => {
                              //check if the type is existed in duedate list
                              if (type === typeAdded) isdueTypeChosen = true;
                            });
                            //duedate type existed=>remove from the list
                            if (isdueTypeChosen) {
                              let newDueDateTypeData: string[] = [];
                              dueDateData.map(addedType => {
                                if (addedType !== type)
                                  newDueDateTypeData.push(addedType);
                              });
                              setDueDateData([...newDueDateTypeData]);
                            }
                            //duedate type not existed=> add type to the list
                            else {
                              setDueDateData([...dueDateData, type]);
                            }
                          }
                          //dueDateData empty=> add duedate Type
                          else setDueDateData([...dueDateData, type]);
                        }}>
                        {/*IconBtn */}
                        <View
                          style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <NoticeFilterIconButton title={type} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </StyledDueDateFieldContainer>

            {/*status */}
            <View style={styles.bottomModalBody}></View>
          </StyledNoticeFilterLeftContainer>

          {/*Right side */}
          <View style={styles.rightColumnContainer}>
            {/*Icon Field */}
            <StyledCloseButtonContainer>
              <TouchableOpacity
                style={{
                  width: 19,
                  height: 19,
                  backgroundColor: '#F5F6F7',
                }}
                onPress={() => handleCloseNotice()}>
                <Icons.FilterCloseIcon />
              </TouchableOpacity>
            </StyledCloseButtonContainer>

            {/*people Field */}
            <View style={styles.topModalBody}>
              {/*Headers */}
              <View style={{width: '100%', height: '8%', maxHeight: 25}}>
                <StyledHeaderText>People</StyledHeaderText>
              </View>
              {userList.length === 0 ? (
                <StyledNoticeFilterEmptyUserAlertContainer>
                  <StyledNoticeFilterEmptyUserAlertText>
                    No User assigned for this project
                  </StyledNoticeFilterEmptyUserAlertText>
                </StyledNoticeFilterEmptyUserAlertContainer>
              ) : (
                <ScrollView
                  style={{width: '100%', height: '92%'}}
                  showsVerticalScrollIndicator={false}>
                  {userList.map((user, index) => {
                    //check if user is unchecked
                    let isUserChecked = false;
                    if (
                      filterList.assignedUsers &&
                      user.userId === filterList.assignedUsers
                    )
                      isUserChecked = true;
                    return (
                      <StyledNoticeFilterUsernameItemContainer
                        key={index}
                        style={{
                          opacity: isUserChecked ? 1 : 0.7,
                        }}>
                        <TouchableOpacity
                          delayPressIn={0}
                          onPress={() => handlePressUser(user)}>
                          {UserContainer(user.firstName, user.lastName)}
                        </TouchableOpacity>
                      </StyledNoticeFilterUsernameItemContainer>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NoticeFilter;

const styles = StyleSheet.create({
  rootModalContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  closeBtnContainer: {
    height: '10%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  topModalBody: {
    height: '100%',
    width: '100%',
  },
  middleModalBody: {
    height: '30%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  bottomModalBody: {
    height: '30%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  leftColumnContainer: {
    height: '100%',
    width: '50%',
    borderRightColor: '#E6E6E6',
    borderRightWidth: 0.6,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '3%',
  },
  rightColumnContainer: {
    height: '100%',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  btnIconContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: '15%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '85%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 1,
  },
  btnTextStyle: {
    fontFamily: 'Roboto_Mono',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  headerTextStyle: {
    fontFamily: 'Roboto_Mono',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#754EE0',
  },
  userDisplayContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  textPrefixStyle: {
    fontFamily: 'IBMPlexSans-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 11,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  textUserName: {
    fontFamily: 'IBMPlexSans-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 15,
    color: '#8C84A4',
    opacity: 0.8,
  },
});

//====================Small components====================

const UserContainer = (firstName?: string, lastName?: string) => {
  let prefixFirstName = firstName ? firstName.charAt(0).toUpperCase() : '';
  let prefixLastName = lastName ? lastName.charAt(0).toUpperCase() : '';
  return (
    <View style={styles.userDisplayContainer}>
      {/*username prefix */}
      <View
        style={{
          height: '100%',
          width: '25%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 35,
            height: 20,
            borderRadius: 35,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#927CD2',
          }}>
          <Text style={styles.textPrefixStyle}>{prefixFirstName}</Text>
          <Text style={styles.textPrefixStyle}>{prefixLastName}</Text>
        </View>
      </View>

      {/*user full name */}
      <View
        style={{
          height: '100%',
          width: '75%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <Text style={styles.textUserName}>
          {firstName ? firstName : ''} {lastName ? lastName : ''}
        </Text>
      </View>
    </View>
  );
};
