import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {
  BUTTON_FONT_FAMILY,
  NORMAL_CONTENT_FONT_FAMILY,
  TITLE_FONT_FAMILY,
} from '../../../Utilities/constants';

export const StyledRootContainer = styled.View`
  width: 96%;
  height: 100%;
  margin-top: 20px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const StyledRootNoticeBoardContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d5d7e3;
`;

export const StyledTopMenuContainer = styled.SafeAreaView`
  padding-bottom: 1%;
  width: 96%;
  height: 5%;
  min-height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
`;

export const StyledDrawerMenuIconContainer = styled.View`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 30px;
`;

export const MenuIconButton = styled.TouchableOpacity`
width:100%;
          height: 100%
          display: flex;
          justify-content: center;
          align-items: flex-start
`;

export const StyledDropdownCategoryContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 70%;
  flex-direction: row;
`;

export const StyledPhonePortraitFilterAndSettingIconContainer = styled.View`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: center;
`;

export const StyledFilterIconButton = styled.TouchableOpacity`
  width: 25px;
`;

export const StyledSettingIconButton = styled.TouchableOpacity`
  width: 25px;
`;

export const StyledNoticeTableContainer = styled.View`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2%;
  position: relative;
`;

export const StyledAddNoticeButtonContainer = styled.View`
  position: absolute;
  bottom: 30px;
  right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 22px;
  background-color: #5e32de;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
`;

export const StyledAddNoticeButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledNoticeTableViewMenuContainer = styled.View`
  width: 96%;
  min-height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  background-color: #f9f9ff;
`;

export const StyledTabMenuButton = styled.TouchableOpacity`
  height: 32px;
  background-color: #f9f9ff;
  margin-right: 1px;
  justify-content: center;
  align-items: center;
`;

export const StyledSettingAndFilterIconContainer = styled.View`
  flex: 1;
  height: 32;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  flex-direction: row;
  padding-right: 8;
  background-color: #f9f9ff;
`;

export const StyledPortraitTabletIconButton = styled.TouchableOpacity`
  width: 25px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledTabMenuTextView = styled.Text`
  font-family: 'IBMPlexMono-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 0.15px;
  line-height: 13px;
  text-transform: capitalize;
`;

export const StyledNoticeTableHeaderContainer = styled.View`
  width: 100%;
  height: 5%;
  max-height: 20px;
  display: flex;
  flex-direction: row;
`;

export const StyledTitleHeaderContainer = styled.View`
  height: 100%;
  padding-left: 14px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
export const StyledTitleHeaderText = styled.Text`
  font-family: 'NostromoRegular-Light';
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 11px;
  letter-spacing: 0.15px;
  color: #754ee0;
  text-transform: capitalize;
`;
export const StyledDataKeyHeaderContainer = styled.ScrollView`
  height: 100%;
  flex: 1;
`;

export const StyledDataKeyHeaderCell = styled.Text`
  width: 97px;
  text-align: center;
  text-transform: uppercase;
  font-family: 'NostromoRegular-Light';
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 12px;
  letter-spacing: 0.15px;
  color: #754ee0;
`;

export const StyledNoticeTableBody = styled.FlatList`
  width: 100%;
  flex: 1;
`;

export const RootNoticeTitleColumnContainer = styled.FlatList`
  height: 100%;
`;

export const RootNoticeTitleCell = styled.View`
  height: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-color: rgba(199, 180, 252, 0.8);
  border-right-color: rgba(199, 180, 252, 0.5);
  border-right-width: 0.8px;
`;

export const StyledTitleContainer = styled.TouchableOpacity`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4px 0 0;
`;

export const StyledTitleText = styled.Text`
  font-family: 'IBMPlexSans-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  // letterSpacing: 0.05,

  text-transform: capitalize;
  overflow: hidden;
`;

export const StyledItemFlatlistContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const RootNoticeDataHorizontalScrollColumn = styled.ScrollView`
  flex: 1;
