import { Bill } from './bill'
import { Specification } from './specification'
import {Comment} from "./comments";
import {User} from "./user";
import {AddressBookCompany} from "./addressBook";

export interface Costcode {
  costCodeId: string;
  project: string;
  title: string;
  budget: string;
  actual?: number;
  startDate: string;
  endDate: string;
  budgetOverride: boolean;
  income: boolean;
  locked: boolean;
  completed: boolean;
  accountTrackingId: string;
  assignedUsers: User[];
  assignedContractor?: AddressBookCompany|string;
  status: string;
  bills?: Bill[];
  orders?: string;
  files?: any;
  folders?: any;
  fileCount?: number;
  commentCount?: number;
  checklistCount?: number;
  checklistFailCount?: number;
  specifications?: Specification[]
  comments?: Comment[]
  stage?: string
}

export interface NewCostCode {
  project: string;
  title: string;
  budget: string;
  startDate: string;
  endDate: string;
  budgetOverride: boolean;
  income: boolean;
  locked: boolean;
  // accountTrackingId: string;
  // assignedUsers: string[];
  status: string;
  completed: boolean;
  orders: string;
  fileCount: number;
  commentCount: number;
  checklistCount: number;
  checklistFailCount: number;
  stage: 'D'|'B'|'FR'|'LU'|'FX'|'FN'|'DV'|'V'
}


export enum ITabs {
  SPECS = "Specifications",
  QUOTES = "Photos",
  STORAGE = "Files",
  BILLS = "Orders",
  CHECKLIST = "Checklist",
  COMMENTS = "Comments",
  NOTES = "Notes"
}

export interface Stage {
  stageName: string,
  budgetTotal: number,
  orderTotal: number,
  costCodeCount: number,
  costCodes: Costcode[],
  status: string;
  startDate: string;
  endDate: string;
  actual?: number;
  running?: number;
}
