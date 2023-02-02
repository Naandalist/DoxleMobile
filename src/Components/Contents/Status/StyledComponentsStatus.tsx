import {Platform} from 'react-native';
import styled from 'styled-components/native';

export const RootStatusContainer = styled.TouchableOpacity`
  width: 18px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledStatusButton = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 2.5px;
  border-width: 2px;
`;

export const RootModalStatusBoardSelection = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f2f5;
`;

export const RootStatusBoardDisplayerContainer =
  Platform.OS === 'ios'
    ? styled.View`
        height: 60px;
        width: 70%;
        display: flex;
        background-color: white;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        box-shadow: 5px 5px 10px rgba(76, 43, 167, 0.8);
      `
    : styled.View`
        height: 60px;
        width: 70%;
        display: flex;
        background-color: white;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        shadow-color: #5e32de;
        elevation: 14px;
      `;
