import styled from 'styled-components/native';

//################# STYLED COMPONENTS INPUTFORM.TSX ##################
export const StyledRootInputFormContainer = styled.View`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  padding-left: 40px;
`;

export const StyledTextInputContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 40%;
`;
export const StyledTextInput = styled.TextInput`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  width: 100%;
  flex: 1;
  font-family: 'RobotoMono-Regular';
`;
export const StyledFormButtonContainer = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 60%;
`;

export const StyledContinueButton = styled.TouchableOpacity`
  width: 121px;
  height: 35px;
  background-color: black;
  border-radius: 13px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const ContinueText = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  padding-right: 5px;
`;

//######################################################

//#################STYLED  COMPONENTS LOGIN.TSX#################
export const StyledRootLoginScreen = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #d5d7e3;
  position: relative;
`;
export const StyledLoginContainer = styled.View`
  width: 90%;
  height: 70%;
  background-color: white;
  border-radius: 45px;
  display: flex;
  flex-direction: column;
`;
export const StyledLogoContainer = styled.View`
  width: 100%;
  height: 10%;
  justify-content: center;
  padding-left: 20px;
`;
//##################################r##################
