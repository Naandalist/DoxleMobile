import styled from 'styled-components/native';
import {
  NORMAL_CONTENT_FONT_FAMILY,
  TEXTINPUT_LABEL_FONT_FAMILY,
} from '../../../Utilities/constants';

export const RootChecklistTab = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const StyledAddCheckListButtonContainer = styled.View`
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: flex-end;
`;

export const StyledScrollableChecklistContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const RootPermitItemContainer = styled.View`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;
export const StyledPermitTitleText = styled.Text`
  color: rgb(90, 54, 190);
  font-weight: 500;
  font-size: 12px;
  font-family: ${TEXTINPUT_LABEL_FONT_FAMILY};
  font-style: normal;
  line-height: 16px;
  z-index: 100;
`;
export const StyledNewCheckItemTextInput = styled.TextInput`
  width: 100%;
  height: 30px;
  background-color: transparent;
  padding-left: 20px;
  font-weight: 600;
  font-size: 10px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  line-height: 12px;
`;
export const RootCheckListQuestionContainer = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: #f1f2f5;
  display: flex;
  flex-direction: row;

  border-radius: 5px;
`;
export const StyledChecklistQuestionTextContainer = styled.View`
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;
export const StyledChecklistQuestionText = styled.Text`
  font-weight: 600;
  font-size: 10px;
  font-family: ${NORMAL_CONTENT_FONT_FAMILY};
  font-style: normal;
  line-height: 12px;
`;
