import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  RootNoticeTitleCell,
  StyledTitleContainer,
  StyledTitleText,
} from './StyledComponentsNoticeBoard';
import {Notice} from '../../../Models/notice';
import Status from '../Status/Status';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import SwipableDeleteButton from '../../GeneralComponents/SwipableDeleteButton';
import {INoticeBoardContext, NoticeBoardContext} from './NoticeBoard';
import {useSocket} from '../../Provider/Sockets/useSocket';

type Props = {
  notice: Notice;
  setSelectedNotice: (notice: Notice | undefined) => void;
};

const NoticeTitleCell = ({notice, setSelectedNotice}: Props) => {
  const {handleDeleteNoticeApi} = useContext(
    NoticeBoardContext,
  ) as INoticeBoardContext;
  const handlePressNoticeTitle = () => {
    setSelectedNotice(notice);
  };

  return (
    <RootNoticeTitleCell>
      <Status notice={notice} type="notice" />
      <GestureHandlerRootView style={{flex: 1, height: '100%'}}>
        <Swipeable
          renderRightActions={dragX => {
            return (
              <SwipableDeleteButton
                dragX={dragX}
                noticeItem={{
                  notice: notice,
                  deleteFunction: handleDeleteNoticeApi,
                }}
                buttonWidth={80}
              />
            );
          }}
          containerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <StyledTitleContainer onPress={handlePressNoticeTitle}>
            <StyledTitleText numberOfLines={1}>
              {notice.description}
            </StyledTitleText>
          </StyledTitleContainer>
        </Swipeable>
      </GestureHandlerRootView>
    </RootNoticeTitleCell>
  );
};

export default NoticeTitleCell;

const styles = StyleSheet.create({});
