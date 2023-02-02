import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
  progress?: number
}

const ProgressBarScreen = ({ progress }: Props) => {
  return (
    <View style={styles.rootContainer}>
      {/*opacity masking screen */}
      <View style={styles.maskOpacityTransparent}></View>
    </View>
  )
}

export default ProgressBarScreen

const styles = StyleSheet.create({
  maskOpacityTransparent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F2F5',
    opacity: 0.6,
  },
  rootContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
    zIndex: 100000000,
  },
})
