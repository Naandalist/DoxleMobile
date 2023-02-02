import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

import {Costcode} from '../../../Models/costcode';
import {Comment, NewComment} from '../../../Models/comments';
import CostCodeAPI from '../../../Services/DoxleAPI/costCodeAPI';

import NoticeAPI from '../../../Services/DoxleAPI/noticeAPI';
import {
  HandleFrontendErrorWithAxiosType,
  IAxiosErrorReturnType,
} from '../../../Services/ErrorHandling/ErrorHandler';

import {Notice} from '../../../Models/notice';
import {authContextInterface, useAuth} from '../../Provider/AuthProvider';
import {useSocket} from '../../Provider/Sockets/useSocket';
import {SendIcon} from './CommentIcons';
import {
  RootCommentContainer,
  StyledCommentInputContainer,
  StyledCommentViewContainer,
  StyledSendCommentButton,
  StyledTextInput,
} from './StyledComponentsComment';
import CommentItem from './CommentItem';
import {BlurView} from '@react-native-community/blur';
import LoadingScreen from '../../../Utilities/LottiesAnimation/LoadingScreen';
import BottomNotificationBar, {
  INotificationMessage,
} from '../../GeneralComponents/BottomNotificationBar';
import CommentAPI from '../../../Services/DoxleAPI/commentAPI';

export type TCommentActionType = 'costcode' | 'notice' | 'permit' | 'checklist';
type Props = {
  costcode?: Costcode;
  notice?: Notice;
  permitId?: string;
  checklistId?: string;
  action: TCommentActionType;
};

