import styled from 'styled-components/native';
import {
  CONTENT_TITLE_FONT_FAMILY,
  NORMAL_CONTENT_FONT_FAMILY,
  SUBTITLE_FONT_FAMILY,
} from '../../../Utilities/constants';

export const RootCommentContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 14px;
  padding-top: 10px;

  position: relative;
`;

export const StyledCommentViewContainer = styled.ScrollView`
  width: 100%;
  height: 85%;
`;

export const StyledCommentInputContainer = styled.View`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
export const StyledTextInput = styled.TextInput`
  padding-left: 4px;
  width: 85%;
  background-color: transparent;
  height: 49px;
  background-color: transparent;
`;
export const StyledSendCommentButton = styled.TouchableOpacity`
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const RootCommentItemContainer = styled.View`
  width: 100%;
  height: 88px;
  border-color: #e7dfff;
  border-width: 1px;
  border-radius: 8px;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 3px;
  padding-bottom: 3px;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;
export const StyledCommentDetailContainer = styled.View`
  width: 100%;
  height: 28px;
  border-bottom-color: #e7dfff;
  border-bottom-width: 3px;
  padding-bottom: 2px;
  display: flex;
  flex-direction: row;
`;
export const StyledSenderNameContainer = styled.View`
  width: 50%;
  height: 100%;
  justify-content: flex-end;
`;
export const StyledSenderNameText = styled.Text`
  font-family: ${CONTENT_TITLE_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #000000;
`;
export const StyledTimeStampContainer = styled.View`
  width: 50%;
  height: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;
export const StyledTimeStampText = styled.Text`
  font-family: ${CONTENT_TITLE_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #855cf8;
`;
export const StyledCommentTextContainer = styled.View`
  width: 100%;
  height: 72%;
  padding-top: 5px;
`;
export const StyledCommentText = styled.Text`
font-family: ${NORMAL_CONTENT_FONT_FAMILY};
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px
color: #000000
`;
