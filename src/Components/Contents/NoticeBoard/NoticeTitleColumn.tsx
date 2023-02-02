import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useContext} from 'react';
import {Notice} from '../../../Models/notice';
import {
  RootNoticeTitleCell,
  RootNoticeTitleColumnContainer,
} from './StyledComponentsNoticeBoard';
import {INoticeBoardContext, NoticeBoardContext} from './NoticeBoard';
import {
  IOrientation,
  useOrientation,
} from '../../Provider/Orientation/OrientationContext';
import NoticeTitleCell from './NoticeTitleCell';

type Props = {
  notices: Notice[];
  setSelectedNotice: (notice: Notice | undefined) => void;
};
const EmptyData: Notice[] = Array(10).fill({
  noticeId: 'emptyRow',
  company: '',
  description: '',
  pinned: false,
  status: '',
  timeStamp: '',
});
const NoticeTitleColumn = ({notices, setSelectedNotice}: Props) => {
  //*************Handle Orientation*************** */
  const useOri = useOrientation() as IOrientation;
  const {deviceSize} = useOri;
  //*********************************************** */
  return (
    <RootNoticeTitleColumnContainer
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
      }}
      data={notices.length < 14 ? [...notices, ...EmptyData] : notices}
      renderItem={({item}) => {
        if ((item as Notice).noticeId !== 'emptyRow')
          return (
            <NoticeTitleCell
              notice={item as Notice}
              setSelectedNotice={setSelectedNotice}
            />
          );
        else return <RootNoticeTitleCell></RootNoticeTitleCell>;
      }}
      initialNumToRender={14}
      keyExtractor={(item, index) =>
        `dataTitleCell#${(item as Notice).noticeId}#${index}`
      }
      scrollEnabled={false}
    />
  );
};

export default React.memo(NoticeTitleColumn);

const styles = StyleSheet.create({});
