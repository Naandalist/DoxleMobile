import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RootStatusBoardDisplayerContainer} from './StyledComponentsStatus';
import {
  DOXLE_STATUS_VALUES,
  IStatusButton,
  STATUS_COLOR_CODE,
} from '../../../Utilities/constants';

type Props = {
  selectStatusFunction: (item: IStatusButton) => void;
};

const StatusBoardDisplayer = ({selectStatusFunction}: Props) => {
  return (
    <RootStatusBoardDisplayerContainer>
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {DOXLE_STATUS_VALUES.map((item, index) => {
          let colorValue: string = '';
          if (STATUS_COLOR_CODE[item.value])
            colorValue = STATUS_COLOR_CODE[item.value];
          else colorValue = STATUS_COLOR_CODE.DEFAULT;
          return (
            <View
              style={{
                width: `${100 / DOXLE_STATUS_VALUES.length}%`,
                height: '100%',
                backgroundColor: 'transparent',
              }}
              key={index}>
              <TouchableOpacity
                delayPressIn={0}
                onPress={() => selectStatusFunction(item)}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/*Circle */}

                <View
                  style={{
                    width: 19,
                    height: 19,
                    borderRadius: 9.5,
                    borderColor: `${colorValue}`,
                    borderWidth: 3.5,
                  }}></View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/*Close Btn field */}
      {/* <View
            style={{
              width: '100%',
              height: '40%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopWidth: 1,
              borderTopColor: 'rgb(224, 224, 224)',
            }}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => {
                setShowChangeStatusBoard(false);
              }}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View> */}
    </RootStatusBoardDisplayerContainer>
  );
};

export default StatusBoardDisplayer;

const styles = StyleSheet.create({});
