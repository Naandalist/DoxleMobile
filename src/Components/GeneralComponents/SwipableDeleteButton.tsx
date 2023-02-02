import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Notice} from '../../Models/notice';
import {BUTTON_FONT_FAMILY} from '../../Utilities/constants';
import {Permit} from '../../Models/permit';
import {Checklist} from '../../Models/checklist';

interface INoticeItem {
  notice: Notice;
  deleteFunction: (noticeId: string) => Promise<void>;
}
interface INoticePermitItem {
  checklist: Checklist;
  deleteFunction: (checklistId: string) => Promise<void>;
}
type Props = {
  buttonWidth: number;
  noticeItem?: INoticeItem; //used to delete notice
  PermitItem?: INoticePermitItem; //used to delete checklist in notice
  dragX: Animated.AnimatedInterpolation<string | number>;
};

const SwipableDeleteButton = ({
  buttonWidth,
  noticeItem,
  dragX,
  PermitItem,
}: Props) => {
  let scale = noticeItem
    ? dragX.interpolate({
        inputRange: [0, buttonWidth],
        outputRange: [0, 100],
        extrapolate: 'clamp',
      })
    : dragX.interpolate({
        inputRange: [-buttonWidth, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });

  const handlePressDeleteButton = () => {
    if (noticeItem) {
      noticeItem.deleteFunction(noticeItem.notice.noticeId);
    }

    if (PermitItem) {
      PermitItem.deleteFunction(PermitItem.checklist.checklistId as string);
    }
  };
  return (
    <TouchableOpacity
      delayPressIn={0}
      onPress={handlePressDeleteButton}
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        zIndex: 1000,
      }}>
      <Animated.View
        style={{
          backgroundColor: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90%',
          width: buttonWidth,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          // transform: [
          //   {
          //     translateX: dragX.interpolate({
          //       inputRange: [-buttonWidth, 0],
          //       outputRange: [buttonWidth, 0],

          //       extrapolate: 'clamp',
          //     }),
          //   },
          // ],
        }}>
        <Animated.Text
          style={[
            {
              fontFamily: `${BUTTON_FONT_FAMILY}`,
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: 12,
              lineHeight: 14,
              color: 'white',
            },
            {transform: [{scale}]},
          ]}>
          Delete
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SwipableDeleteButton;

const styles = StyleSheet.create({});
