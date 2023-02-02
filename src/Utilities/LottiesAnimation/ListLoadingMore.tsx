import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
type Props = {};

const ListLoadingMore = (props: Props) => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <LottieView
        autoPlay
        style={{
          width: 100,
          height: 60,
          backgroundColor: 'transparent',
        }}
        source={require('../../../assets/LoadingMore.json')}
      />
    </View>
  );
};

export default ListLoadingMore;

const styles = StyleSheet.create({});
