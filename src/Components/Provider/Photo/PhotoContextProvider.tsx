import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-media-library';
import {authContextInterface, useAuth} from '../AuthProvider';
import storageAPI from '../../../Services/DoxleAPI/storageAPI';

type Props = {};

export interface IPendingUploadedFile {
  costCodeId?: string;
  costCodeTitle?: string;
  projectId: string;
  companyId: string;
  uriPath: string;
  type: string;
  name: string;
  uploadField: 'costcode' | 'project';
  folderId: string;
  folderName: string;
  projectAddress: string;
}

export interface IPhotoContext {
  pendingUploadedFiles: IPendingUploadedFile[];
  setPendingUploadedFiles: Function;

  // isPendingUploadFolderExisted: boolean
  successfullUploadedFile: IPendingUploadedFile[];
  setSuccessfullUploadedFile: Function;
  isUploadCompleteAlertShow: boolean;
  setIsUploadCompleteAlertShow: Function;
  clearSuccessfullUploadedFile: Function;
  isOnUploadProcess: boolean;
  setIsOnUploadProcess: Function;
  currentUploadingFile: IPendingUploadedFile | null;
  progressUpload: number | null;
  loadingCurrentFile: boolean;
  errorUploadedFiles: IPendingUploadedFile[];
  retryFailedUploads: () => void;
  clearFailedUploads: () => void;
}
const PhotoContext = React.createContext({});

