import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import { Asset } from 'expo-media-library'

type Props = {}

export interface IPendingUploadedSpecPhoto {
  costCodeId: string
  costCodeTitle: string
  projectId: string
  companyId: string
  uriPath: string
  projectAddress: string
}

export interface IPhotoContext {
  pendingUploadedSpecPhotos: IPendingUploadedSpecPhoto[]
  setPendingUploadedSpecPhotos: Function
  deleteDirectoryOrFile: Function
  successfullUploadedSpecPhotos: IPendingUploadedSpecPhoto[]
  setSuccessfullUploadedSpecPhotos: Function
  isSpecUploadCompletedShow: boolean
  setIsSpecUploadCompletedShow: Function
  clearAsyncSuccessfullUploadedSpecPhotos: Function
}
const SpecificationContext = React.createContext({})

const SpecificationContextProvider = (children: any) => {
  const [pendingUploadedSpecPhotos, setPendingUploadedSpecPhotos] = useState<
    IPendingUploadedSpecPhoto[]
  >([])
  const [successfullUploadedSpecPhotos, setSuccessfullUploadedSpecPhotos] =
    useState<IPendingUploadedSpecPhoto[]>([])

  const [isSpecUploadCompletedShow, setIsSpecUploadCompletedShow] =
    useState<boolean>(false)

  // useEffect(() => {
  //   if (pendingUploadedFiles.length > 0) {
  //     console.log(
  //       'NUM OF PENDING FILES CONTEXT ADDED:',
  //       pendingUploadedFiles.length
  //     )
  //     AsyncStorage.setItem(
  //       'pendingUploadPhoto',
  //       JSON.stringify(pendingUploadedFiles)
  //     )
  //     console.log('FINISH SET ASYNC')
  //   } else console.log('NO PENDING FILES')
  // }, [pendingUploadedFiles])

  //this method is to check any pendingfiles haven't uploaded saved in ASYNCSTORAGE
  const getInitialPendingUploadPhoto = async () => {
    const result: string | null = await AsyncStorage.getItem(
      'pendingUploadSpecPhotos'
    )

    if (result !== null) {
      console.log('RESULT ASYNC:', JSON.parse(result))
      if (JSON.parse(result).length !== 0)
        Alert.alert(
          `YOU HAVE ${
            JSON.parse(result).length
          } PENDING SPECIFICATION PHOTOS TO UPLOAD!!!`,
          `You can cancel file or keep updating those files`,
          [
            {
              text: 'Upload',
              onPress: () => {
                setPendingUploadedSpecPhotos(
                  JSON.parse(result) as IPendingUploadedSpecPhoto[]
                )
              },
            },
            {
              text: 'Cancel',
              onPress: async () => {
                let deletedPendingFiles: IPendingUploadedSpecPhoto[] =
                  JSON.parse(result) as IPendingUploadedSpecPhoto[]
                deletedPendingFiles.map((file) =>
                  deleteDirectoryOrFile(file.uriPath)
                )
                setPendingUploadedSpecPhotos([])
                AsyncStorage.removeItem('pendingUploadSpecPhotos')
              },
            },
          ]
        )
    }
    //delete asyncstorage "pendingUploadPhoto" if there is no length of pending files
    else {
      if (pendingUploadedSpecPhotos.length === 0)
        AsyncStorage.removeItem('pendingUploadSpecPhotos')
    }
  }

  //this useefect runs whenever successfullUploadedFile change to set asyncstorage value for uripath to the successfullUploadedFile
  useEffect(() => {
    if (successfullUploadedSpecPhotos.length > 0) {
      AsyncStorage.setItem(
        'uploadedSpecPhotos',
        JSON.stringify(successfullUploadedSpecPhotos)
      )
    }
  }, [successfullUploadedSpecPhotos])

  const clearAsyncSuccessfullUploadedSpecPhotos = async () => {
    setSuccessfullUploadedSpecPhotos([])
    let result: string | null = await AsyncStorage.getItem('uploadedSpecPhotos')
    if (result !== null) {
      let uploadedFiles: IPendingUploadedSpecPhoto[] = JSON.parse(
        result
      ) as IPendingUploadedSpecPhoto[]
      console.log('PREVIOUS UPLOADED FILES:', uploadedFiles)
      uploadedFiles.map(async (file) => {
        try {
          let resultDelete: boolean = await deleteDirectoryOrFile(file.uriPath)
          if (resultDelete === true) console.log('DELETE SUCCESSFULLY')
          else console.log('FAILED TO DELETE FILE')
        } catch (error: any) {
          Alert.alert('ERROR CLEARING UPLOADED PHOTO IN CACHE')
          return
        }
      })
    }
  }

  //this useEffect runs initial app to check pending upload photos not uploaded yet to promt users
  //and clear all the uploaded files to optimise cache storage
  useEffect(() => {
    getInitialPendingUploadPhoto()

    //clear cache of uploaded files
    clearAsyncSuccessfullUploadedSpecPhotos()
  }, [])

  useEffect(() => {
    //everytime pending files change, overwrite them in the asyncStorage
    if (pendingUploadedSpecPhotos.length > 0) {
      AsyncStorage.setItem(
        'pendingUploadSpecPhotos',
        JSON.stringify(pendingUploadedSpecPhotos)
      )
    }
  }, [pendingUploadedSpecPhotos])

  //method to check an existed directory or file
  const checkDirectoryOrFileExisted = async (path: string) => {
    try {
      if ((await FileSystem.getInfoAsync(path)).exists) return true
      else return false
    } catch (error: any) {
      Alert.alert('FAILED TO CHECK DIRECTORY EXISTED', error.toString())
      return false
    }
  }

  //method to delete a file or directory
  //!ONLY WORK FOR EXISTED FOLDER, CHECK FOLDER OR FILE PATH IS EXISTED THEN ONLY CALL THIS FUNCTION TO DELETE
  const deleteDirectoryOrFile = async (path: string) => {
    try {
      FileSystem.deleteAsync(path, { idempotent: true })
      return true
    } catch (error: any) {
      console.log('FILES OR DIRECTORY NOT EXISTED')
      return false
    }
  }

  const specificationContextValue: IPhotoContext = {
    pendingUploadedSpecPhotos,
    setPendingUploadedSpecPhotos,
    deleteDirectoryOrFile,
    successfullUploadedSpecPhotos,
    setSuccessfullUploadedSpecPhotos,
    isSpecUploadCompletedShow,
    setIsSpecUploadCompletedShow,
    clearAsyncSuccessfullUploadedSpecPhotos,
  }

  return (
    <SpecificationContext.Provider
      value={specificationContextValue}
      {...children}
    />
  )
}
const useSpecificationContext = () => useContext(SpecificationContext)
export { SpecificationContextProvider, useSpecificationContext }
