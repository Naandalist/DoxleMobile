import { User } from './user'

export type Comment = {
    commentId: string;
    costCode?: string;
    notice?: string;
    permit?: string;
    checklist?: string;
    notification?: string;
    user?: User;
    timeStamp?: string;
    commentText: string;
    pinned: boolean;
    taggedUsers?: string[];
}

export type NewComment = {
    notice: string | null;
    permit:  string | null;
    checklist: string | null;
    costCode: string | null;
    user: string;
    timeStamp?: string;
    commentText: string;
    pinned: boolean;
    taggedUsers?: string[];
}