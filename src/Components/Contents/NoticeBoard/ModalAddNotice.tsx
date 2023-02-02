import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {
  AddIcon,
  CloseIcon,
  ModalAddUsersIcon,
  RemoveIcon,
} from './NoticeBoardIcon';
import {NewNotice, Notice} from '../../../Models/notice';
import {Company} from '../../../Models/company';

import {User} from '../../../Models/user';
import {
  NoticeBoardDocFileIcon,
  NoticeBoardEditCategoryIcon,
  NoticeBoardPDFFileIcon,
} from './NoticeBoardIcon';
import {FileData} from '../../../Models/storage';
import useMountStatus from '../../../Utilities/checkMountStatus';
import {authContextInterface, useAuth} from '../../Provider/AuthProvider';
import {INoticeBoardContext, NoticeBoardContext} from './NoticeBoard';
import {
  IOrientation,
  useOrientation,
} from '../../Provider/Orientation/OrientationContext';
import {BlurView} from '@react-native-community/blur';
import LoadingScreen from '../../../Utilities/LottiesAnimation/LoadingScreen';
import {
  RootModalAddNoticeContainer,
  StyledAddAttachmentButtonContainer,
  StyledAddCategoryButton,
  StyledAddedAttachmentContainer,
  StyledAddedFileInfoContainer,
  StyledAddedFileInfoText,
  StyledAddedAttachmentListHeaderText,
  StyledAddNoticeText,
  StyledAddNoticeTextContainer,
  StyledAddText,
  StyledAssignUserButton,
  StyledAssignUserFieldContainer,
  StyledAttachmentDisplayContainer,
  StyledAttachmentFieldContainer,
  StyledCancelButton,
  StyledCancelText,
  StyledCategoryValueContainer,
  StyledDescriptionFieldContainer,
  StyledDisabledTextInput,
  StyledDoubleFieldContainer,
  StyledEmptyFileAlertContainer,
  StyledEmptyFileAlertText,
  StyledFileIconAndNameContainer,
  StyledLabelText,
  StyledModalAddNoticeBottomButtonContainer,
  StyledModalAddNoticeBottomContainer,
  StyledModalAddNoticeBottomTitleContainer,
  StyledModalAddNoticeBottomTitleText,
  StyledModalAddNoticeContentContainer,
  StyledModalDescriptionTextInput,
  StyledModalFormContainer,
  StyledSelectedAssigneeDisplayContainer,
  StyledSelectedAssigneeNameText,
  StyledSelectedValueTextDisplay,
  StyledSingleFieldContainer,
  StyledStatusSelectionContainer,
  StyledTopMenuCloseButton,
  StyledTopMenuModalAddNoticeContainer,
  StyledTopMenuTitleContainer,
  StyledTopMenuTitleText,
  StyledAddButton,
} from './StyledComponentsNoticeBoard';
import {
  checkEmptyField,
  convertStatusValueToColor,
  convertStatusValueToText,
  formatFileSize,
  getCurrentDateInString,
} from './NoticeBoardCommonResource';
import AddButtonWithText from '../../GeneralComponents/AddButtonWithText';
import AssignUserDialog from '../AssignUserDialog/AssignUserDialog';
import ModalStatusBoardSelection from '../Status/ModalStatusBoardSelection';
import EditNoticeCategoryDialog from '../EditNoticeCategoryDialog/EditNoticeCategoryDialog';
import AddAttachmentDialog from './AddAttachmentDialog';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import * as ImagePicker from 'react-native-image-picker';
import BottomNotificationBar, {
  INotificationMessage,
} from '../../GeneralComponents/BottomNotificationBar';
import ProcessingFileLoadingScreen from '../../../Utilities/LottiesAnimation/ProcessingFileLoadingScreen';
import NoticeAPI from '../../../Services/DoxleAPI/noticeAPI';
import storageAPI from '../../../Services/DoxleAPI/storageAPI';
import NoticeAttachmentDetail from '../NoticeAttachmentDetails/NoticeAttachmentDetail';
type Props = {
  showAddNoticeModal: boolean;
  setShowAddNoticeModal: Function;
  company: Company;
};

