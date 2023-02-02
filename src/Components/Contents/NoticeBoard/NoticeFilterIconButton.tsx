import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as Icons from './NoticeBoardIcon';
import {
  RootButtonIconContainer,
  StyledButtonIconText,
  StyledIconContainer,
  StyleTextContainer,
} from './StyledComponentsNoticeBoard';

type Props = {title: string};

const NoticeFilterIconButton = ({title}: Props) => {
  const Icon = () => {
    switch (title.toLowerCase()) {
      case 'assignee':
        return <Icons.FilterAssigneeIcon />;
      case 'budget':
        return <Icons.FilterBudgetIcon />;
      case 'orders':
        return <Icons.FilterOrderIcon />;
      case 'startdate':
        return <Icons.FilterStartDateIcon />;
      case 'enddate':
        return <Icons.FilterEndDateIcon />;
      case 'duedate':
        return <Icons.FilterEndDateIcon />;
      case 'status':
        return <Icons.FilterEndDateIcon />;
      case 'actual':
        return <Icons.FilterEndDateIcon />;
      case 'due this week':
        return <Icons.FilterWeekDueIcon />;
      case 'due this fortnight':
        return <Icons.FilterFortnightDueIcon />;
      case 'due this month':
        return <Icons.FilterMonthDueIcon />;
    }
  };
  return (
    <RootButtonIconContainer>
      <StyledIconContainer>{Icon()}</StyledIconContainer>
      <StyleTextContainer>
        <StyledButtonIconText>
          {title === 'startDate'
            ? 'Start Date'
            : title === 'endDate' || title === 'dueDate'
            ? 'End Date'
            : title}
        </StyledButtonIconText>
      </StyleTextContainer>
    </RootButtonIconContainer>
  );
};

export default NoticeFilterIconButton;
