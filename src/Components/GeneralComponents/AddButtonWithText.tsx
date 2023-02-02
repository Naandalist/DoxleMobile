import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MenuFileAddFolderIcon} from '../Contents/NoticeBoard/NoticeBoardIcon';
import {BUTTON_FONT_FAMILY} from '../../Utilities/constants';

type Props = {
  title: string;
  width: number;
  height: number;
  color?: string;
};

const AddButtonWithText = ({title, width, height, color}: Props) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: color ? color : ' rgba(76, 43, 167, 0.8)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
      }}>
      <View
        style={{
          width: '30%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <MenuFileAddFolderIcon />
      </View>
      <View
        style={{
          width: '70%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: `${BUTTON_FONT_FAMILY}`,
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 9,
            lineHeight: 11,
            color: '#FFFFFF',
            textAlign: 'left',
            width: '100%',
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default AddButtonWithText;

const styles = StyleSheet.create({});
