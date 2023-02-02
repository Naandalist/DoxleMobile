import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
type Props = {
  message?: string
}

const NoticeBoardLoadingScreenIOS = ({ message }: Props) => {
  // const dogQuotes = [
  //   'Dogs noses are wet to help absorb scent chemicals',
  //   'Newfoundlands are amazing lifeguards',
  //   'The Beatles song ‘A Day in the Life’ has a frequency only dogs can hear',
  //   'Three dogs survived the Titanic sinking',
  // ]
  return (
    <View
      style={{
        width: '100%',
        height: '85%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: '15%',
      }}
    >
      {message ? <Text>{message}</Text> : null}
      <LottieView
        autoPlay
        style={{
          width: 105,
          height: 80.5,
          backgroundColor: 'transparent',
        }}
        source={require('../../../assets/NoticeBoardLoading.json')}
      />
      <View
        style={{
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#b5bdc5',
            fontFamily: 'Roboto_Mono',
            textAlign: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          Notice Board Loading...
        </Text>
      </View>
    </View>
  )
}

export default NoticeBoardLoadingScreenIOS

const styles = StyleSheet.create({})
