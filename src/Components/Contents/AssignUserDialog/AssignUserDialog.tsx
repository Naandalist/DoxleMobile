import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {User} from '../../../Models/user';
import Dialog from 'react-native-dialog';
import {NewNotice, Notice} from '../../../Models/notice';

import {TITLE_FONT_FAMILY} from '../../../Utilities/constants';
import {
  StyledAssigneeNameText,
  StyledAssigneeSelectionContainer,
} from './StyledComponentsAssignUserDialog';
import AssigneeItem from './AssigneeItem';
type Props = {
  userList: User[];
  dialogHeight: number;
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;

  newNotice?: NewNotice;
  setNewNotice?: (data: NewNotice) => void;
  edittedNotice?: Notice;
  setEdittedNotice?: (notice: Notice) => void;
  action: 'editNotice' | 'addNotice';
};

const AssignUserDialog = ({
  userList,
  dialogHeight,
  showDialog,

  newNotice,
  setNewNotice,
  setShowDialog,
  action,
  edittedNotice,
  setEdittedNotice,
}: Props) => {
  const checkUserSelected = (
    user: User,
    action: 'editNotice' | 'addNotice',
  ) => {
    let isSelected: boolean = false;
    if (action === 'addNotice' && newNotice && newNotice.assignedUsers) {
      isSelected = newNotice.assignedUsers.some(
        assignedUser => assignedUser === user.userId,
      );
    }

    if (
      action === 'editNotice' &&
      edittedNotice &&
      edittedNotice.assignedUsers
    ) {
      isSelected = edittedNotice.assignedUsers.some(
        assignedUser => assignedUser.userId === user.userId,
      );
    }
    return isSelected;
  };
  // const AssigneeSelection = (selectedUser: User, index: number) => {
  //   let isExisted = false;
  //   if (newNotice.assignedUsers) {
  //     for (let i = 0; i < newNotice.assignedUsers?.length; i++) {
  //       if (selectedUser.userId === newNotice.assignedUsers[i])
  //         isExisted = true;
  //     }
  //     return (
  //       <StyledAssigneeSelectionContainer
  //         key={`assignee#${index}`}
  //         style={{
  //           opacity: isExisted ? 1 : 0.6,
  //         }}>
  //         <TouchableOpacity
  //           delayPressIn={0}
  //           onPress={() => {
  //             //if user is existed
  //             let newAssignUserList: string[] = [];
  //             if (newNotice.assignedUsers) {
  //               if (isExisted) {
  //                 newAssignUserList = [
  //                   ...newNotice.assignedUsers.filter(
  //                     (user: string) => user !== selectedUser.userId,
  //                   ),
  //                 ];
  //               } else {
  //                 newAssignUserList = [
  //                   ...newNotice.assignedUsers,
  //                   selectedUser.userId as string,
  //                 ];
  //               }
  //             }
  //             //update state of new Notice
  //             setNewNotice({
  //               ...newNotice,
  //               assignedUsers: [...newAssignUserList],
  //             });
  //             setShowDialog(false);
  //           }}
  //           style={{
  //             height: '100%',
  //             width: 180,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //           }}>
  //           <StyledAssigneeNameText>
  //             {selectedUser.firstName} {selectedUser.lastName}
  //           </StyledAssigneeNameText>
  //         </TouchableOpacity>
  //       </StyledAssigneeSelectionContainer>
  //     );
  //   }
  // };
  const handleCancelButton = () => {
    setShowDialog(false);
  };
  return (
    <Dialog.Container
      visible={showDialog}
      contentStyle={{
        height: dialogHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}
      buttonSeparatorStyle={false}
      verticalButtons={true}
      onBackdropPress={() => setShowDialog(false)}>
      <Dialog.Title style={{fontFamily: TITLE_FONT_FAMILY}}>
        Add Assignee
      </Dialog.Title>
      <ScrollView
        style={{flex: 1, paddingBottom: 8}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {userList.map((user, index) => {
          return action === 'addNotice' && newNotice && setNewNotice ? (
            <AssigneeItem
              key={`addNoticeUser#${index}`}
              action={action}
              userInfo={user}
              isSelected={checkUserSelected(user, 'addNotice')}
              setShowDialog={setShowDialog}
              newNotice={newNotice}
              setNewNotice={setNewNotice}
            />
          ) : action === 'editNotice' ? (
            <AssigneeItem
              key={`editNoticeUser#${index}`}
              action={action}
              userInfo={user}
              isSelected={checkUserSelected(user, 'editNotice')}
              setShowDialog={setShowDialog}
              edittedNotice={edittedNotice}
              setEdittedNotice={setEdittedNotice}
            />
          ) : (
            <></>
          );
        })}
      </ScrollView>
      <Dialog.Button label="Cancel" onPress={handleCancelButton} />
    </Dialog.Container>
  );
};

export default React.memo(AssignUserDialog);

const styles = StyleSheet.create({});
