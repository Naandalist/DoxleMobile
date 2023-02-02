export interface FileHistory {
  fileId?: string;
  historyId?: string;
  index?: number
  changeType?: string;
  changeLog?: string;
  modifiedBy?: string;
}

export interface FileData {
  fileId: string;
  costCode?: string;
  project?: string;
  notification?: string;
  name: string;
  folder?: string;
  url: string;
  thumbUrl?: string|null;
  size?: number | string;
  created?: string;
  modified?: string;
  history?: FileHistory[]
  type: string;
  completed?:boolean
}

export interface Folder {
  folderId: string;
  costCode?: string;
  name: string;
}