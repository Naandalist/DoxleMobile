import {Comment} from "./comments";
import {User} from "./user";
import {AddressBookCompany} from "./addressBook";
import {Image} from "./image";

export interface Checklist{
    checklistId?:string;
    question:string;
    answer:"YES"|"NO"|"NA"|null;
    costCode?:string;
    comments?: Comment[]
    assignedUsers?: User[];
    assignedContractor?: AddressBookCompany | null;
    images?: Image[];
    permit?: string;
    timeStamp?: string;
    lastModifiedBy?: User;
}
