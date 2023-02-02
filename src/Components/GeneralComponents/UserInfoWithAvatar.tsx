import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {User} from '../../Models/user';
import styled from 'styled-components/native';
import {
  CONTENT_TITLE_FONT_FAMILY,
  NORMAL_CONTENT_FONT_FAMILY,
} from '../../Utilities/constants';

type Props = {
  width: number | string;
  height: number | string;
  user: User;
};

const UserInfoWithAvatar = ({width, height, user}: Props) => {
  //#################STYLED COMPONENTS###########
  const RootUserInfoContainer = styled.View`
    width: ${width};
    height: ${height};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  `;
  const StyledUsernameContainer = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #beabf5;
    justify-content: center;
    align-items: center;
  `;

  const StyledUsernameText = styled.Text`
    font-family: ${CONTENT_TITLE_FONT_FAMILY};
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
    color: #ffffff;
  `;

  const StyledUserDetailText = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    padding-left: 4px;
  `;
  const StyledUserFullNameText = styled.Text`
    font-family: ${NORMAL_CONTENT_FONT_FAMILY};
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: black;
    text-transform: capitalize;
  `;
  const StyledLastLoginInfoText = styled.Text`
    margin-top: 4px;
    font-family: ${NORMAL_CONTENT_FONT_FAMILY};
    font-style: normal;
    font-weight: 300;
    font-size: 10px;
    line-height: 12px;
    color: black;
  `;
  return (
    <RootUserInfoContainer>
      <StyledUsernameContainer>
        <StyledUsernameText>
          {user
            ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
            : null}
        </StyledUsernameText>
      </StyledUsernameContainer>

      <StyledUserDetailText>
        <StyledUserFullNameText>
          {user.firstName} {user.lastName}
        </StyledUserFullNameText>

        <StyledLastLoginInfoText>
          Last Login: {user.lastLogin}
        </StyledLastLoginInfoText>
      </StyledUserDetailText>
    </RootUserInfoContainer>
  );
};

export default UserInfoWithAvatar;
