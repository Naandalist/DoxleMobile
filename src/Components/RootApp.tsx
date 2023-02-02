import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SocketProvider} from './Provider/Sockets/socketContext';
import {OrientationProvider} from './Provider/Orientation/OrientationContext';
import {HomeScreenContainer, RootAppContainer} from './StyledComponentsRootApp';
import {authContextInterface, useAuth} from './Provider/AuthProvider';
import {BlurView} from '@react-native-community/blur';
import LoadingScreen from '../Utilities/LottiesAnimation/LoadingScreen';
import Drawer from './Drawer/Drawer';
import NoticeBoard from './Contents/NoticeBoard/NoticeBoard';
import {Company} from '../Models/company';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ForgotPassword from './ForgotPassword';
import Login from './Login/Login';
import Notice from './Notice';

const Stack = createNativeStackNavigator();

type Props = {};
export type TView = 'notice' | 'costings' | 'dockets' | 'calculator';

const company: Company = {
  addressCity: 'Mulgrave',
  addressCountry: '',
  addressL1: '',
  addressL2: '',
  addressPostCode: '3170',
  addressState: 'VIC',
  companyAbn: '27 629 050 326',
  companyId: 'c074feca-fd03-4620-88b4-efedc1235ad1',
  email: 'build@byson.com.au',
  logo: 'https://firebasestorage.googleapis.com/v0/b/doxle-build-98566.appspot.com/o/company%2Fbyson%2Fstorage%2Flogo_1632874290638.png?alt=media&token=27d1a49d-1eca-447e-9026-cbcc3f360c29',
  name: 'Byson Group',
  owner: '6c46322b-405f-41c1-b406-2bf6f9b558c7',
  phone: '(03) 9052 4527',
};
const RootApp = (props: Props) => {
  //###################STATES SECTION###################
  const [currentView, setcurrentView] = useState<TView>('notice');
  const [showDrawer, setshowDrawer] = useState<boolean>(false);
  const [isTappedOutside, setIsTappedOutside] = useState<boolean>(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //####################################################

  const {loggedIn, isCheckingLogInStatus, user} =
    useAuth() as authContextInterface;

  useEffect(() => {
    AsyncStorage.setItem('currentCompany', JSON.stringify(company));
  }, []);

  // console.log('loggedIn: ', loggedIn);
  // console.log('user: ', user);

  if (isCheckingLogInStatus === true && !user) {
    return (
      <BlurView
        blurType="dark"
        blurAmount={4}
        // eslint-disable-next-line react-native/no-inline-styles
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
    );
  }

  return (
    <NavigationContainer>
      <SocketProvider>
        <OrientationProvider>
          <Stack.Navigator>
            {!isLoggedIn ? (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                  options={{headerShown: true}}
                />
              </>
            ) : (
              <Stack.Screen
                name="Notice"
                component={Notice}
                options={{headerShown: false}}
              />
            )}
          </Stack.Navigator>

          {/* <ForgotPassword /> */}
          {/* </RootAppContainer> */}
        </OrientationProvider>
      </SocketProvider>
    </NavigationContainer>
  );
};

export default RootApp;

const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 3,
    top: 0,
    left: 0,
  },
});