`;

export const StyledDataFlatlist = styled.FlatList`
  flex: 1;
`;

export const StyledDataRow = styled.View`
  display: flex;
  flex-direction: row;
  background-color: white;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(199, 180, 252, 0.8);
`;
export const StyledDataCell = styled.View`
  width: 97px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledDataText = styled.Text`
  text-transform: capitalize;
  font-family: 'IBMPlexSans-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  letter-spacing: 0.15px;
  color: #000000;
`;

export const RootButtonIconContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StyledIconContainer = styled.View`
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyleTextContainer = styled.View`
  width: 85%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 1px;
`;

export const StyledButtonIconText = styled.Text`
  font-family: 'IBMPlexMono-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #000000;
  text-align: left;
  text-transform: capitalize;
`;

export const StyledNoticeFilterLeftContainer = styled.View`
  height: 100%;
  width: 50%;
  border-right-color: #e6e6e6;
  border-right-width: 0.6px;
  display: flex;
  flex-direction: column;
  padding-left: 3%;
`;

export const StyledCloseButtonContainer = styled.SafeAreaView`
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const StyledColumnFieldContainer = styled.View`
  height: 30%;
  width: 100%;
`;

export const StyledHeaderText = styled.Text`
  font-family: 'IBMPlexMono-Medium';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #754ee0;
`;

export const StyledColumnFieldSelectionContainer = styled.View`
  width: 100%;
  height: 40px;
  border-bottom-color: #e6e6e6;
  border-bottom-width: 0.6px;
`;

export const StyledColumnFieldSelectionButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const StyledDueDateFieldContainer = styled.View`
  height: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const RootModalAddNoticeContainer = styled.KeyboardAvoidingView`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f2f5;
  position: relative;
`;

export const StyledTopMenuModalAddNoticeContainer = styled.SafeAreaView`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
export const StyledTopMenuTitleContainer = styled.View`
  width: 88%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-left: 2%;
`;

export const StyledTopMenuTitleText = styled.Text`
  font-family: 'IBMPlexMono-Medium';
  font-style: normal;
  font-weight: 400;
  font-size: 9px;
  line-height: 12px;
  color: #7c768d;
`;

export const StyledTopMenuCloseButton = styled.TouchableOpacity`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledModalAddNoticeContentContainer = styled.View`
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

export const StyledAddNoticeTextContainer = styled.View`
  width: 100%;
  justify-content: center;
  height: 50px;
  align-items: flex-start;
  border-bottom-width: 1.5px;
  border-bottom-color: rgb(150, 162, 190);
`;

export const StyledAddNoticeText = styled.Text`
  font-family: 'NostromoRegular-Medium';
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
`;

export const StyledModalFormContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding-bottom: 14px;
`;

export const StyledDescriptionFieldContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const StyledLabelText = styled.Text`
  font-family: 'IBMPlexMono-Medium';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

export const StyledModalDescriptionTextInput = styled.TextInput`
  background-color: #f8f8f8;
  margin-top: 8px;
  height: 80px;
  border-radius: 6px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
`;

export const StyledDoubleFieldContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

export const StyledSingleFieldContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 45%;
  margin-top: 8px;
`;

export const StyledDisabledTextInput = styled.TextInput`
  background-color: #f8f8f8;
  margin-top: 8px;
  height: 40px;
  border-radius: 6px;
  width: 100%;
  padding-left: 4px;
  font-family: 'IBMPlexSans-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

export const StyledAssignUserFieldContainer = styled.View`
  background-color: #f8f8f8;
  margin-top: 8px;
  height: 40px;
  border-radius: 6px;
  width: 100%;
  padding-left: 4px;
  font-family: 'IBMPlexSans-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  flex-direction: row;
`;

export const StyledAssignUserButton = styled.TouchableOpacity`
  height: 100%;
  width: 25px;
  justify-content: center;
  align-items: center;
`;

