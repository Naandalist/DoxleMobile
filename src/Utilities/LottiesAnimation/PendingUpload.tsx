import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import LottieView from 'lottie-react-native'
import {
  IPhotoContext,
  usePhotoContext,
} from '../../Services/ContextProvider/Photo/PhotoContextProvider'
type Props = {
  filesLengthText: string
}

const PendingUpload = ({ filesLengthText }: Props) => {
  //*************Handle Background Upload*************** */
  const photoContext = usePhotoContext() as IPhotoContext
  const { pendingUploadedFiles } = photoContext
  //************************************************** */
  return (
    <View style={styles.rootContainer}>
      <LottieView
        autoPlay
        style={{
          width: 50,
          height: 30,
          backgroundColor: 'transparent',
        }}
        source={require('../../assets/PendingUpload.json')}
      />
      <Text style={styles.textInfoStyle}>{pendingUploadedFiles.length}</Text>
    </View>
  )
}

export default PendingUpload

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  textInfoStyle: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: 12,
    textAlign: 'center',
    marginTop: 4,
  },
})
