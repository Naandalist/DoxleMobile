import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {INoticeBoardContext, NoticeBoardContext} from './NoticeBoard';
import {
  StyledDataKeyHeaderCell,
  StyledDataKeyHeaderContainer,
  StyledItemFlatlistContainer,
  StyledNoticeTableBody,
  StyledNoticeTableHeaderContainer,
  StyledRootContainer,
  StyledTitleHeaderContainer,
  StyledTitleHeaderText,
} from './StyledComponentsNoticeBoard';
import {
  IOrientation,
  useOrientation,
} from '../../Provider/Orientation/OrientationContext';
import NoticeTitleColumn from './NoticeTitleColumn';
import {Notice} from '../../../Models/notice';
import NoticeDataColumn from './NoticeDataColumn';
import {BlurView} from '@react-native-community/blur';
import ModalEditNoticeDetails from '../ModalEditNoticeDetails/ModalEditNoticeDetails';
import {Company} from '../../../Models/company';
import ListLoadingMore from '../../../Utilities/LottiesAnimation/ListLoadingMore';

type Props = {
  company: Company;
  notices: Notice[];
  fetchNextPageNotices: (urlPath: string) => Promise<void>;
  nextFetchingBatch: string | null;
};

const NoticeTable = ({
  company,
  notices,
  fetchNextPageNotices,
  nextFetchingBatch,
}: Props) => {
  const {noticeColumnView} = useContext(
    NoticeBoardContext,
  ) as INoticeBoardContext;
  //state to store ref of the scrollable header to control scroll effect
  const [headerScrollViewRef, setheaderScrollViewRef] =
    useState<ScrollView | null>(null);

  const [selectedNotice, setSelectedNotice] = useState<Notice | undefined>(
    undefined,
  );
  const [onLoadingMore, setonLoadingMore] = useState<boolean>(false);
  //*************Handle Orientation*************** */
  const useOri = useOrientation() as IOrientation;
  const {deviceSize} = useOri;
  //*********************************************** */
  // console.log('RERENDER TABLE on Platform ', Platform.OS);
  useEffect(() => {
    setonLoadingMore(false);
  }, [notices]);

  const handleLoadMoreNotices = () => {
    if (nextFetchingBatch) {
      setonLoadingMore(true);
      fetchNextPageNotices(nextFetchingBatch);
    }
  };
  return (
    <StyledRootContainer>
      <ModalEditNoticeDetails
        selectedNotice={selectedNotice}
        setSelectedNotice={setSelectedNotice}
        company={company}
      />
      <StyledNoticeTableHeaderContainer>
        <StyledTitleHeaderContainer
          style={{
            width:
              deviceSize.deviceWidth < 600
                ? //phone size
                  '80%' //!CHANGE BACK
                : //tablet size
                deviceSize.deviceWidth > 800
                ? '36%'
                : //tablet mini
                  '50%',
          }}>
          <StyledTitleHeaderText>Notices</StyledTitleHeaderText>
        </StyledTitleHeaderContainer>

        <StyledDataKeyHeaderContainer
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          ref={scrollView => setheaderScrollViewRef(scrollView)}
          scrollEventThrottle={0}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {noticeColumnView.map((column, index) => {
            if (column.display === true)
              return (
                <StyledDataKeyHeaderCell key={`columnHeader#${index}`}>
                  {column.name}
                </StyledDataKeyHeaderCell>
              );
          })}
        </StyledDataKeyHeaderContainer>
      </StyledNoticeTableHeaderContainer>
      <StyledNoticeTableBody
        showsVerticalScrollIndicator={false}
        data={[notices] as Array<Notice[]>}
        renderItem={({item, index}) => {
          return (
            <StyledItemFlatlistContainer key={`itemFlatlist#${index}`}>
              <NoticeTitleColumn
                notices={item as Notice[]}
                setSelectedNotice={setSelectedNotice}
              />

              <NoticeDataColumn
                notices={item as Notice[]}
                headerScrollRef={headerScrollViewRef}
              />
            </StyledItemFlatlistContainer>
          );
        }}
        keyExtractor={(item, index) => `rootTableDataList#${index}`}
        onEndReachedThreshold={0.7}
        onEndReached={handleLoadMoreNotices}
      />
      {notices.length === 0 && (
        <BlurView blurType="light" blurAmount={1} style={styles.blurView}>
          <Text style={styles.emptyNoticeTextStyle}>No notice</Text>
        </BlurView>
      )}

      {onLoadingMore && (
        <View
          style={{
            height: 80,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(156, 153, 152,0.2)',
          }}>
          <ListLoadingMore />
        </View>
      )}
    </StyledRootContainer>
  );
};

export default React.memo(NoticeTable);

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 20,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyNoticeTextStyle: {
    fontFamily: 'IBMPlexMono-Medium',
    fontSize: 20,
    lineHeight: 22,
    textTransform: 'uppercase',
  },
});

//##############################STYLED COMPONENT#########################

//##############################################################
