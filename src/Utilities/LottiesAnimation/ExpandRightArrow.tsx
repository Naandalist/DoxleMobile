import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import LottieView from 'lottie-react-native'
type Props = {}

const ExpandRightArrow = (props: Props) => {
  return (
    <View style={styles.rootContainer}>
      <LottieView
        autoPlay
        style={{
          width: 50,
          height: 30,

          backgroundColor: 'transparent',
        }}
        source={require('../../assets/ExpandRightArrow.json')}
      />
    </View>
  )
}

export default ExpandRightArrow

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
