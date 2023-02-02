import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {NoticeHistory} from '../../../Models/notice';
import {
  RootHistoryItemContainer,
  StyledHistoryDescriptionText,
  StyledHistoryIndexText,
  StyledHistoryTimestampText,
  StyledHistoryUsernameText,
} from './StyledComponentsModalEditNoticeDetails';
import {
  INoticeBoardContext,
  NoticeBoardContext,
} from '../NoticeBoard/NoticeBoard';
import {User} from '../../../Models/user';
import {formatDate} from '../../../Utilities/FunctionHelpers';

type Props = {
  noticeHistory: NoticeHistory;
  historyIndex: number;
};

const HistoryItem = ({noticeHistory, historyIndex}: Props) => {
  const {userList} = useContext(NoticeBoardContext) as INoticeBoardContext;
  let editor: User = userList.filter(
    user => user.userId === noticeHistory.user,
  )[0];
  let timeStamp = new Date(noticeHistory.timeStamp as string);
  return (
    <RootHistoryItemContainer>
      {/*Order number */}
      <StyledHistoryIndexText>{historyIndex + 1})</StyledHistoryIndexText>

      {/*username */}
      <StyledHistoryUsernameText>
        {editor.firstName} {editor.lastName}
      </StyledHistoryUsernameText>

      {/*Date */}
      <StyledHistoryTimestampText numberOfLines={1}>
        {formatDate(noticeHistory.timeStamp as string, 'yyyy-MM-dd')} at{' '}
        {timeStamp.getHours() < 12
          ? timeStamp.getHours()
          : timeStamp.getHours() - 12}
        :00 {timeStamp.getHours() < 12 ? 'AM' : 'PM'}
      </StyledHistoryTimestampText>

      {/*Descriptioon */}
      <StyledHistoryDescriptionText numberOfLines={1}>
        {noticeHistory.longText}
      </StyledHistoryDescriptionText>
    </RootHistoryItemContainer>
  );
};

export default HistoryItem;
