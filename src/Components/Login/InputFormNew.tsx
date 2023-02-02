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
        <View style={styles.inputWrapper}>
          <StyledTextInput
            focusable={true}
            secureTextEntry={false}
            onChangeText={handleTextInputChange}
            value={loginInput.email}
            placeholder="Username"
            placeholderTextColor="#C2CBE7"
          />
        </View>
        <View style={{margin: 2}} />
        <View style={styles.inputWrapper}>
          <StyledTextInput
            secureTextEntry={true}
            onChangeText={handleTextInputChange}
            value={loginInput.password}
            placeholder="Password"
            placeholderTextColor="#C2CBE7"
            blurOnSubmit={false}
          />
        </View>
      </StyledTextInputContainer>

      <View style={{margin: 30}} />

      {/*btn field */}
      <StyledFormButtonContainer>
        <StyledContinueButton
          delayPressIn={0}
          style={styles.btn}
          onPress={() => {
            handleLoginButton();
          }}>
          <ContinueText>Login</ContinueText>
        </StyledContinueButton>
      </StyledFormButtonContainer>
    </StyledRootInputFormContainer>
  );
};

export default React.memo(InputForm);

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: '#FFF',
    width: '100%',
    paddingLeft: 10,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: 'black',
  },
});
