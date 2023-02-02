import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {INoticeTableDataColumn} from './NoticeBoard';
import {Notice} from '../../../Models/notice';

type Props = {
  columnView: INoticeTableDataColumn[];
  notice: Notice;
};

const NoticeDataRow = ({columnView, notice}: Props) => {
  return (
    <View>
      <Text>NoticeDataRow</Text>
    </View>
  );
};

export default NoticeDataRow;

const styles = StyleSheet.create({});
