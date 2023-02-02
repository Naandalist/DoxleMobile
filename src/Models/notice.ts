import {User} from './user';
import {Comment} from './comments';
import {FileData} from './storage';

export enum NoticeStatus {
  D = 'DRAFT',
  W = 'WORKING',
  R = 'REVIEW',
  A = 'APPROVED',
  I = 'ISSUE',
  N = 'N/A',
}

export interface NoticeHistory {
  readonly id?: number;
  index: number;
  shortText: string;
  longText: string;
  timeStamp?: string;
  user?: string;
}

export interface Notice {
  noticeId: string;
  company: string;
  description: string;
  creator?: User;
  assignedUsers?: User[];
  category?: string | null;
  categoryId?: string | null;
  pinned: boolean;
  status: string;
  timeStamp: string;
  comments?: Comment[];
  attachments?: FileData[];
  isArchived: boolean;
  isComplete: boolean;
  isPrivate: boolean;
  isFollowup: boolean;
  dueDate?: string;
  startDate?: string;
  history?: NoticeHistory[];
}

export interface NewNotice {
  noticeId: string;
  company: string;
  description: string;
  creator?: string; //userId only
  assignedUsers?: string[];
  category?: string | null;
  categoryId?: string | null;
  pinned: boolean;
  status: string;
  timeStamp: string;
  comments?: Comment[];
  attachments?: FileData[];
  isArchived: boolean;
  isComplete: boolean;
  isPrivate: boolean;
  isFollowup: boolean;
  history?: NoticeHistory[];
}

export interface NoticeCategory {
  readonly noticeCategoryId: string;
  company: string;
  categoryTitle: string;
  isArchived: boolean;
  isPermit: boolean;
  index: number;
}