const PhotoContextProvider = (children: any) => {
  const {getAccessToken, logOut, user, loggedIn} =
    useAuth() as authContextInterface;

  //###########EXPORTED STATE###########
  const [pendingUploadedFiles, setPendingUploadedFiles] = useState<
    IPendingUploadedFile[]
  >([]);
  const [successfullUploadedFile, setSuccessfullUploadedFile] = useState<
    IPendingUploadedFile[]
  >([]);

  const [errorUploadedFiles, setErrorUploadedFiles] = useState<
    IPendingUploadedFile[]
  >([]);

  // const [isPendingUploadFolderExisted, setIsPendingUploadFolderExisted] = useState<boolean>(false)
  const [isUploadCompleteAlertShow, setIsUploadCompleteAlertShow] =
    useState<boolean>(true);
  const [isOnUploadProcess, setIsOnUploadProcess] = useState<boolean>(false);

  //##############HANDLE UI STATE#################
  const [isFinishedUpload, setIsFinishedUpload] = useState<boolean>(true);
  const [currentUploadingFile, setCurrentUploadingFile] =
    useState<IPendingUploadedFile | null>(null);
  const [progressUpload, setProgressUpload] = useState<number | null>(null);

  const [loadingCurrentFile, setLoadingCurrentFile] = useState<boolean>(false);

  //############################################
  //##########################################'

  //this method is to check any pendingfiles haven't uploaded saved in ASYNCSTORAGE
  const getInitialPendingUploadPhoto = async () => {
    const errors: string | null = await AsyncStorage.getItem(
      'errorUploadedFiles',
    );
    if (errors)
      setErrorUploadedFiles(JSON.parse(errors) as IPendingUploadedFile[]);

    const result: string | null = await AsyncStorage.getItem(
      'pendingUploadPhoto',
    );
    console.log('getInitialPendingUploadPhoto', result);
    if (result !== null) {
      if (JSON.parse(result).length !== 0)
        Alert.alert(
          `YOU HAVE ${JSON.parse(result).length} PENDING FILES TO UPLOAD!!!`,
          `You can cancel file or keep updating those files`,
          [
            {
              text: 'Upload',
              onPress: () => {
                setPendingUploadedFiles(
                  JSON.parse(result) as IPendingUploadedFile[],
                );
              },
            },
            {
              text: 'Cancel',
              onPress: async () => {
                let deletedPendingFiles: IPendingUploadedFile[] = JSON.parse(
                  result,
                ) as IPendingUploadedFile[];
                deletedPendingFiles.map(file =>
                  deleteDirectoryOrFile(file.uriPath),
                );
                setPendingUploadedFiles([]);
                AsyncStorage.removeItem('pendingUploadPhoto');
              },
            },
          ],
        );
    }
    //delete asyncstorage "pendingUploadPhoto" if there is no length of pending files
    else {
      if (pendingUploadedFiles.length === 0)
        AsyncStorage.removeItem('pendingUploadPhoto');
    }
  };
  useEffect(() => {
    getInitialPendingUploadPhoto();

    //clear cache of uploaded files
    clearAsyncSuccessfullUploadedFile();
  }, []);

  //method to clear successfullUploadedFile
  const clearSuccessfullUploadedFile = async () => {
    //delete each file existed in cache directory to optimise cache storage
    setSuccessfullUploadedFile([]);
  };

  useEffect(() => {
    if (loggedIn && pendingUploadedFiles.length > 0) {
      setIsOnUploadProcess(true);
      AsyncStorage.setItem(
        'pendingUploadPhoto',
        JSON.stringify(pendingUploadedFiles),
      );
    } else {
      AsyncStorage.removeItem('pendingUploadPhoto');
    }
  }, [pendingUploadedFiles, loggedIn]);

  const retryFailedUploads = () => {
    setPendingUploadedFiles(errorUploadedFiles);
    setErrorUploadedFiles([]);
  };

  const clearFailedUploads = () => {
    setErrorUploadedFiles([]);
    AsyncStorage.removeItem('errorUploadedFiles');
    errorUploadedFiles.map(file => deleteDirectoryOrFile(file.uriPath));
  };

  const clearAsyncSuccessfullUploadedFile = async () => {
    let result: string | null = await AsyncStorage.getItem('uploadedFiles');
    console.log('clearAsyncSuccessfullUploadedFile', result);
    if (result !== null) {
      let uploadedFiles: IPendingUploadedFile[] = JSON.parse(
        result,
      ) as IPendingUploadedFile[];
      console.log('PREVIOUS UPLOADED FILES:', uploadedFiles);
      uploadedFiles.map(async file => {
        try {
          let resultDelete: boolean = await deleteDirectoryOrFile(file.uriPath);
          if (resultDelete === true) console.log('DELETE SUCCESSFULLY', file);
          else console.log('FAILED TO DELETE FILE', file);
        } catch (error: any) {
          Alert.alert('ERROR CLEARING UPLOADED PHOTO IN CACHE');
          return;
        }
      });
      setSuccessfullUploadedFile([]);
      AsyncStorage.removeItem('uploadedFiles');
    }
  };

  //this useEffect runs initial app to check pending upload photos not uploaded yet to promt users
  //and clear all the uploaded files to optimise cache storage

  // useEffect(() => {
  //   //everytime pending files change, overwrite them in the asyncStorage
  //   if (pendingUploadedFiles.length > 0) {
  //     AsyncStorage.setItem(
  //       'pendingUploadPhoto',
  //       JSON.stringify(pendingUploadedFiles)
  //     )
  //   } else {
  //     AsyncStorage.removeItem('pendingUploadPhoto')
  //     //clear successfull uploaded file
  //     clearAsyncSuccessfullUploadedFile()
  //   }
  // }, [pendingUploadedFiles])

  //method to check an existed directory or file
  const checkDirectoryOrFileExisted = async (path: string) => {
    try {
      if ((await FileSystem.getInfoAsync(path)).exists) return true;
      else return false;
    } catch (error: any) {
      Alert.alert('FAILED TO CHECK DIRECTORY EXISTED', error.toString());
      return false;
    }
  };

  //!################HANDING UPLOAD PART##############
  const handleUploadPhoto = async (files: IPendingUploadedFile[]) => {
    if (files[0].uriPath === pendingUploadedFiles[0].uriPath) {
      setIsFinishedUpload(false);
      //loading true is to wait for the newFileList update
      setLoadingCurrentFile(true);
      const newFiles: Blob[] = [];
      let uploadedFiles = files.map(file => file.uriPath);
      if (
        files[0].folderId !== undefined &&
        files[0].folderName !== undefined
      ) {
        //upload files with costcodes
        if (
          files[0].uploadField === 'costcode' &&
          files[0].costCodeId !== undefined &&
          files[0].costCodeTitle !== undefined
        ) {
          try {
            const accessToken = await getAccessToken();
            const response = await storageAPI.uploadCCFiles(
              newFiles,
              uploadedFiles,
              files[0].folderId,
              files[0].folderName,
              setProgressUpload,
              files[0].costCodeId,
              files[0].costCodeTitle,
              files[0].projectId,
              files[0].companyId,
              accessToken,
            );
            if (!response) throw 'handleUploadPhoto Response is undefined';
            //the file is uploaded successfully
            if (response.files.length > 0) {
              setProgressUpload(null);

              //set loading false
              setLoadingCurrentFile(false);

              //remove the item out of currentUploadingFile state
              setCurrentUploadingFile(null);

              //add the complete uploaded file to state uploaded file
              setSuccessfullUploadedFile([
                ...successfullUploadedFile,
                files[0],
              ]);

              //finally finish uploading cycle
              setIsFinishedUpload(true);
            }
          } catch (err: any) {
            console.error(
              'Error1 in PhotoContextProvidor.handleUploadPhoto()',
              err.toString(),
            );

            //keep uploading and add the failed files in error list
            setProgressUpload(null);

            //set loading false
            setLoadingCurrentFile(false);

            //remove the item out of currentUploadingFile state
            setCurrentUploadingFile(null);

            //add the complete uploaded file to state uploaded file
            const errors = [...errorUploadedFiles, files[0]];
            setErrorUploadedFiles(errors);
            AsyncStorage.setItem('errorUploadedFiles', JSON.stringify(errors));

            //finally finish uploading cycle
            setIsFinishedUpload(true);
          }
        }

        //upload files with project
        else if (files[0].uploadField === 'project') {
          try {
            const accessToken = await getAccessToken();
            const response = await storageAPI.uploadProjectFiles(
              newFiles,
              uploadedFiles,
              files[0].folderId,
              files[0].folderName,
              setProgressUpload,
              files[0].projectId,
              files[0].companyId,
              accessToken,
            );
            //the file is uploaded successfully
            if (!response) throw 'Response was undefined';
            if (response.files.length > 0) {
              setProgressUpload(null);

              //set loading false
              setLoadingCurrentFile(false);

              //remove the item out of currentUploadingFile state
              setCurrentUploadingFile(null);

              //add the complete uploaded file to state uploaded file
              setSuccessfullUploadedFile([
                ...successfullUploadedFile,
                files[0],
              ]);

              //delete the file directory
              //deleteFilePath(files[0].uriPath)

              //finally finish uploading cycle
              setIsFinishedUpload(true);
            }
          } catch (err: any) {
            console.error(
              'Error12 in PhotoContextProvidor.handleUploadPhoto()',
              err.toString(),
            );

            //keep uploading and add the failed files in error list
            setProgressUpload(null);

            //set loading false
            setLoadingCurrentFile(false);

            //remove the item out of currentUploadingFile state
            setCurrentUploadingFile(null);

            //add the complete uploaded file to state uploaded file
            setErrorUploadedFiles([...errorUploadedFiles, files[0]]);

            //finally finish uploading cycle
            setIsFinishedUpload(true);
          }
        }
      }
    }
  };
  //===============================================================

  //this useEffect listen to handle upload action finish or not
  useEffect(() => {
    if (isFinishedUpload === true) {
      //there is no file currently uploaded => check files pending to be uploaded
      //have files to upload
      if (pendingUploadedFiles.length > 0 && loggedIn) {
        console.log('FILES PENDING LEFT:', pendingUploadedFiles.length);
        //start uploading
        let nextUploadedFile: IPendingUploadedFile = pendingUploadedFiles[0];
        //set the current upload file to display
        setCurrentUploadingFile(nextUploadedFile);
        handleUploadPhoto([nextUploadedFile]); //pop the first element to upload

        //remove it from the pending files
        let newPendingFiles = pendingUploadedFiles.slice(1);
        setPendingUploadedFiles([...newPendingFiles]);

        //control complete alert show
        setIsUploadCompleteAlertShow(false);
      }
    }
  }, [isFinishedUpload, pendingUploadedFiles, loggedIn]);

  //method to delete a file or directory
  //!ONLY WORK FOR EXISTED FOLDER, CHECK FOLDER OR FILE PATH IS EXISTED THEN ONLY CALL THIS FUNCTION TO DELETE
  const deleteDirectoryOrFile = async (path: string) => {
    try {
      if ((await checkDirectoryOrFileExisted(path)) === true) {
        console.log('FILE EXISTED');
        FileSystem.deleteAsync(path, {idempotent: true});
        return true;
      } else return false;
    } catch (error: any) {
      console.log('FILES OR DIRECTORY NOT EXISTED');
      return false;
    }
  };

  const photoContextValue: IPhotoContext = {
    pendingUploadedFiles: pendingUploadedFiles,
    setPendingUploadedFiles: setPendingUploadedFiles,
    // isPendingUploadFolderExisted: isPendingUploadFolderExisted,
    successfullUploadedFile,
    setSuccessfullUploadedFile,
    isUploadCompleteAlertShow: isUploadCompleteAlertShow,
    setIsUploadCompleteAlertShow: setIsUploadCompleteAlertShow,
    clearSuccessfullUploadedFile: clearSuccessfullUploadedFile,
    isOnUploadProcess,
    setIsOnUploadProcess,
    currentUploadingFile,
    progressUpload,
    loadingCurrentFile,
    errorUploadedFiles,
    retryFailedUploads,
    clearFailedUploads,
  };

  return <PhotoContext.Provider value={photoContextValue} {...children} />;
};
const usePhotoContext = () => useContext(PhotoContext);
export {PhotoContextProvider, usePhotoContext};