const Comments = ({costcode, notice, permitId, checklistId, action}: Props) => {
  //#############AUTH CONTROL############
  const {getAccessToken, logOut, user, loggedIn} =
    useAuth() as authContextInterface;
  //####################################

  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState<string>('');
  const [taggedUsers, setTaggedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notificationMessage, setnotificationMessage] = useState<
    INotificationMessage | undefined
  >(undefined);
  //$$$$$$$$$$$$$$$$$$$$$$COSTCODE SECTION$$$$$$$$$$$$$$$$$$
  //fetching comment in costcode
  const fetchCostCodesComment = async (costcodeId: string) => {
    try {
      const accessToken = await getAccessToken();
      const response = await CostCodeAPI.getDetailed(costcodeId, accessToken);
      if (response.data) {
        if (response.data.comments) {
          setLoading(false);
          setCommentList(response.data.comments);
        }
      } else throw response.error;
    } catch (err: any | IAxiosErrorReturnType | 'STOCK_ERROR') {
      console.error('Error in ModalAddNotice.fetchUsers()', err.toString());
      Alert.alert('Error in ModalAddNotice.fetchUsers()', err.toString());
    }
    setLoading(false);
  };
  //#############################
  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  //$$$$$$$$$$$$$$$$$$$$$$NOTICE SECTION$$$$$$$$$$$$$$$$$$$$
  //#####fetching comment in notice#####
  const fetchNoticeComments = async (noticeId: string) => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      if (!accessToken) throw 'ACCESS DENIED';
      const response = await NoticeAPI.getDetailed(noticeId, accessToken);
      if (response.data) {
        setLoading(false);
        if (response.data.comments) setCommentList([...response.data.comments]);
      } else throw response.error;
    } catch (err: any) {
      setLoading(false);
      // console.error('Error in Comments.fetchNoticeComments()', err.toString());
      // Alert.alert('Error in Comments.fetchNoticeComments()', err.toString());
      setnotificationMessage({
        messageText: 'Error in Comments.fetchNoticeComments()',
        messageType: 'error',
      });
    }
  };

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //fetch comment list
  useEffect(() => {
    if (costcode && action === 'costcode')
      fetchCostCodesComment(costcode.costCodeId);
    else if (notice && action === 'notice')
      fetchNoticeComments(notice.noticeId);
  }, [costcode, notice]);

  //! <--- SOCKETS LISTENER
  const socket = useSocket();
  const onMessage = useCallback(
    (message: any) => {
      const data = JSON.parse(message?.data);

      const serverStatus: string = data.status;
      const messageType: string = data.message_type;

      if (messageType === 'Comment') {
        if (serverStatus === 'SUCCESS') {
          const receivedMessage = data.message as Comment;

          if (checklistId && receivedMessage.checklist !== checklistId) return;
          if (
            costcode?.costCodeId &&
            receivedMessage.costCode !== costcode?.costCodeId
          )
            return;
          if (notice && receivedMessage.notice !== notice.noticeId) return;
          if (permitId && receivedMessage.permit !== permitId) return;

          // prevent duplicate, search by text, not found add
          if (
            commentList.findIndex(
              (comment: Comment) =>
                comment.commentText === receivedMessage.commentText,
            ) === -1
          ) {
            setCommentList((prevComments: Comment[]) => [
              ...prevComments,
              receivedMessage,
            ]);
          }
        } else {
        }
      }
    },
    [commentList],
  );
  useEffect(() => {
    socket.addEventListener('message', onMessage);

    return () => {
      socket.removeEventListener('message', onMessage);
    };
  }, [socket, onMessage]);
  //! SOCKETS --->

  //handling submit new comment
  const handleSubmitComment = async () => {
    try {
      const accessToken = await getAccessToken();
      if (!user?.userId) throw 'User not found';
      let newComment: NewComment = {
        costCode: null,
        permit: null,
        checklist: null,
        notice: null,
        commentText: commentText,
        pinned: false,
        user: user.userId,
        taggedUsers: taggedUsers,
      };
      let filter: string = '';
      let id: string = '';
      if (costcode) {
        newComment.costCode = costcode.costCodeId;
        filter = 'cost_code';
        id = costcode.costCodeId;
      } else if (notice) {
        newComment.notice = notice.noticeId;
        filter = 'notice';
        id = notice.noticeId;
      }
      // instantly update comments instead of waiting from socket
      const existingComments: Comment[] = commentList;
      setCommentList((prevComments: Comment[]) => [
        ...prevComments,
        {
          timeStamp: new Date(Date.now())?.toISOString(),
          commentText: commentText,
          user: user,
        } as Comment,
      ]);
      //! SOCKET SENDING
      socket.send(
        JSON.stringify({
          messageType: 'Comment',
          message: newComment,
        }),
      );
      //!HTTP Backup method
      setTimeout(async () => {
        //get all comment
        const accessToken = await getAccessToken();
        const comment_list = await CommentAPI.getList(filter, id, accessToken);
        if (comment_list.data) {
          console.log('COMPARE COMMENT');
          if (
            comment_list.data.filter((comment: Comment) => {
              return comment.commentText === newComment.commentText;
            }).length === 0
          ) {
            console.log('POST CMT');
            let result = await CommentAPI.add(newComment, accessToken);
            if (!result.data) {
              setCommentList([...existingComments]);
              throw result.error;
            }
          }
        } else {
          setCommentList([...existingComments]);
          throw comment_list.error;
        }
      }, 1000);
      setCommentText('');
    } catch (err: any) {
      console.error('Error in Comments.handleSubmitComment()', err.toString());
      Alert.alert('Error in Comments.handleSubmitComment()', err.toString());
    }
    setLoading(false);
  };

  return (
    <RootCommentContainer>
      {notificationMessage && (
        <BottomNotificationBar
          messageText={notificationMessage.messageText}
          messageType={notificationMessage.messageType}
          unmountControl={setnotificationMessage}
        />
      )}
      {loading && (
        <BlurView
          blurType="light"
          blurAmount={10}
          blurRadius={10}
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
      )}
      {/*Comment View */}
      <StyledCommentViewContainer showsVerticalScrollIndicator={false}>
        {commentList && commentList.length !== 0
          ? commentList.map((comment, index) => {
              return <CommentItem comment={comment} key={index} />;
            })
          : null}
      </StyledCommentViewContainer>

      <StyledCommentInputContainer>
        <View
          style={{
            width: '100%',
            height: 49,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#F0ECFA',

            borderRadius: 8,
          }}>
          {/*Input field */}
          <View style={styles.inputField}>
            <StyledTextInput
              placeholder="Type your comment"
              underlineColorAndroid={'transparent'}
              value={commentText}
              onChangeText={newText => setCommentText(newText)}
              defaultValue={commentText}
            />
          </View>

          {/*Icon Field */}
          <StyledSendCommentButton
            delayPressIn={0}
            onPress={() => {
              if (commentText !== '') handleSubmitComment();
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SendIcon />
            </View>
          </StyledSendCommentButton>
        </View>
      </StyledCommentInputContainer>
    </RootCommentContainer>
  );
};

export default Comments;

const styles = StyleSheet.create({
  rootContainer: {
    width: '94%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 14,
    paddingTop: 10,
    marginLeft: '3%',
    marginRight: '3%',
  },
  commentViewContainer: {
    width: '100%',
    height: '85%',
  },
  commentInputContainer: {
    width: '100%',
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  commentContainer: {
    width: '100%',
    height: 140,
    borderColor: '#E7DFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 3,
    paddingBottom: 3,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
  },
  usernameText: {
    fontFamily: 'Roboto_Mono',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#000000',
  },

  dateText: {
    fontFamily: 'Roboto_Mono',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: '#855CF8',
  },
  commentText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
  },
  inputField: {
    height: '100%',
    width: '85%',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    height: '100%',
    width: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
