import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Dialog from 'react-native-dialog';
import {
  BUTTON_FONT_FAMILY,
  TITLE_FONT_FAMILY,
} from '../../../Utilities/constants';
type Props = {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  addPhotoFunction: Function;
  addFileFunction: Function;
  onPickingPhotos: boolean;
  setonPickingPhotos: (onPickingPhotos: boolean) => void;
};

const AddAttachmentDialog = ({
  showDialog,
  setShowDialog,
  addPhotoFunction,
  addFileFunction,
  onPickingPhotos,
  setonPickingPhotos,
}: Props) => {
  return (
    <Dialog.Container
      visible={showDialog}
      contentStyle={{
        display: onPickingPhotos ? 'none' : 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}
      onBackdropPress={() => setShowDialog(false)}
      buttonSeparatorStyle={false}
      verticalButtons={true}>
      <Dialog.Title style={{fontFamily: TITLE_FONT_FAMILY}}>
        Add Attachments
      </Dialog.Title>
      <Dialog.Button
        label="Add File"
        onPress={() => addFileFunction()}
        style={{fontFamily: BUTTON_FONT_FAMILY}}
      />

      <Dialog.Button
        label="Add Photo"
        onPress={() => {
          addPhotoFunction();
          setonPickingPhotos(true);
        }}
        style={{fontFamily: BUTTON_FONT_FAMILY}}
      />
      <Dialog.Button
        label="Cancel"
        onPress={() => {
          setShowDialog(false);
        }}
        color="red"
        style={{fontFamily: BUTTON_FONT_FAMILY}}
      />
    </Dialog.Container>
  );
};

export default AddAttachmentDialog;

const styles = StyleSheet.create({});
