import AsyncStorage from '@react-native-async-storage/async-storage';
import {NewNotice, NoticeCategory} from '../../../Models/notice';
import {
  INoticeBoardFilterData,
  INoticeTableDataColumn,
  TNoticeViewTab,
} from './NoticeBoard';

export const convertStatusValueToColor = (value: string) => {
  if (value.toLowerCase() === 'd') {
    return '#855CF8';
  } else if (value.toLowerCase() === 'w') return '#FFBA35';
  else if (value.toLowerCase() === 'r') return '#13A422';
  else if (value.toLowerCase() === 'p') return '#FF2222';
  else if (value.toLowerCase() === 'n') return '#77757B';
  else return '#77757B';
};
export const convertStatusValueToText = (value: string) => {
  if (value.toLowerCase() === 'd') {
    return 'DRAFT';
  } else if (value.toLowerCase() === 'w') return 'WORKING';
  else if (value.toLowerCase() === 'r') return 'READY';
  else if (value.toLowerCase() === 'p') return 'PROBLEM';
  else if (value.toLowerCase() === 'n') return 'N/A';
  else return 'N/A';
};

export const getCurrentDateInString = (
  formatType: 'mm.dd.yyyy' | 'dd.mm.yyyy' | 'yyyy.mm.dd',
) => {
  let today = new Date();
  let dd = today.getDate().toString();

  let mm = (today.getMonth() + 1).toString();
  let yyyy = today.getFullYear().toString();
  if (parseInt(dd) < 10) {
    dd = '0' + dd;
  }

  if (parseInt(mm) < 10) {
    mm = '0' + mm;
  }
  if (formatType === 'dd.mm.yyyy') {
    return dd + '.' + mm + '.' + yyyy;
  } else if (formatType === 'mm.dd.yyyy') {
    return mm + '.' + dd + '.' + yyyy;
  } else return yyyy + '.' + mm + '.' + dd;
};

export const formatFileSize = (file: string | number) => {
  let finalFile: string = '';

  if (typeof file === 'string') {
    let convertNumberFile = parseInt(file);
    finalFile = (convertNumberFile / 1024 / 1024).toFixed(2).toString();
  }
  if (typeof file === 'number') {
    finalFile = (file / 1024 / 1024).toFixed(2).toString();
  }

  finalFile = finalFile + ' MB';

  return finalFile;
};

export const checkEmptyField = (addedNotice: NewNotice) => {
  if (
    addedNotice.description === '' ||
    addedNotice.category === undefined ||
    addedNotice.category === ''
  )
    return false;
  else return true;
};

export interface INoticeBoardLastStateProps {
  columnFilter: INoticeTableDataColumn[];
  selectedCategory: NoticeCategory | null;
  filterList: INoticeBoardFilterData;
  noticeViewTab: TNoticeViewTab;
}
export const saveNoticeBoardState = ({
  columnFilter,
  selectedCategory,
  filterList,
  noticeViewTab,
}: INoticeBoardLastStateProps) => {
  AsyncStorage.setItem('columnFilter', JSON.stringify(columnFilter));

  AsyncStorage.setItem('filterList', JSON.stringify(filterList));
  AsyncStorage.setItem('noticeViewTab', JSON.stringify(noticeViewTab));
  AsyncStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
};
