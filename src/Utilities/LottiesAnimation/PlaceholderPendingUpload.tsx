import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
type Props = {};

const PlaceholderPendingUpload = (props: Props) => {
  return (
    <View style={styles.rootContainer}>
      <LottieView
        autoPlay
        style={{
          width: 72,
          height: 72,
          backgroundColor: 'transparent',
        }}
        source={require('../../assets/LoadingClock.json')}
      />
      <View>
        <Text style={styles.textInfoStyle}>Uploading...</Text>
      </View>
    </View>
  );
};

export default PlaceholderPendingUpload;

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfoStyle: {
    color: '#6E0BBC',
    fontFamily: 'RobotoMono-Regular',
    fontSize: 15,
    lineHeight: 18,
    textAlign: 'center',

    position: 'absolute',
    top: -5,
    left: -55,
  },
});
