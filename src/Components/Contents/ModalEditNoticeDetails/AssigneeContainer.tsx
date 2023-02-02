import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NORMAL_CONTENT_FONT_FAMILY} from '../../../Utilities/constants';

type Props = {assigneeName: string};

const AssigneeContainer = ({assigneeName}: Props) => {
  return (
    <View style={{height: 26, padding: 3}}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(146, 124, 210)',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          paddingLeft: 2,
          paddingRight: 2,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 8,
            fontFamily: NORMAL_CONTENT_FONT_FAMILY,
            fontStyle: 'normal',
            lineHeight: 9,
          }}>
          {assigneeName}
        </Text>
      </View>
    </View>
  );
};

export default AssigneeContainer;
