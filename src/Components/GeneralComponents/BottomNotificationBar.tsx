import {Animated, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
type Props = {
  messageText: string;
  unmountControl: Function;
  messageType: 'success' | 'error';
};
export interface INotificationMessage {
  messageText: string;
  messageType: 'error' | 'success';
}
const BottomNotificationBar = ({
  messageText,
  unmountControl,
  messageType,
}: Props) => {
  //########### STYLED COMPONENTS #################

  useEffect(() => {
    expandIn();

    setTimeout(() => {
      unmountControl(undefined);
    }, 4000);
  }, []);

  const expandWidthValue = new Animated.Value(0);
  const opacityValue = new Animated.Value(0);
  const expandIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(expandWidthValue, {
      toValue: 250,
      duration: 400,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) fadeIn();
    });
  };
  const fadeIn = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 600,

      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) fadeOut();
    });
  };
  const fadeOut = () => {
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 600,
      delay: 1000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) expandOut();
    });
  };
  const expandOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(expandWidthValue, {
      toValue: 0,
      duration: 300,

      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) unmountControl(undefined);
    });
  };

  return (
    <Animated.View
      style={[
        styles.rootContainer,
        {
          width: expandWidthValue,
          backgroundColor: messageType === 'success' ? '#5A36BE' : 'red',
        },
      ]}>
      <Animated.Text style={[styles.messageTextStyle, {opacity: opacityValue}]}>
        {messageText}
      </Animated.Text>
    </Animated.View>
  );
};

export default BottomNotificationBar;

const styles = StyleSheet.create({
  messageTextStyle: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    width: '100%',
    textAlignVertical: 'center',
  },
  rootContainer: {
    position: 'absolute',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    bottom: 24.5,
    zIndex: 100000000,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
});
