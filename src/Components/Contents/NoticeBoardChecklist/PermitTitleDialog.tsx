import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Dialog from 'react-native-dialog';
import {
  NORMAL_CONTENT_FONT_FAMILY,
  TEXTINPUT_LABEL_FONT_FAMILY,
  TITLE_FONT_FAMILY,
} from '../../../Utilities/constants';
import {IChecklistContext, useChecklistContext} from './ChecklistsTab';
import {Permit} from '../../../Models/permit';

type TPermitTitleDialogAction = 'addPermit' | 'editPermitTitle';
type Props = {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  permit?: Permit;
  action: TPermitTitleDialogAction;
};

const PermitTitleDialog = ({
  showDialog,
  setShowDialog,
  permit,
  action,
}: Props) => {
  const [newTitle, setnewTitle] = useState<string>('');
  const {handleTitlePermitUpdate, handleAddNewPermit} =
    useChecklistContext() as IChecklistContext;
  const handlePressChangeButton = () => {
    setShowDialog(false);
    setnewTitle('');
    console.log('PERMIT:', permit);
    if (permit) handleTitlePermitUpdate(permit.checklistGroupId, newTitle);
  };
  const handlePressAddButton = () => {
    handleAddNewPermit(newTitle);
    setShowDialog(false);
    setnewTitle('');
  };
  const handlePressCancelButton = () => {
    setnewTitle(''); //clear title
    setShowDialog(false); //close dialog
  };
  return (
    <Dialog.Container
      visible={showDialog}
      contentStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
      onBackdropPress={() => setShowDialog(false)}
      buttonSeparatorStyle={false}
      verticalButtons={true}>
      <Dialog.Title style={{fontFamily: TITLE_FONT_FAMILY}}>
        {action === 'editPermitTitle'
          ? 'Edit Title Checklist'
          : 'Add New Checklist'}
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
          New Permit Title
        </Dialog.Description>

        <Dialog.Input
          value={newTitle}
          onChangeText={text => setnewTitle(text)}
          style={{
            fontFamily: NORMAL_CONTENT_FONT_FAMILY,
            fontSize: 10,
            lineHeight: 12,
          }}
        />
      </View>
      {action === 'editPermitTitle' && (
        <Dialog.Button
          label="Change"
          onPress={handlePressChangeButton}
          disabled={newTitle === ''}
        />
      )}
      {action === 'addPermit' && (
        <Dialog.Button
          label="Add"
          onPress={handlePressAddButton}
          disabled={newTitle === ''}
        />
      )}

      <Dialog.Button
        label="Cancel"
        onPress={handlePressCancelButton}
        color="red"
      />
    </Dialog.Container>
  );
};

export default PermitTitleDialog;

const styles = StyleSheet.create({});
