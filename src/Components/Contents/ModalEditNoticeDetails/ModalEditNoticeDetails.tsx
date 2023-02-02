import {Modal, Platform} from 'react-native';

import React, {useState} from 'react';
import {Notice} from '../../../Models/notice';

import {
  IOrientation,
  useOrientation,
} from '../../Provider/Orientation/OrientationContext';
import {
  RootModalEditNoticeDetailsContainer,
  StyledModalBodyContainer,
  StyledModalTabMenuContainer,
  StyledModalTabMenuTitleText,
  StyledModalTitleNameContainer,
  StyledModalTitleText,
  StyledTabButton,
  StyledTabMenuContentDisplayer,
  StyledTabsContainer,
  StyledTabText,
  StyledTopModalDetailCloseButton,
  StyledTopModalDetailContainer,
  StyledTopModalDetailText,
  StyledTopModalDetailTextContainer,
} from './StyledComponentsModalEditNoticeDetails';
import {CloseIcon} from '../NoticeBoard/NoticeBoardIcon';
import NoticeTab from './NoticeTab';
import {Company} from '../../../Models/company';
import Comments from '../Comment/Comments';
import ChecklistsTab from '../NoticeBoardChecklist/ChecklistsTab';
import HistoryTab from './HistoryTab';

type Props = {
  selectedNotice: Notice | undefined;
  setSelectedNotice: (notice: Notice | undefined) => void;
  company: Company;
};
type TModalEditNoticeTabMenu = 'notice' | 'checklists' | 'comments' | 'history';
const MODAL_TABMENU_LIST: TModalEditNoticeTabMenu[] = [
  'notice',
  'checklists',
  'comments',
  'history',
];
const ModalEditNoticeDetails = ({
  selectedNotice,
  setSelectedNotice,
  company,
}: Props) => {
  //*************Handle Orientation*************** */
  const useOri = useOrientation() as IOrientation;
  const {deviceSize} = useOri;

  //********************************************** */
  const [loading, setLoading] = useState<boolean>(false);
  //state control tab menu
  const [noticeTab, setNoticeTab] = useState<TModalEditNoticeTabMenu>('notice');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={selectedNotice !== undefined}
      onRequestClose={() => {
        setSelectedNotice(undefined);
      }}>
      {selectedNotice && (
        <RootModalEditNoticeDetailsContainer
          style={{
            width: deviceSize ? deviceSize.deviceWidth : 0,
            height: deviceSize ? deviceSize.deviceHeight : 0,
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <StyledTopModalDetailContainer>
            <StyledTopModalDetailTextContainer>
              <StyledTopModalDetailText>
                Byson Group/Notice Board/{selectedNotice.description}/Notice
                Details
              </StyledTopModalDetailText>
            </StyledTopModalDetailTextContainer>

            <StyledTopModalDetailCloseButton
              delayPressIn={0}
              onPress={() => {
                setSelectedNotice(undefined);
              }}>
              <CloseIcon />
            </StyledTopModalDetailCloseButton>
          </StyledTopModalDetailContainer>

          <StyledModalBodyContainer>
            {/*Edit NOTICE TEXT SECTION */}
            <StyledModalTitleNameContainer>
              <StyledModalTitleText>Notice Dialog</StyledModalTitleText>
            </StyledModalTitleNameContainer>

            {/*tab menu bar  */}
            <StyledModalTabMenuContainer>
              <StyledModalTabMenuTitleText>
                Modify your notice information
              </StyledModalTabMenuTitleText>
              <StyledTabsContainer>
                {MODAL_TABMENU_LIST.map((tab, tabIndex) => (
                  <StyledTabButton
                    key={`modalTab#${tabIndex}`}
                    style={[
                      tabIndex === 0 && {
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      },
                      tabIndex === MODAL_TABMENU_LIST.length - 1 && {
                        borderTopRightRadius: 6,
                        borderBottomRightRadius: 6,
                      },
                    ]}
                    onPress={() => setNoticeTab(tab)}>
                    <StyledTabText
                      style={{
                        color:
                          noticeTab === tab
                            ? 'rgb(138, 81, 195)'
                            : 'rgba(0,0,0,0.87)',
                      }}>
                      {tab}
                    </StyledTabText>
                  </StyledTabButton>
                ))}
              </StyledTabsContainer>
            </StyledModalTabMenuContainer>

            <StyledTabMenuContentDisplayer>
              {noticeTab === 'notice' ? (
                <NoticeTab
                  selectedNotice={selectedNotice}
                  setSelectedNotice={setSelectedNotice}
                  company={company}
                />
              ) : noticeTab === 'comments' ? (
                //   // <CommentsTab selectedNotice={selectedNotice} />
                <Comments notice={selectedNotice} action="notice" />
              ) : noticeTab === 'checklists' ? (
                <ChecklistsTab notice={selectedNotice} />
              ) : (
                <HistoryTab notice={selectedNotice} />
              )}
            </StyledTabMenuContentDisplayer>
          </StyledModalBodyContainer>
        </RootModalEditNoticeDetailsContainer>
      )}
    </Modal>
  );
};

export default ModalEditNoticeDetails;
