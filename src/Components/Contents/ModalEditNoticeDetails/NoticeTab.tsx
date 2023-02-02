//!PT- UPDATING SOCKET DATA STRICTLY FOLLOWING TYPE ISocketNoticeUpdateDate
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {
  AddIcon,
  ModalAddUsersIcon,
  NoticeBoardEditCategoryIcon,
} from '../NoticeBoard/NoticeBoardIcon';
import * as ImagePicker from 'react-native-image-picker';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {User} from '../../../Models/user';

import {Notice} from '../../../Models/notice';

import AssigneeContainer from './AssigneeContainer';

import useMountStatus from '../../../Utilities/checkMountStatus';
import {authContextInterface, useAuth} from '../../Provider/AuthProvider';
import {FileData} from '../../../Models/storage';
import {formatDate} from '../../../Utilities/FunctionHelpers';
import {
  INoticeBoardContext,
  NoticeBoardContext,
} from '../NoticeBoard/NoticeBoard';
import AssignUserDialog from '../AssignUserDialog/AssignUserDialog';
import {
  RootNoticeGeneralDetailTab,
  RootNoticeTabContentContainer,
  StyledAddAttachmentButtonContainer,
  StyledAddedAttachmentContainer,
  StyledAddedAttachmentListHeaderText,
  StyledAssignUserDisplayContainer,
  StyledAttachmentDisplayContainer,
  StyledAttachmentFieldContainer,
  StyledButtonCancelText,
  StyledCategoryDisplayContainer,
  StyledCategoryText,
  StyledDescriptionTextInput,
  StyledDoubleFieldContainer,
  StyledDueDateDisplayContainer,
  StyledDueDateText,
  StyledEmptyFileAlertContainer,
  StyledEmptyFileAlertText,
  StyledModalBottomButtonContainer,
  StyledModalBottomCancelButton,
  StyledModalBottomContainer,
  StyledModalBottomText,
  StyledModalBottomTextContainer,
  StyledNoticeTabDescriptionFieldContainer,
  StyledNoticeTabLabelText,
  StyledSaveButton,
  StyledSaveText,
  StyledSingleEditFieldContainer,
  StyledSingleEditFieldTextInput,
  StyledStatusDisplayContainer,
  StyledStatusText,
} from './StyledComponentsModalEditNoticeDetails';
import {
  convertStatusValueToColor,
  convertStatusValueToText,
} from '../NoticeBoard/NoticeBoardCommonResource';
import AddButtonWithText from '../../GeneralComponents/AddButtonWithText';
import ModalStatusBoardSelection from '../Status/ModalStatusBoardSelection';
import EditNoticeCategoryDialog from '../EditNoticeCategoryDialog/EditNoticeCategoryDialog';
import NoticeAttachmentDetail from '../NoticeAttachmentDetails/NoticeAttachmentDetail';
import BottomNotificationBar, {
  INotificationMessage,
} from '../../GeneralComponents/BottomNotificationBar';
import storageAPI from '../../../Services/DoxleAPI/storageAPI';
import AddAttachmentDialog from '../NoticeBoard/AddAttachmentDialog';
import {BlurView} from '@react-native-community/blur';
import LoadingScreen from '../../../Utilities/LottiesAnimation/LoadingScreen';
import ProcessingFileLoadingScreen from '../../../Utilities/LottiesAnimation/ProcessingFileLoadingScreen';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import NoticeAPI, {
  UpdateBodyNotice,
} from '../../../Services/DoxleAPI/noticeAPI';
import {Company} from '../../../Models/company';
import {useSocket} from '../../Provider/Sockets/useSocket';
type Props = {
  selectedNotice: Notice;
  setSelectedNotice: (notice: Notice | undefined) => void;
  company: Company;
};
export interface ISocketNoticeUpdateDate {
  noticeId: string;
  description?: string;
  assignedUsers?: string[];
  status?: string;
  category?: string;
  categoryId?: string;
  dueDate?: string | null;
  startDate?: string | null;
  attachments?: ISocketNoticeAttachmentData;
  pinned?: boolean;
  isArchived?: boolean;
  isComplete?: boolean;
  isPrivate?: boolean;
  isFollowup?: boolean;
}
export interface ISocketNoticeAttachmentData {
  action: 'delete' | 'add';
  fileChanges: FileData[];
}
const NoticeTab = ({selectedNotice, setSelectedNotice, company}: Props) => {
  const {getAccessToken, logOut, user, loggedIn} =
    useAuth() as authContextInterface;

  //************NOTICE BOARD CONTEXT ************* */
  const {
    notices,
    userList,
    categoryList,
    setNotices,
    setnotificationMessage,
    setSelectedCategory,
  } = useContext(NoticeBoardContext) as INoticeBoardContext;
  //********************************************** */

  //####################STATES###########################
  const [loading, setLoading] = useState<boolean>(false);
  //state to store modified notice
  const [edittedNotice, setEdittedNotice] = useState<Notice>({
    ...selectedNotice,
  });
  //state to control popup dialog assigning user
  const [showAssignUserDialog, setShowAssignUserDialog] =
    useState<boolean>(false);
  //state control show status board
  const [showChangeStatusBoard, setShowChangeStatusBoard] =
    useState<boolean>(false);
  //state control show edit category dialog
  const [showChangeCategoryDialog, setShowChangeCategoryDialog] =
    useState<boolean>(false);
  //state control show date picker
  const [showDatePicker, setshowDatePicker] = useState<boolean>(false);
  //state to control which type of date picker value is
  const [datePickerAction, setdatePickerAction] = useState<'start' | 'due'>(
    'start',
  );

  const [onPickingPhotos, setonPickingPhotos] = useState<boolean>(false);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [noticeTabNotificationMessage, setnoticeTabNotificationMessage] =
    useState<INotificationMessage | undefined>(undefined);
  //state to track changes
  const [changedField, setChangedField] = useState<Array<keyof Notice>>([]);
  //state to control show add files
  const [showAttachmentDialog, setShowAttachmentDialog] =
    useState<boolean>(false);

  //#####################################################

  //function to handle press on Status field
  const handlePressStatusField = () => {
    setShowChangeStatusBoard(true);
  };
  //function to check restrict empty field
  const checkEmptyField = (edittedNotice: Notice) => {
    if (
      edittedNotice.description === '' ||
      edittedNotice.category === undefined ||
      edittedNotice.category === ''
    )
      return false;
    else return true;
  };
  //function to handle press on date field
  const handlePressDueDateField = (action: 'start' | 'due') => {
    setshowDatePicker(true);
    setdatePickerAction(action);
  };
  const handleChangeDate = (date: Date) => {
    if (datePickerAction === 'due') {
      setEdittedNotice({
        ...edittedNotice,
        dueDate: date.toISOString(),
      });

      //check due date change or not
      if (
        formatDate(selectedNotice.dueDate as string, 'dd.MM.yyyy') !==
          formatDate(date.toISOString().substring(0, 10), 'dd.MM.yyyy') ||
        selectedNotice.dueDate === undefined
      ) {
        //changes happen
        if (!changedField.includes('dueDate'))
          setChangedField([...changedField, 'dueDate']);
      } else setChangedField(changedField.filter(value => value !== 'dueDate'));
    }

    if (datePickerAction === 'start') {
      setEdittedNotice({
        ...edittedNotice,
        startDate: date.toISOString(),
      });

      //check start date change or not
      if (
        formatDate(selectedNotice.startDate as string, 'dd.MM.yyyy') !==
          formatDate(date.toISOString().substring(0, 10), 'dd.MM.yyyy') ||
        selectedNotice.startDate === undefined
      ) {
        //changes happen
        if (!changedField.includes('startDate'))
          setChangedField([...changedField, 'startDate']);
      } else
        setChangedField(changedField.filter(value => value !== 'startDate'));
    }
    setshowDatePicker(false);
  };
  //method control changing text of new notice
  const handleDescriptionTextChange = (valueText: string, key: string) => {
    setEdittedNotice({...edittedNotice, [key]: valueText});
  };

  //function to handle add file button in add attachment dialog
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
          if (edittedNotice.attachments)
            setEdittedNotice({
              ...edittedNotice,
              attachments: [...edittedNotice.attachments, ...addedFiles],
            });
          else
            setEdittedNotice({
              ...edittedNotice,
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
  //function to handle add photo button in add attachment dialog
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
          let base64 = photo.base64;
          if (photo.uri && photo.fileSize)
            selectedImages.push({
              fileId: '',
              name: photo.fileName ? photo.fileName : `Image#${index + 1}`,
              url: photo.uri,
              type: photo.type ? photo.type : 'jpg',
              size: photo.fileSize,
            });
        });
        if (edittedNotice.attachments)
          setEdittedNotice({
            ...edittedNotice,
            attachments: [...edittedNotice.attachments, ...selectedImages],
          });
        else
          setEdittedNotice({
            ...edittedNotice,
            attachments: [...selectedImages],
          });
      }
      if (imagePickerResult.errorMessage) throw imagePickerResult.errorMessage;
    } catch (error) {
      setnoticeTabNotificationMessage({
        messageText: 'Failed To Pick Images',
        messageType: 'error',
      });
    }
    setonPickingPhotos(false);
    setShowAttachmentDialog(false);
  };

  //############ CHECK CHANGES TO HANDLE SAVE BTN #############
  const checkChangesInAssignedUser = () => {
    //check assignedUsers
    let originalAssignedUser: string[] = selectedNotice.assignedUsers
      ? selectedNotice.assignedUsers.map(user => user.userId as string)
      : [];

    let edditedAssignedUser: string[] = edittedNotice.assignedUsers
      ? edittedNotice.assignedUsers.map(user => user.userId as string)
      : [];
    //equal assignUser
    if (
      edditedAssignedUser.every(
        (val, idx) => val === originalAssignedUser[idx],
      ) &&
      edditedAssignedUser.length === originalAssignedUser.length
    ) {
      setChangedField(changedField.filter(value => value !== 'assignedUsers'));
    }
    //changes happen
    else {
      if (!changedField.includes('assignedUsers'))
        setChangedField([...changedField, 'assignedUsers']);
    }
  };
  const checkChangesInStatus = () => {
    if (selectedNotice.status !== edittedNotice.status) {
      if (!changedField.includes('status'))
        setChangedField([...changedField, 'status']);
    } else {
      if (changedField.includes('status'))
        setChangedField([...changedField.filter(field => field !== 'status')]);
    }
  };
  const checkChangesCategory = () => {
    if (
      selectedNotice.category !== edittedNotice.category &&
      selectedNotice.categoryId !== edittedNotice.categoryId
    ) {
      if (
        !changedField.includes('category') &&
        !changedField.includes('categoryId')
      )
        setChangedField([...changedField, 'category', 'categoryId']);
    } else {
      if (
        changedField.includes('category') &&
        changedField.includes('categoryId')
      )
        setChangedField([
          ...changedField.filter(
            field => field !== 'category' && field !== 'categoryId',
          ),
        ]);
    }
  };
  //this useefect to track /update changes
  useEffect(() => {
    //check assigned users
    checkChangesInAssignedUser();
    checkChangesInStatus();
    checkChangesCategory();
  }, [edittedNotice]);
  //#################################################################
  //function to handle delete attachment
  const handleDeleteAttachmentAPI = async (deletedFile: FileData) => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) throw 'UNAUTHORISED';
      const deleteResult: boolean = await storageAPI.deleteFile(
        deletedFile.fileId,
        accessToken,
      );
      if (deleteResult) {
        //update eddited Notice
        if (edittedNotice.attachments) {
          let newAttachmentList: FileData[] = edittedNotice.attachments.filter(
            (file, index) => file.fileId !== deletedFile.fileId,
          );
          setEdittedNotice({
            ...edittedNotice,
            attachments: [...newAttachmentList],
          });
        }

        //update via socket
        updateDateViaSocket({
          noticeId: edittedNotice.noticeId,
          attachments: {action: 'delete', fileChanges: [deletedFile]},
        });
        setnoticeTabNotificationMessage({
          messageText: 'File Deleted',
          messageType: 'success',
        });
      } else throw 'ERROR DELETED FILE';
    } catch (error) {
      if (setnoticeTabNotificationMessage)
        setnoticeTabNotificationMessage({
          messageText: 'Failed to Delete File',
          messageType: 'error',
        });
      return;
    }
  };

  //update with socket
  const socket = useSocket();
  const updateDateViaSocket = (data: ISocketNoticeUpdateDate) => {
    //! SOCKET SENDING
    console.log(
      '%cCLIENT = Sending startDate/endDate update ',
      'background:green; color:white',
    );
    // const messageSend: ISocketNoticeUpdateDate = {
    //   noticeId:edittedNotice.noticeId}
    // if (data.description) messageSend.description = data.description
    // if (data.assignedUsers)
    //   messageSend.assignedUsers = data.assignedUsers
    // if (data.category) messageSend.category = data.category
    // if (data.categoryId) messageSend.categoryId = data.categoryId
    // if (data.attachments) messageSend.attachments = data.attachments
    // if (data.dueDate) messageSend.dueDate = data.dueDate
    // if (data.startDate) messageSend.startDate = data.startDate
    socket.send(
      JSON.stringify({
        messageType: 'SocketDataUpdate',
        message: {
          ...data,
        },
      }),
    );
  };
  //handle update files
  const addFilesNoticeAPICall = async (
    files: FileData[],
    noticeId: string,
    updateBody?: UpdateBodyNotice,
  ) => {
    try {
      if (files.length <= 0) throw 'No files';
      const accessToken = await getAccessToken();
      if (!accessToken) throw 'ACCESS DENIED';
      let addFilesNoticeResult = await storageAPI.uploadNoticeFiles(
        files,
        setProgress,
        noticeId,
        company.companyId,
        accessToken,
      );

      //upload files successfully
      if (addFilesNoticeResult.files.length > 0) {
        setProgress(undefined);

        //update the selected notice locally
        let newNoticeList: Notice[] = [];
        //replace the new added attachments having fileId is an empty string with the result from server
        let newEdittedNotice: Notice = {
          ...edittedNotice,
          attachments: edittedNotice.attachments
            ? [
                ...edittedNotice.attachments.filter(file => file.fileId),
                ...addFilesNoticeResult.files,
              ]
            : [...addFilesNoticeResult.files],
        };
        notices.forEach(notice => {
          if (notice.noticeId === edittedNotice.noticeId)
            newNoticeList.push(newEdittedNotice);
          else newNoticeList.push(notice);
        });
        setNotices([...newNoticeList]);
        //update via socket
        //CAASE 1: general notice data have changes, update all data together
        if (updateBody)
          updateDateViaSocket({
            ...updateBody,
            noticeId: noticeId,
            attachments: {
              action: 'add',
              fileChanges: [...addFilesNoticeResult.files],
            },
          });
        //CASE 2: no changes in general notice data=> only update attachment data
        else
          updateDateViaSocket({
            noticeId: noticeId,
            attachments: {
              action: 'add',
              fileChanges: [...addFilesNoticeResult.files],
            },
          });
        //exit modal and prompt user
        setSelectedNotice(undefined);
        setnotificationMessage({
          messageText: 'Notice Updated',
          messageType: 'success',
        });
      } else if (addFilesNoticeResult.errors.length > 0) {
        // console.log('ERROR ADDED FILES:', addFilesNoticeResult.errors);

        throw 'ERROR ADDING FILES TO NEW NOTICE';
      }
    } catch (err: any) {
      setProgress(undefined);

      setnoticeTabNotificationMessage({
        messageText: 'Error in NoticeTab.addFilesNoticeAPICall()',
        messageType: 'error',
      });
      //!IF ERROR HAPPENED=> UPDATE GENERAL DATA IF HAVE CHANGES IN GENERAL DATA
      if (updateBody)
        updateDateViaSocket({
          ...updateBody,
          noticeId: noticeId,
        });
      if (err === 'AuthenticationFailure' || err === 'ACCESS DENIED') {
        logOut();
        return;
      }
      // console.error(
      //   'Error in NoticeTab.addFilesNoticeAPICall()',
      //   err.toString(),
      // );
      // Alert.alert('Error in NoticeTab.addFilesNoticeAPICall()', err.toString());
    }
  };

  const editNewNotice = async () => {
    //check empty field first
    if (checkEmptyField(edittedNotice) === false) {
      Alert.alert('SOME FIELDS ARE EMPTY', 'Please fill up');
    }
    //get all field key which have changes
    let updateBody: UpdateBodyNotice = {};
    changedField.map(field => {
      if (field === 'assignedUsers') {
        let assignUsersId: string[] = [];
        edittedNotice.assignedUsers?.map(user =>
          assignUsersId.push(user.userId as string),
        );
        updateBody = {
          ...updateBody,
          [field]: assignUsersId,
        };
      } else
        updateBody = {
          ...updateBody,
          [field]: edittedNotice[field],
        };
    });

    //CASE 1:changes happen in general notice data like description, status...=> update via http first and then continue uploading attachments because there is no api to upload attachments together with notice
    if (Object.keys(updateBody).length > 0) {
      try {
        console.log('UPDATE BODY:', updateBody);
        setLoading(true);
        const accessToken = await getAccessToken();
        if (!accessToken) throw 'ACCESS DENIED';
        let resultEditNotice = await NoticeAPI.update(
          accessToken,
          edittedNotice.noticeId,
          user,
          updateBody,
        );
        //update general data successfully=> continue check changes in attachments field
        // if there are new attachments added => call API to upload all attachments
        // if no new attachments=> update locally and via socket
        if (resultEditNotice !== undefined) {
          let newAddedAttachments: FileData[] = edittedNotice.attachments
            ? [...edittedNotice.attachments.filter(file => !file.fileId)]
            : []; //the new added attachments doesn't have any fileId, blank string

          //there are new attachments => call upload files api
          if (newAddedAttachments.length > 0)
            addFilesNoticeAPICall(newAddedAttachments, selectedNotice.noticeId);
          //no new attachments=> upload locally and via socket
          else {
            let newNotices: Notice[] = [];
            notices.map(notice => {
              if (notice.noticeId === edittedNotice.noticeId)
                newNotices.push(edittedNotice);
              else newNotices.push(notice);
            });
            setNotices([...newNotices]);
            setSelectedNotice(undefined);

            //update via socket, only update field having changes
            updateDateViaSocket({
              noticeId: resultEditNotice.noticeId,
              ...updateBody,
            });
            setnotificationMessage({
              messageText: 'Notice Updated',
              messageType: 'success',
            });
          }
          //throw when fail to update
        } else throw 'FAILED TO UPDATE NOTICE';
      } catch (err: any) {
        setLoading(false);
        console.error('Error in NoticeTab.editNewNotice()', err.toString());
        setnoticeTabNotificationMessage({
          messageText: 'Failed To Update Notice',
          messageType: 'error',
        });
        // Alert.alert('Error in NoticeTab.editNewNotice()', err.toString());
      }
    }

    //CASE 2: there is no changes in general data but have new attachments added => update attachments via http
    else if (edittedNotice.attachments) {
      let newAddedAttachments: FileData[] = [
        ...edittedNotice.attachments.filter(file => !file.fileId),
      ]; //extract all new added attachments because they have blank string fileId, the existed ones already have id generated in backend

      //there are new added attachments=> call update file api
      if (newAddedAttachments.length > 0)
        addFilesNoticeAPICall(newAddedAttachments, selectedNotice.noticeId);
      //no changes in files too=> exit modal and do nothing
      else {
        setSelectedNotice(undefined);
      }
    }
  };

  return (
    <RootNoticeGeneralDetailTab>
      {noticeTabNotificationMessage && (
        <BottomNotificationBar
          messageText={noticeTabNotificationMessage.messageText}
          unmountControl={setnoticeTabNotificationMessage}
          messageType={noticeTabNotificationMessage.messageType}
        />
      )}
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
              progress
                ? `Uploading Attachments...${progress}%`
                : 'Processing Files...'
            }
          />
        </BlurView>
      )}

      <ModalStatusBoardSelection
        show={showChangeStatusBoard}
        controlShow={setShowChangeStatusBoard}
        actionType="editNotice"
        edittedNotice={edittedNotice}
        setEdittedNotice={setEdittedNotice}
      />
      {/*Dialog for add assignee users */}
      <AssignUserDialog
        action="editNotice"
        showDialog={showAssignUserDialog}
        setShowDialog={setShowAssignUserDialog}
        userList={userList}
        dialogHeight={300}
        edittedNotice={edittedNotice}
        setEdittedNotice={setEdittedNotice}
      />

      {/*Dialog for changing category */}
      <EditNoticeCategoryDialog
        showDialog={showChangeCategoryDialog}
        setShowDialog={setShowChangeCategoryDialog}
        categoryList={categoryList}
        action="editNotice"
        edittedNotice={edittedNotice}
        setEdittedNotice={setEdittedNotice}
        dialogHeight={400}
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

      {/* Modal date picker to change date */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={value => handleChangeDate(value)}
        onCancel={() => setshowDatePicker(false)}
        date={
          datePickerAction === 'start' && edittedNotice.startDate
            ? new Date(edittedNotice.startDate)
            : datePickerAction === 'due' && edittedNotice.dueDate
            ? new Date(edittedNotice.dueDate)
            : undefined
        }
      />
      {/*FORM BODY */}
      <RootNoticeTabContentContainer
        showsVerticalScrollIndicator={false}
        style={noticeTabNotificationMessage && {zIndex: 0}}>
        {/*DESCRIPTION TEXT FIELD SECTION */}
        <StyledNoticeTabDescriptionFieldContainer>
          <StyledNoticeTabLabelText>Description *</StyledNoticeTabLabelText>

          <StyledDescriptionTextInput
            placeholder="Add Description"
            style={[
              {
                color: edittedNotice.pinned
                  ? 'red'
                  : convertStatusValueToColor(edittedNotice.status),
              },
            ]}
            value={edittedNotice.description}
            onChangeText={text => {
              //update text changes from edditedNotice state
              handleDescriptionTextChange(text, 'description');

              //descrpiption changed
              if (
                text.toLowerCase() !== selectedNotice.description.toLowerCase()
              ) {
                if (changedField.indexOf('description') === -1)
                  setChangedField([...changedField, 'description']);
              }

              //no changes or user change mind
              else {
                setChangedField(
                  changedField.filter(value => value !== 'description'),
                );
              }
            }}
            multiline={true}
          />
        </StyledNoticeTabDescriptionFieldContainer>

        {/*CREATE BY & CREATED DATE */}
        <StyledDoubleFieldContainer>
          {/**CREATED BY SECTION */}
          <StyledSingleEditFieldContainer>
            <StyledNoticeTabLabelText>Created By *</StyledNoticeTabLabelText>

            <StyledSingleEditFieldTextInput
              value={
                edittedNotice.creator
                  ? edittedNotice.creator?.firstName +
                    ' ' +
                    edittedNotice.creator?.lastName
                  : ''
              }
              editable={false}
            />
          </StyledSingleEditFieldContainer>

          {/**CREATED DATE SECTION */}
          <StyledSingleEditFieldContainer>
            <StyledNoticeTabLabelText>Created Date </StyledNoticeTabLabelText>

            <StyledSingleEditFieldTextInput
              value={formatDate(edittedNotice.timeStamp, 'dd.MM.yyyy')}
              editable={false}
            />
          </StyledSingleEditFieldContainer>
        </StyledDoubleFieldContainer>

        {/*ASSIGN TO & STATUS */}
        <StyledDoubleFieldContainer>
          {/**ASSIGN TO SECTION */}
          <StyledSingleEditFieldContainer>
            <StyledNoticeTabLabelText>Assign To *</StyledNoticeTabLabelText>

            <StyledAssignUserDisplayContainer>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={{flex: 1, height: '100%'}}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {edittedNotice.assignedUsers
                  ? edittedNotice.assignedUsers.map(
                      (assignedUser: User, index) => {
                        let displayedUser: User | undefined;
                        userList.filter(user => {
                          if (user.userId === assignedUser.userId)
                            displayedUser = user;
                        })[0];
                        if (displayedUser)
                          return (
                            <AssigneeContainer
                              assigneeName={
                                displayedUser.firstName +
                                ' ' +
                                displayedUser.lastName
                              }
                              key={index}
                            />
                          );
                      },
                    )
                  : null}
              </ScrollView>
              <TouchableOpacity
                style={{
                  height: '100%',
                  width: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setShowAssignUserDialog(true)}>
                <ModalAddUsersIcon />
              </TouchableOpacity>
            </StyledAssignUserDisplayContainer>
          </StyledSingleEditFieldContainer>

          {/**STATUS SECTION */}
          <StyledSingleEditFieldContainer>
            <StyledNoticeTabLabelText>Status</StyledNoticeTabLabelText>

            <TouchableOpacity onPress={handlePressStatusField}>
              <StyledStatusDisplayContainer>
                <StyledStatusText
                  style={{
                    color: convertStatusValueToColor(edittedNotice.status),
                  }}>
                  {convertStatusValueToText(edittedNotice.status)}
                </StyledStatusText>
              </StyledStatusDisplayContainer>
            </TouchableOpacity>
          </StyledSingleEditFieldContainer>
        </StyledDoubleFieldContainer>

        {/*STARTDATE & DUEDATE */}
        <StyledDoubleFieldContainer>
          {/**Start date SECTION */}
          <StyledSingleEditFieldContainer>
            <StyledNoticeTabLabelText>Start Date *</StyledNoticeTabLabelText>

            <TouchableOpacity
              onPress={() => handlePressDueDateField('start')}
              style={{flex: 1}}>
              <StyledDueDateDisplayContainer>
                <StyledDueDateText>
                  {edittedNotice.startDate
                    ? formatDate(edittedNotice.startDate, 'dd.MM.yyyy')
                    : ''}
                </StyledDueDateText>
              </StyledDueDateDisplayContainer>
            </TouchableOpacity>
          </StyledSingleEditFieldContainer>

          {/**Due date SECTION */}
          <StyledSingleEditFieldContainer>
            <StyledNoticeTabLabelText>Due Date *</StyledNoticeTabLabelText>

            <TouchableOpacity
              onPress={() => handlePressDueDateField('due')}
              style={{flex: 1}}>
              <StyledDueDateDisplayContainer>
                <StyledDueDateText>
                  {edittedNotice.dueDate
                    ? formatDate(edittedNotice.dueDate, 'dd.MM.yyyy')
                    : ''}
                </StyledDueDateText>
              </StyledDueDateDisplayContainer>
            </TouchableOpacity>
          </StyledSingleEditFieldContainer>
        </StyledDoubleFieldContainer>

        {/**CATEGORY SECTION */}
        <StyledDoubleFieldContainer>
          <StyledSingleEditFieldContainer>
            <StyledNoticeTabLabelText>Category *</StyledNoticeTabLabelText>

            <StyledCategoryDisplayContainer>
              <TouchableOpacity
                onPress={() => setShowChangeCategoryDialog(true)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 4,
                }}>
                <StyledCategoryText>
                  {edittedNotice.category}
                </StyledCategoryText>
                <NoticeBoardEditCategoryIcon />
              </TouchableOpacity>
            </StyledCategoryDisplayContainer>
          </StyledSingleEditFieldContainer>
        </StyledDoubleFieldContainer>

        {/*ATTACH FILE SECTION */}
        <StyledAttachmentFieldContainer>
          <StyledNoticeTabLabelText>
            Attach File / Photo(s)
          </StyledNoticeTabLabelText>

          <StyledAttachmentDisplayContainer>
            {/*Add file btn container */}
            <StyledAddAttachmentButtonContainer>
              <TouchableOpacity onPress={() => setShowAttachmentDialog(true)}>
                <AddButtonWithText title="Attachment" width={88} height={30} />
              </TouchableOpacity>
            </StyledAddAttachmentButtonContainer>

            {/*FILE CONTAINER */}
            <StyledAddedAttachmentContainer>
              {edittedNotice.attachments &&
              edittedNotice.attachments.length > 0 ? (
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
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                      {/*Header */}
                      <View
                        style={{
                          height: 30,
                          flexDirection: 'row',
                          display: 'flex',
                        }}>
                        <StyledAddedAttachmentListHeaderText
                          style={{
                            width: 280,
                          }}>
                          FileName
                        </StyledAddedAttachmentListHeaderText>
                        <StyledAddedAttachmentListHeaderText
                          style={{width: 140}}>
                          Size
                        </StyledAddedAttachmentListHeaderText>
                      </View>
                      {/*File container */}
                      <ScrollView
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}>
                        {/*Added files */}
                        {/* addedAttachments.length > 0 ? (
                          <View
                            style={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              marginBottom: 15,
                              paddingBottom: 15,
                              borderBottomWidth: 1,
                              borderBottomColor: 'rgb(117, 78, 224)',
                            }}>
                          
                            <View style={{marginBottom: 14}}>
                              <Text style={styles.addedAttachmentTextStyle}>
                                Added Attachments
                              </Text>
                            </View>
                            {addedAttachments.map((attachment, index) => {
                              return (
                                <FileAddedContainer
                                  key={index}
                                  file={attachment}
                                  addedAttachments={addedAttachments}
                                  setAddedAttachments={setAddedAttachments}
                                  fileIndex={index}
                                />
                              );
                            })}
                          </View>
                        ) : null */}

                        {/* Removed files */}
                        {/* removedAttachments.length > 0 ? (
                          <View
                            style={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              marginBottom: 15,
                              paddingBottom: 15,
                              borderBottomWidth: 1,
                              borderBottomColor: 'rgb(117, 78, 224)',
                            }}>
                           
                            <View style={{marginBottom: 14}}>
                              <Text
                                style={[
                                  styles.addedAttachmentTextStyle,
                                  {color: 'red'},
                                ]}>
                                Removed Attachments
                              </Text>
                            </View>
                            {removedAttachments.map((attachment, index) => {
                              return (
                                <FileRemovedContainer
                                  key={index}
                                  file={attachment}
                                  fileIndex={index}
                                  edittedNotice={edittedNotice}
                                  setEdittedNotice={setEdittedNotice}
                                  removedAttachments={removedAttachments}
                                  setRemovedAttachments={setRemovedAttachments}
                                />
                              );
                            })}
                          </View>
                        ) : null */}

                        {edittedNotice.attachments
                          ? edittedNotice.attachments.map(
                              (attachment, index) => {
                                return (
                                  <NoticeAttachmentDetail
                                    key={index}
                                    file={attachment}
                                    edittedNotice={edittedNotice}
                                    setEdittedNotice={setEdittedNotice}
                                    fileIndex={index}
                                    action="editNotice"
                                    deleteAttachmentFunction={
                                      handleDeleteAttachmentAPI
                                    }
                                  />
                                );
                              },
                            )
                          : null}
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
      </RootNoticeTabContentContainer>

      {/*Bottom Section */}
      <StyledModalBottomContainer>
        <StyledModalBottomTextContainer>
          <StyledModalBottomText>* required field</StyledModalBottomText>
        </StyledModalBottomTextContainer>

        {/*Btn container */}
        <StyledModalBottomButtonContainer>
          <StyledModalBottomCancelButton
            onPress={() => setSelectedNotice(undefined)}>
            <StyledButtonCancelText>Cancel</StyledButtonCancelText>
          </StyledModalBottomCancelButton>

          <StyledSaveButton
            onPress={() => {
              editNewNotice();
            }}>
            <AddIcon />
            <StyledSaveText>Save</StyledSaveText>
          </StyledSaveButton>
        </StyledModalBottomButtonContainer>
      </StyledModalBottomContainer>
    </RootNoticeGeneralDetailTab>
  );
};

export default NoticeTab;
