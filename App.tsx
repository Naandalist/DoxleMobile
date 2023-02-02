/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {AuthProvider} from './src/Components/Provider/AuthProvider';
import RootApp from './src/Components/RootApp';
import RNBootSplash from 'react-native-bootsplash';
function App(): JSX.Element {
  React.useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide();
    }, 1000);
  }, []);
  return (
    <AuthProvider>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <RootApp />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
