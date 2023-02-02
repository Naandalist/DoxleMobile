import {BlurView} from '@react-native-community/blur';
import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {
  NORMAL_CONTENT_FONT_FAMILY,
  SUBTITLE_FONT_FAMILY,
} from '../../Utilities/constants';

export const StyledDrawerMainView = styled(Animated.View)`
  background-color: #ffffff;

  height: 100%;

  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  border-top-right-radius: 27px;
  border-bottom-right-radius: 27px;
  border-right-width: 1px;
  border-right-color: #d5d9dd;
  z-index: 1;
  posistion: relative;
`;

export const RootDrawerContainer = styled(BlurView)`
  background-color: transparent;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  flex-direction: row;
  z-index: 1;
`;

export const StyledDrawerBlueView = styled.View`
  height: 100%;
  flex: 1;
`;
export const TopDrawerContainer = styled.SafeAreaView`
  width: 100%;
  height: 15%;
  max-height: 60px;
  display: flex;
  flex-direction: row;
`;

export const LogoContainer = styled(Animated.View)`
  width: 80%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
  padding-left: 10px;
`;
export const CloseIconContainer = styled(Animated.View)`
  width: 20%;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
  padding-right: 10px;
`;

export const MainMenuContainer = styled(Animated.View)`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 15%;
`;

export const MenuItemContainer = styled.View`
  width: 291px;
  height: 41px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  margin-top: 7.5px;
  margin-bottom: 7.5px;
`;

export const BottomDrawerContainer = styled(Animated.View)`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`;

export const LogoutIconContainer = styled.View`
  width: 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  padding-left: 20px;
  padding-bottom: 8px;
`;

export const RootDrawerItemContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
export const StyledIconContainer = styled.View`
  width: 15%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
export const StyledTitleContainer = styled.View`
  width: 85%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
`;
export const StyledTitleText = styled.Text`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: black;
  text-transform: uppercase;
`;
