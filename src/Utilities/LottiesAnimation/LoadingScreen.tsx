import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
type Props = {
  message?: string;
};

const LoadingScreen = ({message}: Props) => {
  const dogQuotes = [
    'Dogs noses are wet to help absorb scent chemicals',
    'Newfoundlands are amazing lifeguards',
    'The Beatles song ‘A Day in the Life’ has a frequency only dogs can hear',
    'Three dogs survived the Titanic sinking',
  ];
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
      {message ? <Text>{message}</Text> : null}
      <LottieView
        autoPlay
        style={{
          width: 300,
          height: 230,
          backgroundColor: 'transparent',
        }}
        source={require('../../../assets/Loading.json')}
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
            fontFamily: 'RobotoMono-Regular',
            textAlign: 'center',
            height: '100%',
            width: '100%',
          }}>
          {dogQuotes[Math.floor(Math.random() * dogQuotes.length)]}
        </Text>
      </View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
