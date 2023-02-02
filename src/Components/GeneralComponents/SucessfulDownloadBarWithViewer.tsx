import {
  Animated,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

export interface INotificationControlProps {
  messageText: string;
  urlPathForView: string;
}
type Props = {
  controlProps: INotificationControlProps;
  unmountControl: Function;
};

const SucessfulDownloadBarWithViewer = ({
  controlProps,
  unmountControl,
}: Props) => {
  const animatedOpacityValue = new Animated.Value(0);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(animatedOpacityValue, {
      toValue: 250,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(animatedOpacityValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  useEffect(() => {
    fadeIn();
    setTimeout(() => {
      fadeOut();
      setTimeout(() => {
        unmountControl(undefined);
      }, 800);
    }, 5000);
  }, []);
  return (
    <Animated.View
      style={[styles.rootContainer, {width: animatedOpacityValue}]}>
      <Text style={styles.messageTextStyle}>{controlProps.messageText}</Text>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(controlProps.urlPathForView);
          unmountControl(undefined);
        }}>
        <Text style={styles.viewFileTextStyle}>View File</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SucessfulDownloadBarWithViewer;

const styles = StyleSheet.create({
  viewFileTextStyle: {
    color: '#afcaff',
    fontFamily: 'RobotoMono-Regular',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',

    textAlignVertical: 'center',
    paddingLeft: 18,
  },
  messageTextStyle: {
    color: 'white',
    fontFamily: 'RobotoMono-Regular',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',

    textAlignVertical: 'center',
  },
  rootContainer: {
    position: 'absolute',

    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A36BE',
    right: 0,
    bottom: 24.5,
    zIndex: 100000000,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
});