const ModalAddNotice = ({
  showAddNoticeModal,
  setShowAddNoticeModal,
  company,
}: Props) => {
  const {user, getAccessToken} = useAuth() as authContextInterface;
  const {
    userList,
    selectedCategory,
    setSelectedCategory,
    categoryList,
    notices,
    setNotices,
    setnotificationMessage,
  } = useContext(NoticeBoardContext) as INoticeBoardContext;
  const [loading, setLoading] = useState<boolean>(false);
  //*************Handle Orientation*************** */
  const useOri = useOrientation() as IOrientation;
  const {deviceSize} = useOri;

  //********************************************** */
  let initialNewNotice: NewNotice = {
    noticeId: '',
    company: company.companyId,
    description: '',
    creator: user?.userId,
    assignedUsers: [],
    pinned: false,
    status: 'D',
    timeStamp: '',
    category: selectedCategory ? selectedCategory.categoryTitle : null,
    categoryId: selectedCategory ? selectedCategory.noticeCategoryId : null,
    isArchived: false,
    isComplete: false,
    isPrivate: false,
    isFollowup: false,
    attachments: [],
  };
  const [newNotice, setNewNotice] = useState<NewNotice>({...initialNewNotice});
  //state to control popup dialog assigning user
  const [showAssignUserDialog, setShowAssignUserDialog] =
    useState<boolean>(false);
  //state control show status board change
  const [showChangeStatusBoard, setShowChangeStatusBoard] =
    useState<boolean>(false);
  //state control show change category dialog
  const [showChangeCategoryDialog, setShowChangeCategoryDialog] =
    useState<boolean>(false);

  //control show attachment dialog
  const [showAttachmentDialog, setShowAttachmentDialog] =
    useState<boolean>(false);
  const [onPickingPhotos, setonPickingPhotos] = useState<boolean>(false);
  const [progress, setprogress] = useState<number | undefined>(undefined);
  const [modalNotificationMessage, setmodalNotificationMessage] = useState<
    INotificationMessage | undefined
  >(undefined);

  //###################################

  //############CONTROL DUE DATE PICKER#######
  const [showDueDatePicker, setShowDueDatePicker] = useState<boolean>(false);

  //######################

  //###############Control add file section##############

  //handle add file button in attachment dialog
  const handleAddFileBtn = async () => {
    DocumentPicker.pick({
      type: [
        DocumentPicker.types.pdf,
        DocumentPicker.types.docx,
        DocumentPicker.types.doc,
        DocumentPicker.types.csv,
        DocumentPicker.types.images,
        DocumentPicker.types.xls,
        DocumentPicker.types.xlsx,
      ],
      allowMultiSelection: true,
    })
      .then((res: DocumentPickerResponse[]) => {
        let addedFiles: FileData[] = [];
        if (res) {
          res.forEach(file => {
            let uri: string = '';
            let mimeType: string = '';
            let fileName: string = '';
            let size: string = '';
            if (file.uri) uri = file.uri;
            if (file.size) size = file.size.toString();
            if (file.type) {
              mimeType = file.type;
            }
            if (file.name) fileName = file.name;
            if (
              uri !== '' &&
              mimeType !== '' &&
              fileName !== '' &&
              size !== ''
            ) {
              addedFiles.push({
                fileId: '',
                name: fileName,
                url: uri,
                type: mimeType,
                size: size,
              });
            }
          });
          if (newNotice.attachments)
            setNewNotice({
              ...newNotice,
              attachments: [...newNotice.attachments, ...addedFiles],
            });
          else
            setNewNotice({
              ...newNotice,
              attachments: [...addedFiles],
            });
          setShowAttachmentDialog(false);
        } else throw 'Cannot Add Local Files';
      })
      .catch(err => {
        if (DocumentPicker.isCancel(err)) {
          setShowAttachmentDialog(false);
        } else
          Alert.alert('Problem Add file from local!!!', err.toString(), [
            {text: 'Try again', onPress: () => handleAddFileBtn()},
            {text: 'Cancel', onPress: () => {}},
          ]);
      });
  };
  //handle add photo button in attachment dialog
  const handleAddPhotoBtn = async () => {
    try {
      let imagePickerResult: ImagePicker.ImagePickerResponse =
        await ImagePicker.launchImageLibrary({
          selectionLimit: 0,
          mediaType: 'photo',
          presentationStyle: 'overCurrentContext',
        });

      if (imagePickerResult.didCancel) {
        setonPickingPhotos(false);
        setShowAttachmentDialog(false);
        return;
      }
      if (imagePickerResult.assets) {
        console.log('PROCESSING:');

        let selectedImages: FileData[] = [];
        imagePickerResult.assets.forEach((photo, index) => {
          if (photo.uri && photo.fileSize)
            selectedImages.push({
              fileId: '',
              name: photo.fileName ? photo.fileName : `Image#${index + 1}`,
              url: photo.uri,
              type: photo.type ? photo.type : 'jpg',
              size: photo.fileSize,
            });
        });
        if (newNotice.attachments)
          setNewNotice({
            ...newNotice,
            attachments: [...newNotice.attachments, ...selectedImages],
          });
        else
          setNewNotice({
            ...newNotice,
            attachments: [...selectedImages],
          });
      }
      if (imagePickerResult.errorMessage) throw imagePickerResult.errorMessage;
    } catch (error) {
      setmodalNotificationMessage({
        messageText: 'Failed To Pick Images',
        messageType: 'error',
      });
      setonPickingPhotos(false);
      setShowAttachmentDialog(false);

      return;
    }
    setonPickingPhotos(false);
    setShowAttachmentDialog(false);
  };

  //method control changing text of new notice
  const handleNewNoticeTextChange = (valueText: string, key: string) => {
    setNewNotice({...newNotice, [key]: valueText});
  };

  //############HANDLE ADD API############

  const addNewNotice = async () => {
    //check empty field first
    if (checkEmptyField(newNotice) === false) {
      Alert.alert('SOME FIELDS ARE EMPTY', 'Please fill up');
      return;
    }
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      if (!accessToken) throw 'UNAUTHORISED';
      const resultAddNotice = await NoticeAPI.add(newNotice, accessToken);
      if (!resultAddNotice) throw 'FAILED TO ADD NOTICE';
      setNotices([...notices, resultAddNotice]);
      //add notice successfully=> check files and call api to add file
      if (newNotice.attachments && newNotice.attachments.length > 0) {
        addFilesNotice(newNotice.attachments, resultAddNotice.noticeId);
      } else {
        //clear fields
        setNewNotice({...initialNewNotice});
        setShowAddNoticeModal(false);
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Error in ModalAddNotice.addNewNotice()', err.toString());
      // Alert.alert('Error in ModalAddNotice.addNewNotice()', err.toString())
      setmodalNotificationMessage({
        messageText: 'Error in ModalAddNotice.addNewNotice()',
        messageType: 'error',
      });
      setLoading(false);
    }
  };
  const addFilesNotice = async (files: FileData[], noticeId: string) => {
    //check access token first
    try {
      if (files.length > 0) {
        const accessToken = await getAccessToken();
        if (!accessToken) throw 'ACCESS DENIED';
        setLoading(false);
        setprogress(0);
        let addFilesNoticeResult = await storageAPI.uploadNoticeFiles(
          files,
          setprogress,
          noticeId,
          company.companyId,
          accessToken,
        );
        if (addFilesNoticeResult.files.length > 0) {
          setprogress(undefined);
          setNewNotice(initialNewNotice);
          setShowAddNoticeModal(false);

          //update notices
          // let newNotices: Notice[] = [];
          // notices.forEach(noticeItem => {
          //   if (noticeItem.noticeId !== noticeId) newNotices.push(noticeItem);
          //   else
          //     newNotices.push({
          //       ...noticeItem,
          //       attachments: [...addFilesNoticeResult.files],
          //     });
          // });
          // setNotices([...newNotices]);
          setSelectedCategory(
            newNotice.categoryId
              ? categoryList.filter(
                  category =>
                    category.noticeCategoryId === newNotice.categoryId,
                )[0]
              : null,
          );
          setnotificationMessage({
            messageText: 'Created Notice',
            messageType: 'success',
          });
        } else if (addFilesNoticeResult.errors.length > 0) {
          // console.log('ERROR ADDED FILES:', addFilesNoticeResult.errors);
          throw 'ERROR ADDING FILES TO NEW NOTICE';
        }
      }
    } catch (err: any) {
      setprogress(undefined);
      // console.error('Error in ModalAddNotice.addFilesNotice()', err.toString());
      // Alert.alert('Error in ModalAddNotice.addFilesNotice()', err.toString());
      setmodalNotificationMessage({
        messageText: 'Error in ModalAddNotice.addFilesNotice()',
        messageType: 'error',
      });
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAddNoticeModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setShowAddNoticeModal(!showAddNoticeModal);
      }}>
      {/* {openImagePicker ? (
        <PhotoSelector
          setOpenImagePicker={setOpenImagePicker}
          handleAddPhoto={handleAddPhoto}
        />
      ) : null}*/}

      {loading && (
        <BlurView
          blurType="light"
          blurAmount={10}
          blurRadius={10}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          reducedTransparencyFallbackColor="white">
          <LoadingScreen />
        </BlurView>
      )}

      {(onPickingPhotos || progress !== undefined) && (
        <BlurView
          blurType="xlight"
          blurAmount={10}
          blurRadius={10}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          reducedTransparencyFallbackColor="white">
          <ProcessingFileLoadingScreen
            message={
              progress ? `Uploading...${progress}%` : 'Processing Files...'
            }
          />
        </BlurView>
      )}
      <ModalStatusBoardSelection
        show={showChangeStatusBoard}
        controlShow={setShowChangeStatusBoard}
        actionType="addNotice"
        newNotice={newNotice}
        setNewNotice={setNewNotice}
      />
      {/*Dialog for add assignee users */}
      <AssignUserDialog
        userList={userList}
        dialogHeight={300}
        showDialog={showAssignUserDialog}
        setShowDialog={setShowAssignUserDialog}
        newNotice={newNotice}
        setNewNotice={setNewNotice}
        action="addNotice"
      />

      {/*Dialog for changing category */}
      <EditNoticeCategoryDialog
        showDialog={showChangeCategoryDialog}
        setShowDialog={setShowChangeCategoryDialog}
        categoryList={categoryList}
        newNotice={newNotice}
        setNewNotice={setNewNotice}
        dialogHeight={400}
        action="addNotice"
      />

      {/*Dialog for add attachment category */}
      <AddAttachmentDialog
        showDialog={showAttachmentDialog}
        setShowDialog={setShowAttachmentDialog}
        addFileFunction={handleAddFileBtn}
        onPickingPhotos={onPickingPhotos}
        setonPickingPhotos={setonPickingPhotos}
        addPhotoFunction={handleAddPhotoBtn}
      />
      {/* <View>
        <Dialog.Container
          visible={showAttachmentDialog}
          contentStyle={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}
          buttonSeparatorStyle={false}
          verticalButtons={true}>
          <Dialog.Title>Add Attachments</Dialog.Title>
          <Dialog.Button label="Add File" onPress={handleAddFileBtn} />

          <Dialog.Button
            label="Add Photo"
            onPress={() => {
              setShowAttachmentDialog(false);
              setOpenImagePicker(true);
            }}
          />
          <Dialog.Button
            label="Cancel"
            onPress={() => {
              setShowAttachmentDialog(false);
            }}
            color="red"
          />
        </Dialog.Container>
      </View> */}
      {/* Modal date picker to change date */}
      {/* <DateTimePickerModal
        isVisible={showDueDatePicker}
        mode='date'
        onConfirm={(value) => handleChangeDueDate(value)}
        onCancel={() => setShowDueDatePicker(false)}
      /> */}
      <RootModalAddNoticeContainer
        style={
          deviceSize && {
            width: deviceSize ? deviceSize.deviceWidth : 0,
            height: deviceSize ? deviceSize.deviceHeight : 0,
          }
        }
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        pointerEvents={showChangeStatusBoard ? 'none' : 'auto'}>
        {modalNotificationMessage && (
          <BottomNotificationBar
            messageText={modalNotificationMessage.messageText}
            unmountControl={setmodalNotificationMessage}
            messageType={modalNotificationMessage.messageType}
          />
        )}
        {/*Modal Top Menu Bar */}
        <StyledTopMenuModalAddNoticeContainer>
          {/*Text Part */}
          <StyledTopMenuTitleContainer>
            <StyledTopMenuTitleText>
              Byson Group/Notice Board
            </StyledTopMenuTitleText>
          </StyledTopMenuTitleContainer>
          {/*Close Icon */}
          <StyledTopMenuCloseButton
            delayPressIn={0}
            onPress={() => {
              setShowAddNoticeModal(!showAddNoticeModal);
            }}>
            <CloseIcon />
          </StyledTopMenuCloseButton>
        </StyledTopMenuModalAddNoticeContainer>

        <StyledModalAddNoticeContentContainer>
          {/*ADD NOTICE TEXT SECTION */}
          <StyledAddNoticeTextContainer>
            <StyledAddNoticeText>ADD NOTICE</StyledAddNoticeText>
          </StyledAddNoticeTextContainer>

          {/*FORM BODY */}
          <StyledModalFormContainer showsVerticalScrollIndicator={false}>
            {/*DESCRIPTION TEXT FIELD SECTION */}
            <StyledDescriptionFieldContainer>
              <StyledLabelText>Description *</StyledLabelText>

              <StyledModalDescriptionTextInput
                placeholder="Add Description"
                style={[{color: convertStatusValueToColor(newNotice.status)}]}
                value={newNotice.description}
                onChangeText={text =>
                  handleNewNoticeTextChange(text, 'description')
                }
              />
            </StyledDescriptionFieldContainer>

            {/*CREATE BY & CREATED DATE */}
            <StyledDoubleFieldContainer>
              {/**CREATED BY SECTION */}
              <StyledSingleFieldContainer>
                <StyledLabelText>Created By *</StyledLabelText>

                <StyledDisabledTextInput
                  value={user?.firstName + ' ' + user?.lastName}
                  editable={false}
                />
              </StyledSingleFieldContainer>

              {/**CREATED DATE SECTION */}
              <StyledSingleFieldContainer>
                <StyledLabelText>Created Date </StyledLabelText>

                <StyledDisabledTextInput
                  value={getCurrentDateInString('dd.mm.yyyy')}
                  editable={false}
                />
              </StyledSingleFieldContainer>
            </StyledDoubleFieldContainer>

            {/*ASSIGN TO & STATUS */}
            <StyledDoubleFieldContainer>
              {/**ASSIGN TO SECTION */}
              <StyledSingleFieldContainer>
                <StyledLabelText>Assign To *</StyledLabelText>

                <StyledAssignUserFieldContainer>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={{flex: 1, height: '100%'}}
                    contentContainerStyle={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {newNotice.assignedUsers
                      ? newNotice.assignedUsers.map(
                          (assignedUser: string, index) => {
                            let displayedUser: User | undefined =
                              userList.filter(
                                user => user.userId === assignedUser,
                              )[0];
                            if (displayedUser)
                              return (
                                <View
                                  style={{height: 26, padding: 2}}
                                  key={index}>
                                  <StyledSelectedAssigneeDisplayContainer>
                                    <StyledSelectedAssigneeNameText>
                                      {displayedUser.firstName +
                                        ' ' +
                                        displayedUser.lastName}
                                    </StyledSelectedAssigneeNameText>
                                  </StyledSelectedAssigneeDisplayContainer>
                                </View>
                              );
                          },
                        )
                      : null}
                  </ScrollView>
                  <StyledAssignUserButton
                    onPress={() => setShowAssignUserDialog(true)}>
                    <ModalAddUsersIcon />
                  </StyledAssignUserButton>
                </StyledAssignUserFieldContainer>
              </StyledSingleFieldContainer>

              {/**Due date SECTION */}
              {/* <View style={styles.singleTextFieldContainer}>
                <Text style={styles.labelStyle}>Due Date *</Text>

                <TouchableOpacity
                  onPress={() => console.log('add due date')}
                  style={{ flex: 1 }}
                >
                  <View style={styles.singleTextInputStyle}></View>
                </TouchableOpacity>
              </View> */}

              {/**STATUS SECTION */}
              <StyledSingleFieldContainer>
                <StyledLabelText>Status</StyledLabelText>

                <TouchableOpacity
                  onPress={() => {
                    setShowChangeStatusBoard(true);
                  }}>
                  <StyledStatusSelectionContainer>
                    <StyledSelectedValueTextDisplay
                      style={[
                        {
                          color: convertStatusValueToColor(newNotice.status),
                        },
                      ]}>
                      {convertStatusValueToText(newNotice.status)}
                    </StyledSelectedValueTextDisplay>
                  </StyledStatusSelectionContainer>
                </TouchableOpacity>
              </StyledSingleFieldContainer>
            </StyledDoubleFieldContainer>

            {/*CATEGORY */}
            <StyledDoubleFieldContainer>
              {/**CATEGORY SECTION */}
              <StyledSingleFieldContainer>
                <StyledLabelText>Category *</StyledLabelText>

                <StyledCategoryValueContainer>
                  <StyledAddCategoryButton
                    onPress={() => setShowChangeCategoryDialog(true)}>
                    <StyledSelectedValueTextDisplay style={[{flex: 1}]}>
                      {newNotice.category}
                    </StyledSelectedValueTextDisplay>
                    <NoticeBoardEditCategoryIcon />
                  </StyledAddCategoryButton>
                </StyledCategoryValueContainer>
              </StyledSingleFieldContainer>
            </StyledDoubleFieldContainer>

            {/*ATTACH FILE SECTION */}
            <StyledAttachmentFieldContainer>
              <StyledLabelText>Attach File / Photo(s) </StyledLabelText>

              <StyledAttachmentDisplayContainer>
                {/*Add file btn container */}
                <StyledAddAttachmentButtonContainer>
                  <TouchableOpacity
                    onPress={() => setShowAttachmentDialog(true)}>
                    <AddButtonWithText
                      title="Attachment"
                      width={88}
                      height={30}
                    />
                  </TouchableOpacity>
                </StyledAddAttachmentButtonContainer>

                <StyledAddedAttachmentContainer>
                  {newNotice.attachments && newNotice.attachments.length > 0 ? (
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 5,
                        marginTop: 3,
                      }}>
                      {/*File List container */}
                      <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}>
                        <View
                          style={{display: 'flex', flexDirection: 'column'}}>
                          {/*Header */}
                          <View
                            style={{
                              height: 30,
                              flexDirection: 'row',
                              display: 'flex',
                            }}>
                            <StyledAddedAttachmentListHeaderText
                              style={[
                                {
                                  width: 280,
                                },
                              ]}>
                              FileName
                            </StyledAddedAttachmentListHeaderText>
                            <StyledAddedAttachmentListHeaderText
                              style={[{width: 140}]}>
                              Size
                            </StyledAddedAttachmentListHeaderText>
                          </View>
                          {/*File container */}
                          <ScrollView
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                            }}
                            showsVerticalScrollIndicator={false}>
                            {newNotice.attachments.map((attachment, index) => {
                              return (
                                <View key={index}>
                                  <NoticeAttachmentDetail
                                    key={index}
                                    file={attachment}
                                    newNotice={newNotice}
                                    setNewNotice={setNewNotice}
                                    fileIndex={index}
                                    action="addNotice"
                                  />
                                </View>
                              );
                            })}
                          </ScrollView>
                        </View>
                      </ScrollView>
                    </View>
                  ) : (
                    <StyledEmptyFileAlertContainer>
                      <StyledEmptyFileAlertText>
                        No Added File
                      </StyledEmptyFileAlertText>
                    </StyledEmptyFileAlertContainer>
                  )}
                </StyledAddedAttachmentContainer>
              </StyledAttachmentDisplayContainer>
            </StyledAttachmentFieldContainer>
          </StyledModalFormContainer>

          {/*Bottom Section */}
          <StyledModalAddNoticeBottomContainer>
            <StyledModalAddNoticeBottomTitleContainer>
              <StyledModalAddNoticeBottomTitleText>
                * required field
              </StyledModalAddNoticeBottomTitleText>
            </StyledModalAddNoticeBottomTitleContainer>

            {/*Btn container */}
            <StyledModalAddNoticeBottomButtonContainer>
              <StyledCancelButton onPress={() => setShowAddNoticeModal(false)}>
                <StyledCancelText>Cancel</StyledCancelText>
              </StyledCancelButton>

              <StyledAddButton onPress={() => addNewNotice()}>
                <AddIcon />
                <StyledAddText>Add</StyledAddText>
              </StyledAddButton>
            </StyledModalAddNoticeBottomButtonContainer>
          </StyledModalAddNoticeBottomContainer>
        </StyledModalAddNoticeContentContainer>
      </RootModalAddNoticeContainer>
    </Modal>
  );
};