export const StyledStatusSelectionContainer = styled.View`
  background-color: #f8f8f8;
  margin-top: 8px;
  height: 40px;
  border-radius: 6px;
  width: 100%;
  padding-left: 4px;
  font-family: 'IBMPlexSans-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  justify-content: center;
  align-items: flex-start;
`;

export const StyledSelectedValueTextDisplay = styled.Text`
  font-family: 'IBMPlexSans-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
`;

export const StyledCategoryValueContainer = styled.View`
  background-color: #f8f8f8;
  margin-top: 8px;
  height: 40px;
  border-radius: 6px;
  width: 100%;
  padding-left: 4px;
  font-family: 'IBMPlexSans-Regular';
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
  height: 290px;
`;

export const StyledAttachmentDisplayContainer = styled.View`
  height: 100%;
  flex: 1;
  background-color: #f8f8f8;
  border-radius: 6px;
  margin-top: 8px;
`;

export const StyledAddAttachmentButtonContainer = styled.View`
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: flex-end;
  padding-right: 4px;
`;

export const StyledAddedAttachmentContainer = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
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

export const StyledModalAddNoticeBottomContainer = styled.View`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  margin-top: 12px;
`;

export const StyledModalAddNoticeBottomTitleContainer = styled.View`
  width: 30%;
  height: 100%;

  justify-content: flex-start;
  align-items: flex-start;
`;

export const StyledModalAddNoticeBottomTitleText = styled.Text`
  color: rgb(133, 92, 248);
  font-family: 'IBMPlexSans-SemiBold';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
`;

export const StyledModalAddNoticeBottomButtonContainer = styled.View`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const StyledCancelButton = styled.TouchableOpacity`
  background-color: rgb(214, 217, 223);
  width: 100px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 9px;
`;

export const StyledCancelText = styled.Text`
  font-family: ${BUTTON_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
`;

export const StyledAddButton = styled.TouchableOpacity`
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
export const StyledAddText = styled.Text`
  font-family: ${BUTTON_FONT_FAMILY};
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  color: white;
  padding-left: 5px;
`;

export const StyledSelectedAssigneeDisplayContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgb(146, 124, 210);
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding-left: 2px;
  padding-right: 2px;
`;

export const StyledSelectedAssigneeNameText = styled.Text`
  color: white;
  font-size: 8px;
  font-family: 'IBMPlexSans-Regular';
  font-style: normal;
  line-height: 9px;
  padding: 2px;
`;

export const StyledAddCategoryButton = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 4px;
`;

export const RootCategorySelection = styled(Animated.View)`
  height: 35px;
  width: 60%;
  background-color: rgb(146, 124, 210);
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin: 4px;
  box-shadow: 4px 4px 2px rgba(76, 43, 167, 0.8);
`;

export const StyledNewCategoryTextInput = styled.TextInput`
  height: 45px;
  width: 80%;
  background-color: #f8f8f8;
  margin-bottom: 8px;
  padding-left: 4px;
  border-radius: 4px;
  font-family: 'IBMPlexSans-Regular';
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

export const StyledAddedFileInfoContainer = styled.View`
  height: 100%;

  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #e4e6ef;
`;

export const StyledAddedFileInfoText = styled.Text`
  font-family: 'IBMPlexSans-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #000000;
  text-align: left;
  text-transform: capitalize;
`;

export const StyledNoticeFilterEmptyUserAlertContainer = styled.View`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledNoticeFilterEmptyUserAlertText = styled.View`
  font-family: ${TITLE_FONT_FAMILY};
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 15px;
  color: #8c84a4;
`;

export const StyledNoticeFilterUsernameItemContainer = styled.View`
  width: 100%;
  height: 40px;
  margin-bottom: 4px;
  background-color: #f1f2f5;
  border-radius: 2px;
  padding-top: 3%;
  padding-bottom: 3%;
`;

export const StyledFileIconAndNameContainer = styled.View`
  width: 100%;
  height: 100%;
  padding-top: 4px;
  padding-bottom: 4px;
  display: flex;
  flex-direction: row;
`;
