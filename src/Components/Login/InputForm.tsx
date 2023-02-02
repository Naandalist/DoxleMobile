import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ContinueIcon, PasswordIcon} from './LoginIcon';
import {authContextInterface, useAuth} from '../Provider/AuthProvider';
import {
  ContinueText,
  StyledContinueButton,
  StyledFormButtonContainer,
  StyledRootInputFormContainer,
  StyledTextInput,
  StyledTextInputContainer,
} from './StyledComponentsLogin';

type Props = {setloading: Function; setnotificationMessage: Function};

const InputForm = ({setloading, setnotificationMessage}: Props) => {
  const {loginWithDetails} = useAuth() as authContextInterface;
  interface ILoginInput {
    email: string;
    password: string;
  }

  const [loginInput, setloginInput] = useState<ILoginInput>({
    email: '',
    password: '',
  });
  const [currentInputScreen, setcurrentInputScreen] = useState<
    'email' | 'password'
  >('email');

  const handleContinueButton = () => {
    if (loginInput.email === '')
      Alert.alert('Empty Email Input Field', 'Please Enter Your Email');
    else {
      setcurrentInputScreen('password');
    }
  };

  const handleLoginButton = async () => {
    setloading(true);
    try {
      const result = await loginWithDetails({
        user: loginInput.email,
        password: loginInput.password,
      });
      if (result) {
        setloading(false);
        setnotificationMessage({
          messageText: 'Logged In Successfully',
          messageType: 'success',
        });
      }
      //if password wrong => show error password
      else {
        setloading(false);
        // Alert.alert('Username or Password Wrong!', 'Please Try Again', [
        //   {
        //     text: 'OK',
        //     onPress: () => setcurrentInputScreen('email'),
        //   },
        // ]);
        setnotificationMessage({
          messageText: 'Username Or Password Wrong, Try Again!',
          messageType: 'error',
        });
      }
    } catch (err: any) {
      setnotificationMessage({
        messageText: 'Something Wrong, Please try again',
        messageType: 'error',
      });
    }
  };

  const handleTextInputChange = (text: string) => {
    if (currentInputScreen === 'email') {
      let newInput = {...loginInput, email: text};
      setloginInput(newInput);
    } else {
      let newInput = {...loginInput, password: text};
      setloginInput(newInput);
    }
  };

  return (
    <StyledRootInputFormContainer>
      <StyledTextInputContainer>
        {currentInputScreen === 'email' ? (
          <StyledTextInput
            focusable={true}
            secureTextEntry={false}
            onChangeText={handleTextInputChange}
            value={loginInput.email}
            placeholder="Enter your username"
            placeholderTextColor="#89819E"
          />
        ) : (
          <StyledTextInput
            secureTextEntry={true}
            onChangeText={handleTextInputChange}
            value={loginInput.password}
            placeholder="Enter your password"
            placeholderTextColor="#89819E"
            blurOnSubmit={false}
          />
        )}
      </StyledTextInputContainer>

      {/*btn field */}
      <StyledFormButtonContainer>
        {currentInputScreen === 'email' ? (
          <StyledContinueButton
            delayPressIn={0}
            style={{
              backgroundColor: loginInput.email !== '' ? '#5A36BE' : 'black',
            }}
            onPress={() => {
              handleContinueButton();
            }}>
            <ContinueText style={{fontFamily: 'RobotoMono-Regular'}}>
              Continue
            </ContinueText>
            <ContinueIcon />
          </StyledContinueButton>
        ) : (
          <StyledContinueButton
            delayPressIn={0}
            style={{
              backgroundColor: loginInput.password !== '' ? '#5A36BE' : 'black',
            }}
            onPress={() => {
              handleLoginButton();
            }}>
            <ContinueText>Login</ContinueText>
            <PasswordIcon />
          </StyledContinueButton>
        )}
      </StyledFormButtonContainer>
    </StyledRootInputFormContainer>
  );
};

export default React.memo(InputForm);

const styles = StyleSheet.create({});