export default ModalAddNotice;

const styles = StyleSheet.create({
  saveTextStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    color: 'white',
    paddingLeft: 5,
  },
  btnSaveStyle: {
    backgroundColor: 'rgb(117, 78, 224)',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
  },
  cancelTextStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
  },
  btnCancelStyle: {
    backgroundColor: 'rgb(214, 217, 223)',
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
  },

  requireTextStyle: {
    color: 'rgb(133, 92, 248)',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
  },
  bottomSectionContainer: {
    width: '100%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
  },
  addedFileContainer: {
    height: '100%',
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 6,
    marginTop: 8,
  },
  attachFileContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 20,
    height: 290,
  },
  displayTextValueStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
  },
  changeStatusBoardContainer: {
    position: 'absolute',
    width: 230,
    height: 100,
    zIndex: 1000,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  singleTextFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '45%',
    marginTop: 8,
  },
  singleTextInputStyle: {
    backgroundColor: '#F8F8F8',
    marginTop: 8,
    height: 40,
    borderRadius: 6,
    width: '100%',
    paddingLeft: 4,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
  },
  splitTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  labelStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
  },
  descriptionTextInputStyle: {
    backgroundColor: '#F8F8F8',
    marginTop: 8,
    height: 80,
    borderRadius: 6,
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 8,
    marginBottom: 4,
  },
  addNoticeTextStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 25,
    lineHeight: 30,
  },
  addNoticeFormContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 14,
  },
  addNoticeTextContainer: {
    width: '100%',
    justifyContent: 'center',
    height: 50,
    alignItems: 'flex-start',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgb(150, 162, 190)',
  },
  modalBodyContainer: {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 12,
  },
  rootModalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F2F5',
  },
  modalTopMenuBar: {
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  fileCellContainer: {
    height: '100%',
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E6EF',
  },
  fileCellText: {
    fontFamily: 'Roboto_Mono',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 13,
    color: '#000000',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  fileListTextHeader: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#9C9EAD',
    textAlign: 'center',
  },
});
