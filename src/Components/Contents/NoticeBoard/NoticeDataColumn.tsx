import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  RootNoticeDataHorizontalScrollColumn,
  StyledDataCell,
  StyledDataFlatlist,
  StyledDataRow,
  StyledDataText,
} from './StyledComponentsNoticeBoard';
import {Notice} from '../../../Models/notice';
import {INoticeBoardContext, NoticeBoardContext} from './NoticeBoard';
import {formatDate} from '../../../Utilities/FunctionHelpers';

type Props = {
  notices: Notice[];
  headerScrollRef: ScrollView | null;
};
const EmptyData: Notice[] = Array(10).fill({
  noticeId: 'emptyRow',
  company: '',
  description: '',
  pinned: false,
  status: '',
  timeStamp: '',
});
const NoticeDataColumn = ({notices, headerScrollRef}: Props) => {
  const {noticeColumnView} = useContext(
    NoticeBoardContext,
  ) as INoticeBoardContext;

  const controlScrollHeader = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (headerScrollRef) {
      headerScrollRef.scrollTo({
        x: e.nativeEvent.contentOffset.x,
        animated: true,
      });
    }
  };

  return (
    <RootNoticeDataHorizontalScrollColumn
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onScroll={scrollEvent => controlScrollHeader(scrollEvent)}
      scrollEventThrottle={0}>
      <StyledDataFlatlist
        data={notices.length < 14 ? [...notices, ...EmptyData] : notices}
        renderItem={({item, index}) => {
          return (
            <StyledDataRow>
              {noticeColumnView.map((column, index) => {
                if (column.display)
                  if (
                    (item as Notice)[column.key] &&
                    (item as Notice).noticeId !== 'emptyRow'
                  ) {
                    return (
                      <StyledDataCell
                        key={`dataCell#${(item as Notice).noticeId}#${index}`}
                        style={[
                          index < notices.length - 1
                            ? {
                                borderRightColor: 'rgba(199, 180, 252,.5)',
                                borderRightWidth: 0.8,
                              }
                            : null,
                        ]}>
                        <StyledDataText>
                          {column.key === 'dueDate' ||
                          column.key === 'startDate'
                            ? formatDate(
                                (item as Notice)[column.key] as string,
                                'dd-MM-yy',
                              )
                            : (item as Notice)[column.key]?.toString()}
                        </StyledDataText>
                      </StyledDataCell>
                    );
                  } else
                    return (
                      <StyledDataCell
                        key={`dataCell#${(item as Notice).noticeId}#${index}`}
                        style={[
                          index < notices.length - 1
                            ? {
                                borderRightColor: 'rgba(199, 180, 252,.5)',
                                borderRightWidth: 0.8,
                              }
                            : null,
                        ]}></StyledDataCell>
                    );
              })}
            </StyledDataRow>
          );
        }}
        keyExtractor={(item, index) =>
          `dataRow#${(item as Notice).noticeId}#${index}`
        }
        initialNumToRender={14}
        scrollEnabled={false}
      />
    </RootNoticeDataHorizontalScrollColumn>
  );
};

export default React.memo(NoticeDataColumn);

const styles = StyleSheet.create({});
