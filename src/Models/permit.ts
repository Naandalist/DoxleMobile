import {User} from './user';
import {Comment} from './comments';
import {FileData} from './storage';
import {Checklist} from './checklist';

export interface Permit {
  checklistGroupId: string;
  project?: string;
  notice?: string;
  costCode?: string;
  title: string;
  checklistItems?: Checklist[];
  timeStamp: string;
  comments?: Comment[];
  startDate: string;
  endDate: string;
  addQuestions?: string[];
  // attachments?: FileData[],
}
