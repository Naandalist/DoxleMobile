import styled from 'styled-components/native';

//################# STYLED COMPONENTS INPUTFORM.TSX ##################
export const StyledRootInputFormContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledTextInputContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;
export const StyledTextInput = styled.TextInput`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  width: 100%;
  font-family: 'RobotoMono-Regular';
`;
export const StyledFormButtonContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StyledContinueButton = styled.TouchableOpacity`
  width: 121px;
  height: 45px;
  background-color: black;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const ContinueText = styled.Text`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
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
  border-radius: 45px;
  display: flex;
  flex-direction: column;
`;
export const StyledLogoContainer = styled.View`
  width: 100%;
  height: 10%;
  justify-content: center;
  align-items: center;
`;
//##################################r##################

export const StyledTitleContainer = styled.View`
  margin-vertical:20px
  justify-content: center;
  align-items: center;
`;
