import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Costcode} from '../../../Models/costcode';
import {Notice} from '../../../Models/notice';
import {
  RootStatusContainer,
  StyledStatusButton,
} from './StyledComponentsStatus';

type Props = {
  type: 'notice' | 'costcode';
  costcode?: Costcode;
  notice?: Notice;
};

const Status = ({type, costcode, notice}: Props) => {
  let status = notice ? notice.status : costcode ? costcode.status : '';
  let color: string = '';
  if (status) {
    //D,
    if (status.toLowerCase() === 'd') {
      color = '#855CF8';
    } else if (status.toLowerCase() === 'w') {
      color = '#FFBA35';
    } else if (status.toLowerCase() === 'r') {
      color = '#13A422';
    } else if (status.toLowerCase() === 'n') {
      color = '#77757B';
    } else if (status.toLowerCase() === 'p') {
      color = '#FF2222';
    } else {
      color = '#77757B';
    }
  } else color = '#77757B';
  return (
    <RootStatusContainer>
      <StyledStatusButton style={{borderColor: color}}></StyledStatusButton>
    </RootStatusContainer>
  );
};

export default Status;

const styles = StyleSheet.create({});
