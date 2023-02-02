import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
type Props = {}

const ExpandLeftArrow = (props: Props) => {
  return (
    <View style={styles.rootContainer}>
      <LottieView
        autoPlay
        style={{
          width: 50,
          height: 30,

          backgroundColor: 'transparent',
        }}
        source={require('../../assets/ExpandLeftArrow.json')}
      />
    </View>
  )
}

export default ExpandLeftArrow

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
