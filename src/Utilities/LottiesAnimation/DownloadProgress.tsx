import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

type Props = {};

const DownloadProgress = (props: Props) => {
  return (
    <View style={styles.rootContainer}>
      <LottieView
        autoPlay
        style={{
          width: 140,
          height: 140,
          backgroundColor: 'transparent',
        }}
        source={
          Platform.OS === 'ios'
            ? require('../../assets/ProgressDownload.json')
            : require('../../assets/Loading.json')
        }
      />
      <View>
        <Text style={styles.textInfoStyle}>Downloading...</Text>
      </View>
    </View>
  );
};

export default DownloadProgress;

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10000,

    display: 'flex',
    flexDirection: 'column',
  },
  textInfoStyle: {
    color: '#6E0BBC',
    fontFamily: 'RobotoMono-Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',

    position: 'absolute',
    top: -35,
    left: -65,
  },
});
