import styled from 'styled-components/native';
import {
  BUTTON_FONT_FAMILY,
  CONTENT_TITLE_FONT_FAMILY,
  NORMAL_CONTENT_FONT_FAMILY,
  SUBTITLE_FONT_FAMILY,
  TITLE_FONT_FAMILY,
} from '../../../Utilities/constants';

export const RootModalEditNoticeDetailsContainer = styled.KeyboardAvoidingView`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f2f5;
`;

export const StyledTopModalDetailContainer = styled.SafeAreaView`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const StyledTopModalDetailTextContainer = styled.View`
  width: 88%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 2%;
`;
export const StyledTopModalDetailText = styled.Text`
  font-family: ${CONTENT_TITLE_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 12px;
  color: #7c768d;
`;

export const StyledTopModalDetailCloseButton = styled.TouchableOpacity`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledModalBodyContainer = styled.View`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 12px;
`;

export const StyledModalTitleNameContainer = styled.View`
  width: 100%;
  justify-content: center;
  height: 40px;
  align-items: flex-start;
  border-bottom-width: 1.5px;
  border-bottom-color: rgb(150, 162, 190);
  display: flex;
  flex-direction: column;
`;

export const StyledModalTitleText = styled.Text`
  font-family: ${TITLE_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
`;

export const StyledModalTabMenuContainer = styled.View`
  display: flex;
  flex-direction: column;
  height: 70px;
`;

export const StyledModalTabMenuTitleText = styled.Text`
  font-family: ${SUBTITLE_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.87);
  padding-top: 4px;
  padding-bottom: 4px;
`;

export const StyledTabsContainer = styled.View`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
export const StyledTabButton = styled.TouchableOpacity`
  height: 80%;
  justify-content: center;
  align-items: center;
  width: 24.5%;
  background-color: rgb(241, 242, 244);
`;
export const StyledTabText = styled.Text`
  font-family: ${BUTTON_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  text-transform: capitalize;
`;

export const StyledTabMenuContentDisplayer = styled.View`
  flex: 1;
  width: 100%;
`;

export const RootNoticeTabContentContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-bottom: 14px;
`;
export const StyledNoticeTabDescriptionFieldContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const StyledNoticeTabLabelText = styled.Text`
  font-family: 'IBMPlexMono-Medium';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

export const StyledDescriptionTextInput = styled.TextInput`
  background-color: #f8f8f8;
  margin-top: 8px;
  height: 80px;
  border-radius: 6px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  flex-wrap: wrap;
`;

export const StyledDoubleFieldContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

export const StyledSingleEditFieldContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-top: 8px;
`;
export const StyledSingleEditFieldTextInput = styled.TextInput`
  background-color: #f8f8f8;
  margin-top: 8px;
  height: 40px;
  border-radius: 6px;
  width: 100%;
  padding-left: 4px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

export const StyledAssignUserDisplayContainer = styled.View`
  background-color: #f8f8f8;
  margin-top: 8px;
  height: 40px;
  border-radius: 6px;
  width: 100%;
  padding-left: 4px;
  display: flex;
  flex-direction: row;
`;

export const StyledStatusDisplayContainer = styled.View`
  background-color: #f8f8f8;
  margin-top: 8px;
  height: 40px;
  border-radius: 6px;
  width: 100%;
  padding-left: 4px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledStatusText = styled.Text`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;
export const StyledCategoryDisplayContainer = styled.View`
  background-color: #f8f8f8;
  margin-top: 8px;
  height: 40px;
  border-radius: 6px;
  width: 100%;
  padding-left: 4px;
`;
export const StyledCategoryText = styled.Text`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  flex: 1;
`;

export const StyledDueDateDisplayContainer = styled.View`
  background-color: #f8f8f8;
  margin-top: 8px;
  height: 40px;
  border-radius: 6px;
  width: 100%;
  padding-left: 4px;
  justify-content: center;
  align-items: flex-start;
`;
export const StyledDueDateText = styled.Text`
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;
export const StyledAttachmentFieldContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  height: 400px;
`;

export const StyledAddAttachmentButtonContainer = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: flex-end;
  padding-right: 4px;
`;
export const StyledAttachmentDisplayContainer = styled.View`
  height: 100%;
  flex: 1;
  background-color: #f8f8f8;
  border-radius: 6px;
  margin-top: 8px;
`;
export const StyledAddedAttachmentContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const StyledAddedAttachmentListHeaderText = styled.Text`
  font-family: ${TITLE_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #9c9ead;
  text-align: center;
  height: 100%;
`;
export const StyledEmptyFileAlertContainer = styled.View`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledEmptyFileAlertText = styled.Text`
  font-family: 'IBMPlexSans-Bold';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 15px;
  letter-spacing: 0.15px;
  color: #5a36be;
`;
export const StyledSaveButton = styled.TouchableOpacity`
  background-color: rgb(117, 78, 224);
  width: 100px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
  display: flex;
  flex-direction: row;
  margin-left: 10px;
`;

export const StyledSaveText = styled.Text`
  font-family: ${BUTTON_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: white;
  padding-left: 5px;
`;
export const StyledModalBottomContainer = styled.View`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
`;
export const StyledModalBottomTextContainer = styled.View`
  width: 30%;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const StyledModalBottomText = styled.Text`
  color: rgb(133, 92, 248);
  font-family: 'IBMPlexSans-SemiBold';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`;

export const StyledModalBottomButtonContainer = styled.View`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
export const StyledModalBottomCancelButton = styled.TouchableOpacity`
  background-color: rgb(214, 217, 223);
  width: 100px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
`;
export const StyledButtonCancelText = styled.Text`
  font-family: 'IBMPlexMono-SemiBold';
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
`;
export const RootNoticeGeneralDetailTab = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const RootHistoryTab = styled.ScrollView`
  width: 100%;
  height: 100%;
  margin-top: 8px;
`;
export const RootHistoryItemContainer = styled.View`
  height: 40px;
  background-color: #f1f2f5;
  border-radius: 5px;
  width: 98%;
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 3px 2px rgba(76, 43, 167, 0.8);
`;
export const StyledHistoryIndexText = styled.Text`
  width: 30px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: black;
  text-align: center;
`;
export const StyledHistoryUsernameText = styled.Text`
  width: 90px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #5a36be;
  text-align: center;
  text-transform: capitalize;
`;
export const StyledHistoryTimestampText = styled.Text`
  width: 120px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: black;
  text-align: center;
`;
export const StyledHistoryDescriptionText = styled.Text`
  flex: 1;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: black;
  text-align: center;
  padding-right: 4px;
`;
