import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Checklist} from '../../../Models/checklist';
import {Permit} from '../../../Models/permit';
import Dialog from 'react-native-dialog';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  RootCheckListQuestionContainer,
  StyledChecklistQuestionText,
  StyledChecklistQuestionTextContainer,
} from './StyledComponentsCheckist';
import {
  TEXTINPUT_LABEL_FONT_FAMILY,
  TITLE_FONT_FAMILY,
} from '../../../Utilities/constants';

type Props = {
  checklist: Checklist;
  permit: Permit;
  handleEditChecklistQuestion: Function;
  handleChecklistCheck: Function;
};

const CheckListQuestionItem = ({
  checklist,
  permit,
  handleEditChecklistQuestion,
  handleChecklistCheck,
}: Props) => {
  //###############Handle checklist question change#########
  //control show dialog to change tquestion of checklist
  const [showEditChecklistQuestion, setShowEditChecklistQuestion] =
    useState<boolean>(false);

  //control change of new question
  const [newChecklistQuestions, setNewChecklistQuestions] = useState<string>(
    checklist.question,
  );
  //#################

  //#########HANDLE CHECKLIST ONLONGPRESS ANIMATION######

  const animatedViewOpacity = new Animated.Value(0);
  const opacityIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(animatedViewOpacity, {
      toValue: 0.5,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const opacityOut = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(animatedViewOpacity, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
  };
  //########################

  return (
    <RootCheckListQuestionContainer
      onLongPress={() => setShowEditChecklistQuestion(true)}
      onPressIn={() => opacityIn()}
      onPressOut={() => opacityOut()}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          zIndex: 0,
          position: 'absolute',
          backgroundColor: 'rgb(106, 60, 236)',
          opacity: animatedViewOpacity,
          borderRadius: 5,
        }}></Animated.View>
      {/**Dialog to add new permit */}
      <View>
        <Dialog.Container
          visible={showEditChecklistQuestion}
          contentStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
          buttonSeparatorStyle={false}
          verticalButtons={true}>
          <Dialog.Title style={{fontFamily: TITLE_FONT_FAMILY}}>
            Edit Checklist Question
          </Dialog.Title>
          <View
            style={{
              borderTopColor: 'rgb(150, 162, 190)',
              borderTopWidth: 1,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <Dialog.Description
              style={{
                textAlign: 'left',
                marginBottom: 14,
                paddingLeft: 20,
                fontFamily: TEXTINPUT_LABEL_FONT_FAMILY,
                fontSize: 10,
                lineHeight: 12,
              }}>
              New Checklist Question
            </Dialog.Description>

            <Dialog.Input
              value={newChecklistQuestions}
              onChangeText={text => setNewChecklistQuestions(text)}
            />
          </View>
          <Dialog.Button
            label="Change"
            onPress={() => {
              setNewChecklistQuestions(''); //clear title
              setShowEditChecklistQuestion(false); //close dialog

              //call update api
              handleEditChecklistQuestion(
                checklist.checklistId,
                newChecklistQuestions,
              );
            }}
            disabled={newChecklistQuestions === ''}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              setNewChecklistQuestions(''); //clear title
              setShowEditChecklistQuestion(false); //close dialog
            }}
            color="red"
          />
        </Dialog.Container>
      </View>
      {/*Checkbox container */}
      <View
        style={{
          width: 40,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <BouncyCheckbox
          isChecked={checklist.answer === 'YES' ? true : false}
          onPress={value => handleChecklistCheck(checklist.checklistId, value)}
          style={
            {
              // borderColor: 'rgb(106, 60, 236)',
              // width: 7,
              // height: 7,
            }
          }
          size={8}
          disableText={true}
          fillColor="rgb(106, 60, 236)"
          unfillColor="white"
        />
      </View>

      {/*subchecklist description */}
      <StyledChecklistQuestionTextContainer>
        <StyledChecklistQuestionText>
          {checklist.question}
        </StyledChecklistQuestionText>
      </StyledChecklistQuestionTextContainer>
    </RootCheckListQuestionContainer>
  );
};

export default CheckListQuestionItem;

const styles = StyleSheet.create({
  descriptionContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  descriptionTextStyle: {
    fontWeight: '600',
    fontSize: 10,
    fontFamily: 'Roboto_Mono',
    fontStyle: 'normal',
    lineHeight: 12,
  },
  rootContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F2F5',
    display: 'flex',
    flexDirection: 'row',
    zIndex: -1,
    borderRadius: 5,
  },
});
