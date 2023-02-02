import React from 'react';
import HistoryItem from './HistoryItem';
import {Notice} from '../../../Models/notice';
import {RootHistoryTab} from './StyledComponentsModalEditNoticeDetails';

type Props = {
  notice: Notice;
};

const HistoryTab = ({notice}: Props) => {
  return (
    <RootHistoryTab
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      {notice.history &&
        notice.history
          .sort((a, b) => (a.index > b.index ? 1 : -1))
          .map((historyItem, index) => (
            <HistoryItem
              key={`historyItem#${historyItem.id}#${index}`}
              noticeHistory={historyItem}
              historyIndex={index}
            />
          ))}
    </RootHistoryTab>
  );
};

export default HistoryTab;
