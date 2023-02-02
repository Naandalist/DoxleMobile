import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import * as ImagePicker from 'react-native-image-picker';

import {FileData} from '../../../Models/storage';
import {
  IOrientation,
  useOrientation,
} from '../../Provider/Orientation/OrientationContext';

type Props = {
  setOpenImagePicker: Function;
  handleAddPhoto: Function;
};

const PhotoSelector = ({setOpenImagePicker, handleAddPhoto}: Props) => {
  //*************Handle Orientation and styling*************** */
  const useOri = useOrientation() as IOrientation;
  const {deviceSize, isPortraitMode} = useOri;

  const styles = StyleSheet.create({
    rootContainer: {
      width: deviceSize.deviceWidth,
      height: deviceSize.deviceHeight,
      backgroundColor: '#D5D7E3',
    },
  });
  //*********************************************************** */

  useEffect(() => {
    ImagePicker.launchImageLibrary;
  }, []);

  //#######ASSET SELECTOR CONFIGURATION#######
  // const onSuccess = (data: Asset[]) => {
  //   let returnFileData: FileData[] = [];
  //   data.map((photo, index) => {
  //     returnFileData.push({
  //       url: photo.uri,
  //       type: 'image/jpg',
  //       name: `Image_${index + 1}`,
  //       fileId: '',
  //     });
  //   });
  //   setOpenImagePicker(false);
  //   handleAddPhoto(returnFileData);
  // };

  // const widgetErrors = useMemo(
  //   () => ({
  //     errorTextColor: 'black',
  //     errorMessages: {
  //       hasErrorWithPermissions: 'Please Allow media gallery permissions.',
  //       hasErrorWithLoading: 'There was an error while loading images.',
  //       hasErrorWithResizing: 'There was an error while loading images.',
  //       hasNoAssets: 'No images found.',
  //     },
  //   }),
  //   [],
  // );

  // const widgetSettings = useMemo(
  //   () => ({
  //     getImageMetaData: false, // true might perform slower results but gives meta data and absolute path for ios users
  //     initialLoad: 30,
  //     assetsType: [MediaType.photo],
  //     minSelection: 1,
  //     maxSelection: 10 / 0,
  //     portraitCols: 4,
  //     landscapeCols: 4,
  //   }),
  //   [],
  // );

  // const widgetResize = useMemo(
  //   () => ({
  //     compress: 0.4,
  //     base64: false,
  //     saveTo: 'jpeg',
  //   }),
  //   [],
  // );

  // const _textStyle = {
  //   color: 'white',
  //   fontFamily: 'Inter',
  // };

  // const _buttonStyle = {
  //   backgroundColor: '#5A36BE',
  //   borderRadius: 5,
  // };

  // const widgetNavigator = useMemo(
  //   () => ({
  //     Texts: {
  //       finish: 'Finish',
  //       back: 'Back',
  //       selected: 'Selected',
  //     },
  //     midTextColor: '#5A36BE',
  //     minSelection: 1,
  //     buttonTextStyle: _textStyle,
  //     buttonStyle: _buttonStyle,
  //     onBack: () => {
  //       setOpenImagePicker(false);
  //     },
  //     onSuccess: (e: Asset[]) => onSuccess(e),
  //   }),
  //   [],
  // );

  // const widgetStyles = useMemo(
  //   () => ({
  //     margin: 2,
  //     bgColor: '#D5D7E3',
  //     spinnerColor: 'blue',
  //     widgetWidth: 99,
  //     videoIcon: {
  //       Component: Ionicons,
  //       iconName: 'ios-videocam',
  //       color: 'tomato',
  //       size: 20,
  //     },
  //     selectedIcon: {
  //       Component: Ionicons,
  //       iconName: 'ios-checkmark-circle-outline',
  //       color: 'white',
  //       bg: 'rgba(90, 54, 190, 0.487)',
  //       size: 26,
  //     },
  //   }),
  //   [],
  // );
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.rootContainer}>
        {/* <AssetsSelector
          Settings={widgetSettings}
          Errors={widgetErrors}
          Styles={widgetStyles}
          Navigator={widgetNavigator}
          Resize={widgetResize}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default PhotoSelector;

const styles = StyleSheet.create({});
