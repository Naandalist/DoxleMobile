import {StyleSheet} from 'react-native';
import React from 'react';
import Modal from 'react-native-modalbox';
import {NewNotice, Notice} from '../../../Models/notice';
import StatusBoardDisplayer from './StatusBoardDisplayer';
import {IStatusButton} from '../../../Utilities/constants';
import {
  IOrientation,
  useOrientation,
} from '../../Provider/Orientation/OrientationContext';

type TStatusBoardChangeAction = 'addNotice' | 'editNotice';
type Props = {
  show: boolean;
  controlShow: (show: boolean) => void;
  actionType: TStatusBoardChangeAction;
  newNotice?: NewNotice;
  setNewNotice?: (data: NewNotice) => void;
  edittedNotice?: Notice;
  setEdittedNotice?: (notice: Notice) => void;
};

const ModalStatusBoardSelection = ({
  show,
  controlShow,
  actionType,
  newNotice,
  setNewNotice,
  edittedNotice,
  setEdittedNotice,
}: Props) => {
  //*************Handle Orientation*************** */
  const useOri = useOrientation() as IOrientation;
  const {deviceSize, isPortraitMode} = useOri;
  //********************************************** */
  const handleSelectStatus = (item: IStatusButton) => {
    if (setNewNotice && newNotice && actionType === 'addNotice')
      setNewNotice({...newNotice, status: item.value});

    if (setEdittedNotice && edittedNotice && actionType === 'editNotice')
      setEdittedNotice({...edittedNotice, status: item.value});
    //close dialog
    controlShow(false);
  };

  return (
    <Modal
      position={'center'}
      onClosed={() => controlShow(false)}
      isOpen={show}
      backdropPressToClose={true}
      swipeToClose={true}
      swipeThreshold={44}
      backdrop={true}
      backdropOpacity={0.2}
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <RootModalStatusBoardSelection
        style={
          deviceSize && {
            width: deviceSize ? deviceSize.deviceWidth : 0,
            height: deviceSize ? deviceSize.deviceHeight : 0,
          }
        }></RootModalStatusBoardSelection> */}
      <StatusBoardDisplayer selectStatusFunction={handleSelectStatus} />
    </Modal>
  );
};

export default ModalStatusBoardSelection;

const styles = StyleSheet.create({});
