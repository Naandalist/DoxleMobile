import { User } from './user';

export interface Note {
    noteId: string;
    project?: string;
    costCode?: string;
    title: string;
    body: string;
    created: string;
    createdBy: User|string;
    lastModified: string;
    lastModifiedBy: User|string;
}

export interface NewNote {
    project?: string;
    costCode?: string;
    title: string;
    body: string;
    userId: string;
}