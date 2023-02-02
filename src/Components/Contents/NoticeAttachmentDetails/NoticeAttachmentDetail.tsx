import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FileData} from '../../../Models/storage';
import {NewNotice, Notice} from '../../../Models/notice';
import {
  NoticeBoardDocFileIcon,
  NoticeBoardPDFFileIcon,
  RemoveIcon,
} from '../NoticeBoard/NoticeBoardIcon';
import {formatFileSize} from '../NoticeBoard/NoticeBoardCommonResource';
import {NORMAL_CONTENT_FONT_FAMILY} from '../../../Utilities/constants';
import {authContextInterface, useAuth} from '../../Provider/AuthProvider';
import ImageView from 'react-native-image-viewing';
import FastImage from 'react-native-fast-image';
type TAttachmentAction = 'editNotice' | 'addNotice';
type Props = {
  file: FileData;
  setEdittedNotice?: (notice: Notice) => void;
  edittedNotice?: Notice;
  fileIndex: number;
  action: TAttachmentAction;
  deleteAttachmentFunction?: (file: FileData) => Promise<void>;
  newNotice?: NewNotice;
  setNewNotice?: (notice: NewNotice) => void;
};

const NoticeAttachmentDetail = ({
  file,
  setEdittedNotice,
  edittedNotice,
  fileIndex,
  action,
  deleteAttachmentFunction,
  newNotice,
  setNewNotice,
}: Props) => {
  const [imagePreview, setImagePreview] = useState<boolean>(false);
  // const handleDeleteFileAPI = async () => {
  //   try {
  //     const accessToken = await getAccessToken();
  //     if (!accessToken) throw 'UNAUTHORISED';
  //     const deleteResult: boolean = await storageAPI.deleteFile(
  //       file.fileId,
  //       accessToken,
  //     );
  //     if (deleteResult) {
  //       //update eddited Notice
  //       if (edittedNotice.attachments) {
  //         let newAttachmentList: FileData[] = edittedNotice.attachments.filter(
  //           (file, index) => index !== fileIndex,
  //         );
  //         setEdittedNotice({
  //           ...edittedNotice,
  //           attachments: [...newAttachmentList],
  //         });
  //       }
  //       if (setnoticeTabNotificationMessage)
  //         setnoticeTabNotificationMessage({
  //           messageText: 'File Deleted',
  //           messageType: 'success',
  //         });
  //     } else throw 'ERROR DELETED FILE';
  //   } catch (error) {
  //     if (setnoticeTabNotificationMessage)
  //       setnoticeTabNotificationMessage({
  //         messageText: 'Failed to Delete File',
  //         messageType: 'error',
  //       });
  //     return;
  //   }
  // };
  const handlePressRemoveButton = () => {
    if (
      action === 'editNotice' &&
      setEdittedNotice &&
      edittedNotice &&
      deleteAttachmentFunction
    ) {
      if (file.fileId) {
        const text = `This file will be deleted permanently, are you sure?`;
        Alert.alert('Confirm Delete', text, [
          {
            text: 'Delete',
            onPress: () => deleteAttachmentFunction(file),
            style: 'destructive',
          },
          {
            text: 'Cancel',
            onPress: () => {
              return;
            },
            style: 'cancel',
          },
        ]);
      } else {
        if (edittedNotice.attachments)
          setEdittedNotice({
            ...edittedNotice,
            attachments: [
              ...edittedNotice.attachments?.filter(
                (file, index) => index !== fileIndex,
              ),
            ],
          });
      }
    }

    if (action === 'addNotice' && newNotice && setNewNotice) {
      let newAttachmentList: FileData[] = newNotice.attachments
        ? newNotice.attachments.filter(
            (attachment, attachmentIndex) => attachmentIndex !== fileIndex,
          )
        : [];
      setNewNotice({
        ...newNotice,
        attachments: [...newAttachmentList],
      });
    }
  };

  const handlePressViewFile = () => {
    if (file.type.toLowerCase().includes('image')) setImagePreview(true);
    else Linking.openURL(file.url);
  };
  return (
    <>
      {/*File Container */}
      <TouchableOpacity
        delayPressIn={0}
        onPress={handlePressViewFile}
        style={{height: 60, display: 'flex', flexDirection: 'row'}}>
        {/*File name */}
        <View
          style={[
            styles.fileCellContainer,
            {
              width: 280,
              display: 'flex',
              flexDirection: 'row',
              padding: 0,
            },
          ]}>
          {/*Pdf File/Photo  */}
          <View
            style={{
              width: '100%',
              height: '100%',
              paddingTop: 4,
              paddingBottom: 4,
              display: 'flex',
              flexDirection: 'row',
            }}>
            {/*File Icon/Image thumbnail */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
              }}>
              {file.name.toLowerCase().includes('pdf') ? (
                <NoticeBoardPDFFileIcon />
              ) : file.name.toLowerCase().includes('jpg') ||
                file.name.toLowerCase().includes('jpeg') ||
                file.name.toLowerCase().includes('png') ||
                file.name.toLowerCase().includes('image') ? (
                <FastImage
                  source={{uri: file.url}}
                  style={{height: 30, width: 30}}
                  resizeMode={FastImage.resizeMode.contain}
                />
              ) : file.name.toLowerCase().includes('doc') ||
                file.name.toLowerCase().includes('docx') ? (
                <NoticeBoardDocFileIcon />
              ) : null}
            </View>

            {/*File Name Text */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                flex: 1,
                paddingRight: 4,
              }}>
              <Text
                style={[
                  styles.fileCellText,
                  {
                    flexWrap: 'wrap',

                    flex: 1,
                    paddingRight: 4,
                  },
                ]}>
                {file.name}
              </Text>
              {/*Edit Icon*/}
              <TouchableOpacity
                delayPressIn={0}
                onPress={handlePressRemoveButton}>
                <View
                  style={{
                    width: 30,
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <RemoveIcon />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/*Size */}
        <View style={[styles.fileCellContainer, {width: 140}]}>
          <Text style={styles.fileCellText}>
            {file.size ? formatFileSize(file.size as number) : ''}
          </Text>
        </View>
      </TouchableOpacity>

      <ImageView
        images={[{uri: file.url}]}
        imageIndex={0}
        visible={imagePreview}
        onRequestClose={() => setImagePreview(false)}
        presentationStyle={'fullScreen'}
        animationType="fade"
      />
    </>
  );
};

export default NoticeAttachmentDetail;

const styles = StyleSheet.create({
  fileCellContainer: {
    height: '100%',
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E6EF',
  },
  fileCellText: {
    fontFamily: NORMAL_CONTENT_FONT_FAMILY,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 13,
    color: '#000000',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
});
