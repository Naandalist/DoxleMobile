import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Comment} from '../../../Models/comments';
import {
  RootCommentItemContainer,
  StyledCommentDetailContainer,
  StyledCommentText,
  StyledCommentTextContainer,
  StyledSenderNameContainer,
  StyledSenderNameText,
  StyledTimeStampContainer,
  StyledTimeStampText,
} from './StyledComponentsComment';

type Props = {
  comment: Comment;
};

const CommentItem = ({comment}: Props) => {
  return (
    <RootCommentItemContainer>
      <StyledCommentDetailContainer>
        <StyledSenderNameContainer>
          <StyledSenderNameText>
            {comment.user
              ? `${comment.user.firstName} ${comment.user.lastName}`
              : 'Anonymous'}
          </StyledSenderNameText>
        </StyledSenderNameContainer>

        {/*Date */}
        <StyledTimeStampContainer>
          <StyledTimeStampText>
            {comment.timeStamp?.toString()}
          </StyledTimeStampText>
        </StyledTimeStampContainer>
      </StyledCommentDetailContainer>

      <StyledCommentTextContainer>
        <StyledCommentText>{comment.commentText}</StyledCommentText>
      </StyledCommentTextContainer>
    </RootCommentItemContainer>
  );
};

export default CommentItem;
