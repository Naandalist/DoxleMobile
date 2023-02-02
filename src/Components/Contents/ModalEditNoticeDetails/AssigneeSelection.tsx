import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {User} from '../../../../Models/user';
import {Notice} from '../../../../Models/notice';

type Props = {
  selectedUser: User;
  edittedNotice: Notice;
  setEdittedNotice: Function;
  controlDialogShow: Function;
};

const AssigneeSelection = ({
  selectedUser,
  edittedNotice,
  setEdittedNotice,
  controlDialogShow,
}: Props) => {
  let isExisted = false;
  if (edittedNotice.assignedUsers) {
    for (let i = 0; i < edittedNotice.assignedUsers?.length; i++) {
      if (selectedUser.userId === edittedNotice.assignedUsers[i].userId)
        isExisted = true;
    }
  }
  return (
    <View
      style={{
        height: 35,
        width: '60%',
        backgroundColor: 'rgb(146, 124, 210)',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        opacity: isExisted ? 1 : 0.6,
      }}>
      <TouchableOpacity
        delayPressIn={0}
        onPress={() => {
          //if user is existed
          let newAssignUserList: User[] = [];
          if (edittedNotice.assignedUsers) {
            if (isExisted) {
              newAssignUserList = [
                ...edittedNotice.assignedUsers.filter(
                  (user: User) => user.userId !== selectedUser.userId,
                ),
              ];
            } else {
              newAssignUserList = [
                ...edittedNotice.assignedUsers,
                selectedUser,
              ];
            }
          }
          //update state of new Notice
          setEdittedNotice({
            ...edittedNotice,
            assignedUsers: [...newAssignUserList],
          });

          controlDialogShow(false);
        }}
        style={{
          height: '100%',
          width: 180,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 10,
            fontFamily: 'Roboto_Mono',
            fontStyle: 'normal',
            lineHeight: 11,
          }}>
          {selectedUser.firstName} {selectedUser.lastName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AssigneeSelection;

const styles = StyleSheet.create({});
