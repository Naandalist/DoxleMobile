import {Dimensions} from 'react-native';
import {useEffect, useState, useContext} from 'react';
import React from 'react';

export interface IOrientation {
  deviceSize: DeviceSize;
  isPortraitMode?: boolean;
}
interface DeviceSize {
  deviceWidth: number;
  deviceHeight: number;
}

const OrientationContext = React.createContext({});

const OrientationProvider = (children: any) => {
  //****************Handle Get Orientation informtion************** */
  //oritentation mode enum:
  // UNKNOWN: 0
  // PORTRAIT_UP: 1
  // PORTRAIT_DOWN: 2
  // LANDSCAPE_LEFT: 3
  // LANDSCAPE_RIGHT :4
  //=> to check the orientation just check the number return=> portrait (1/2), landscape (3/4)
  //!PT-@@@@@ IOS only support portrait right side, both landscape side... but portrait upside down will get error
  const [isPortraitMode, setIsPortraitMode] = useState<boolean>(
    Dimensions.get('window').width > Dimensions.get('window').height
      ? false
      : true,
  ); //true: portrait, false: landscape

  const [deviceSize, setDeviceSize] = useState<DeviceSize>({
    deviceWidth: Dimensions.get('window').width,
    deviceHeight: Dimensions.get('window').height,
  });
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDeviceSize({
          ...deviceSize,
          deviceWidth: window.width,
          deviceHeight: window.height,
        });
        if (window.width > window.height) setIsPortraitMode(false);
        else setIsPortraitMode(true);
      },
    );
    return () => subscription?.remove();
  });

  //******************************************************* */
  const orientationContextValue: IOrientation = {
    deviceSize,
    isPortraitMode,
  };
  return (
    <OrientationContext.Provider
      value={orientationContextValue}
      {...children}
    />
  );
};

const useOrientation = () => useContext(OrientationContext);

export {OrientationProvider, useOrientation};
