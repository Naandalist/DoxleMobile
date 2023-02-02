import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useAnimatedValue,
  View,
  ImageBackground,
} from 'react-native';
import React, {useEffect} from 'react';
import {authContextInterface, useAuth} from '../Provider/AuthProvider';
import {
  DrawerCloseIcon,
  DrawerDoxleLogo,
  DrawerLogOutIcon,
} from '../GeneralIcons';
import styled from 'styled-components/native';
import DrawerItem from './DrawerItem';
import {TView} from '../RootApp';
import {
  BottomDrawerContainer,
  CloseIconContainer,
  LogoContainer,
  LogoutIconContainer,
  MainMenuContainer,
  MenuItemContainer,
  RootDrawerContainer,
  StyledDrawerBlueView,
  StyledDrawerMainView,
  TopDrawerContainer,
} from './StyledComponentsDrawer';
import UserInfoWithAvatar from '../GeneralComponents/UserInfoWithAvatar';
import {User} from '../../Models/user';
import {DrawerSettingIcon} from '../GeneralIcons';
import {Swipeable} from 'react-native-gesture-handler';
interface IDrawer {
  show: boolean;
  setShow: Function;
  currentView: TView;
  setcurrentView: (view: TView) => void;
  isTappedOutside: boolean;
  setIsTappedOutside: (tapOutside: boolean) => void;
}
const menuItems = ['Notice Board', 'Costings', 'Dockets', 'Calculator'];
const Drawer = ({
  show,
  setShow,
  currentView,
  setcurrentView,
  isTappedOutside,
  setIsTappedOutside,
}: IDrawer) => {
  const {user} = useAuth() as authContextInterface;

  const handleLogOut = () => {};

  //####### HANDLE DRAWER ANIMATION ##############
  const animatedWidthValue = new Animated.Value(0);
  const animatedOpacityValue = new Animated.Value(0);
  const expandIn = () =>
    Animated.timing(animatedWidthValue, {
      toValue: 320,
      duration: 200,
      easing: Easing.sin,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) fadeIn();
    });

  const expandOut = () =>
    Animated.timing(animatedWidthValue, {
      toValue: 0,
      duration: 200,
      // easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        setShow(false);
      }
    });
  const fadeIn = () =>
    Animated.timing(animatedOpacityValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

  const fadeOut = () =>
    Animated.timing(animatedOpacityValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) expandOut();
    });
  //useEffect to control animation when "show" change
  useEffect(() => {
    if (show) expandIn();
  }, [show]);

  //this useEffect control tapped outside
  useEffect(() => {
    if (isTappedOutside) {
      fadeOut();
    }
  }, [isTappedOutside]);

  //#################################################

  return (
    <RootDrawerContainer blurType="dark" blurAmount={4} blurRadius={4}>
      <Swipeable>
        <StyledDrawerMainView style={{width: animatedWidthValue}}>
          {/* <ImageBackground
            source={require('../../../assets/DrawerBackground.png')}
            style={{
              width: '80%',
              height: '100%',
              left: '10%',
              position: 'absolute',
              opacity: 0.7,
            }}
            resizeMode="contain"></ImageBackground> */}
          <TopDrawerContainer>
            <LogoContainer style={{opacity: animatedOpacityValue}}>
              {/* <DrawerDoxleLogo /> */}

              <UserInfoWithAvatar
                width={'200px'}
                height={'100%'}
                user={user as User}
              />
            </LogoContainer>

            <CloseIconContainer
              style={{
                paddingTop: Platform.OS === 'android' ? 20 : 0,
                opacity: animatedOpacityValue,
              }}>
              <TouchableOpacity
                delayPressIn={0}
                onPress={() => {
                  // fadeOut();
                }}>
                <DrawerSettingIcon />
              </TouchableOpacity>
            </CloseIconContainer>
          </TopDrawerContainer>

          <MainMenuContainer style={{opacity: animatedOpacityValue}}>
            {menuItems.map((item, index) => {
              let viewNameMatch: TView;
              switch (item) {
                case 'Notice Board':
                  viewNameMatch = 'notice';
                  break;
                case 'Costings':
                  viewNameMatch = 'costings';
                  break;
                case 'Dockets':
                  viewNameMatch = 'dockets';
                  break;
                case 'Calculator':
                  viewNameMatch = 'calculator';
                  break;
                default:
                  viewNameMatch = 'costings';
              }

              let isSelected: boolean = false;
              if (viewNameMatch === currentView) isSelected = true;
              else isSelected = false;
              //!RETURN BELOW HAS NATIVE PROPS - ANDROID
              return Platform.OS === 'ios' ? (
                <MenuItemContainer
                  key={index}
                  style={[
                    isSelected && {
                      shadowColor: '#5E32DE',
                      shadowOffset: {width: 4, height: 4},
                      shadowOpacity: 0.4,
                      shadowRadius: 2,
                    },
                  ]}>
                  <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => {
                      fadeOut();
                      setShow(false);
                      setcurrentView(viewNameMatch);
                    }}>
                    <DrawerItem itemTitle={item} isSelected={isSelected} />
                  </TouchableOpacity>
                </MenuItemContainer>
              ) : (
                <MenuItemContainer
                  key={index}
                  style={[
                    isSelected && {
                      shadowColor: '#5E32DE',
                      elevation: 14,
                    },
                  ]}>
                  <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => {
                      fadeOut();
                      setShow(false);
                      setcurrentView(viewNameMatch);
                    }}>
                    <DrawerItem itemTitle={item} isSelected={isSelected} />
                  </TouchableOpacity>
                </MenuItemContainer>
              );
            })}
          </MainMenuContainer>

          {/* <BottomDrawerContainer style={{opacity: animatedOpacityValue}}>
          <LogoutIconContainer>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => {
                handleLogOut();
              }}>
              <DrawerLogOutIcon />
            </TouchableOpacity>
          </LogoutIconContainer>
        </BottomDrawerContainer> */}
        </StyledDrawerMainView>
      </Swipeable>
      <TouchableWithoutFeedback onPress={() => fadeOut()}>
        <StyledDrawerBlueView></StyledDrawerBlueView>
      </TouchableWithoutFeedback>
    </RootDrawerContainer>
  );
};

export default Drawer;
