import {StyleSheet} from 'react-native';
import React from 'react';
import {
  DrawerCalculatorIcon,
  DrawerCalculatorSelectedIcon,
  DrawerDocketIcon,
  DrawerDocketSelectedIcon,
  DrawerNoticeBoardIcon,
  DrawerNoticeBoardSelectedIcon,
  DrawerProjectIcon,
  DrawerProjectSelectedIcon,
} from '../GeneralIcons';
import styled from 'styled-components/native';
import {
  RootDrawerItemContainer,
  StyledIconContainer,
  StyledTitleContainer,
  StyledTitleText,
} from './StyledComponentsDrawer';
type Props = {
  itemTitle: string;
  isSelected: boolean;
};

const DrawerItem = ({itemTitle, isSelected}: Props) => {
  const Icon = () => {
    switch (itemTitle) {
      case 'Notice Board':
        return <DrawerNoticeBoardIcon />;

      case 'Costings':
        return <DrawerProjectIcon />;

      case 'Dockets':
        return <DrawerDocketIcon />;

      case 'Calculator':
        return <DrawerCalculatorIcon />;
    }
  };

  const IconSelected = () => {
    switch (itemTitle) {
      case 'Notice Board':
        return <DrawerNoticeBoardSelectedIcon />;
      case 'Costings':
        return <DrawerProjectSelectedIcon />;

      case 'Dockets':
        return <DrawerDocketSelectedIcon />;

      case 'Calculator':
        return <DrawerCalculatorSelectedIcon />;
    }
  };
  return (
    <RootDrawerItemContainer
      style={{
        backgroundColor: isSelected ? '#F1F2F5' : 'transparent',
      }}>
      <StyledIconContainer>
        {isSelected ? IconSelected() : Icon()}
      </StyledIconContainer>

      <StyledTitleContainer>
        <StyledTitleText style={[isSelected && {color: '#5E32DE'}]}>
          {itemTitle}
        </StyledTitleText>
      </StyledTitleContainer>
    </RootDrawerItemContainer>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({});
