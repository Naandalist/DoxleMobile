import {User} from "./user";
import {AddressBookCompany} from "./addressBook";


export interface ScheduleItem {
    scheduleId: string;
    project: string;
    title: string;
    startDate: string;
    endDate: string;
    completed: boolean;
    assignedUsers: (User|string)[];
    assignedContractor?: AddressBookCompany|string;
}