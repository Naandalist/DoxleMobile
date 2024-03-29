import {StyleSheet, Image, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoadingScreen from '../../Utilities/LottiesAnimation/LoadingScreen';
import InputForm from './InputForm';
import BottomNotificationBar, {
  INotificationMessage,
} from '../GeneralComponents/BottomNotificationBar';
import {BlurView} from '@react-native-community/blur';
import {authContextInterface, useAuth} from '../Provider/AuthProvider';
import {
  StyledLoginContainer,
  StyledLogoContainer,
  StyledRootLoginScreen,
  StyledTitleContainer,
} from './StyledComponentsLogin';

type Props = {};

const Login = ({navigation}: Props) => {
  const [loading, setloading] = useState<boolean>(true);
  const {loggedIn, isCheckingLogInStatus} = useAuth() as authContextInterface;
  const [notificationMessage, setnotificationMessage] = useState<
    INotificationMessage | undefined
  >(undefined);

  useEffect(() => {
    if (isCheckingLogInStatus === false) setloading(false);
  }, [isCheckingLogInStatus]);

  return (
    <StyledRootLoginScreen>
      {notificationMessage && (
        <BottomNotificationBar
          messageText={notificationMessage.messageText}
          messageType={notificationMessage.messageType}
          unmountControl={setnotificationMessage}
        />
      )}

      <StyledLoginContainer>
        <StyledLogoContainer>
          <Image
            source={require('../../../assets/images/doxle-logo.png')}
            style={{width: 47 * 2, height: 37 * 2}}
          />
        </StyledLogoContainer>
        <StyledTitleContainer>
          <Text style={styles.title}>Log In to Doxle</Text>
        </StyledTitleContainer>

        {/*Body with input and button */}
        <InputForm
          setloading={setloading}
          setnotificationMessage={setnotificationMessage}
          navigation={navigation}
        />
      </StyledLoginContainer>
      {loading && (
        <BlurView
          blurType="dark"
          blurAmount={4}
          style={styles.blurView}
          reducedTransparencyFallbackColor="white">
          <LoadingScreen />
        </BlurView>
      )}
    </StyledRootLoginScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Normal',
    color: '#5D4CC3',
  },
  blurView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
