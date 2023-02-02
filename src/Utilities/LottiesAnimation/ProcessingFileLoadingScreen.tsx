import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {TITLE_FONT_FAMILY} from '../constants';
type Props = {
  message: string;
};

const ProcessingFileLoadingScreen = ({message}: Props) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <LottieView
        autoPlay
        style={{
          width: 300,
          height: 230,
          backgroundColor: 'transparent',
        }}
        source={require('../../../assets/Processing.json')}
      />
      <View
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#b5bdc5',
            fontFamily: TITLE_FONT_FAMILY,
            textAlign: 'center',
            height: '100%',
            width: '100%',
          }}>
          {message}
        </Text>
      </View>
    </View>
  );
};

export default ProcessingFileLoadingScreen;

const styles = StyleSheet.create({});
