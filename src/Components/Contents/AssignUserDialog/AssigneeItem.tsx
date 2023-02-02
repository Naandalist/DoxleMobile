import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {User} from '../../../Models/user';
import {
  StyledAssigneeNameText,
  StyledAssigneeSelectionContainer,
} from './StyledComponentsAssignUserDialog';
import {NewNotice, Notice} from '../../../Models/notice';

type Props = {
  isSelected: boolean;
  userInfo: User;
  edittedNotice?: Notice;
  setEdittedNotice?: (notice: Notice) => void;
  newNotice?: NewNotice;
  setNewNotice?: (newNotice: NewNotice) => void;
  setShowDialog: (show: boolean) => void;
  action: 'editNotice' | 'addNotice';
};

const AssigneeItem = ({
  isSelected,
  userInfo,
  edittedNotice,
  setEdittedNotice,
  setShowDialog,
  action,
  newNotice,
  setNewNotice,
}: Props) => {
  const handlePressAssignee = () => {
    //action for add notice
    if (action === 'addNotice' && newNotice && setNewNotice) {
      let newAssignUserList: string[] = [];
      if (newNotice.assignedUsers) {
        if (isSelected) {
          newAssignUserList = [
            ...newNotice.assignedUsers.filter(
              (user: string) => user !== userInfo.userId,
            ),
          ];
        } else {
          newAssignUserList = [
            ...newNotice.assignedUsers,
            userInfo.userId as string,
          ];
        }
      }
      //update state of new Notice
      setNewNotice({
        ...newNotice,
        assignedUsers: [...newAssignUserList],
      });
      setShowDialog(false);
    }
    //action for edit notice
    if (action === 'editNotice' && edittedNotice && setEdittedNotice) {
      //if user is existed
      let newAssignUserList: User[] = [];
      if (edittedNotice.assignedUsers) {
        if (isSelected) {
          newAssignUserList = [
            ...edittedNotice.assignedUsers.filter(
              (user: User) => user.userId !== userInfo.userId,
            ),
          ];
        } else {
          newAssignUserList = [...edittedNotice.assignedUsers, userInfo];
        }
      }
      //update state of new Notice
      setEdittedNotice({
        ...edittedNotice,
        assignedUsers: [...newAssignUserList],
      });
      setShowDialog(false);
    }
  };
  return (
    <StyledAssigneeSelectionContainer
      style={{
        opacity: isSelected ? 1 : 0.6,
      }}>
      <TouchableOpacity
        delayPressIn={0}
        onPress={handlePressAssignee}
        style={{
          height: '100%',
          width: 180,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <StyledAssigneeNameText>
          {userInfo.firstName} {userInfo.lastName}
        </StyledAssigneeNameText>
      </TouchableOpacity>
    </StyledAssigneeSelectionContainer>
  );
};

export default AssigneeItem;

const styles = StyleSheet.create({});
