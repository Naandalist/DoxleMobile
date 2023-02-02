import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import LoadingScreen from '../../Utilities/LottiesAnimation/LoadingScreen';
import {DoxleLogo} from './LoginIcon';
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
} from './StyledComponentsLogin';
type Props = {};

const Login = ({}: Props) => {
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
        {/*Logo section */}
        <StyledLogoContainer>
          <DoxleLogo />
        </StyledLogoContainer>

        {/*Body with input and button */}
        <InputForm
          setloading={setloading}
          setnotificationMessage={setnotificationMessage}
        />
      </StyledLoginContainer>
      {loading && (
        <BlurView
          blurType="dark"
          blurAmount={4}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          reducedTransparencyFallbackColor="white">
          <LoadingScreen />
        </BlurView>
      )}
    </StyledRootLoginScreen>
  );
};

export default Login;

const styles = StyleSheet.create({});
