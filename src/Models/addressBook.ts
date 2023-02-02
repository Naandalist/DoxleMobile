export type QuickAddressBookCompany = {
  abCompanyId?: string;
  companyName: string;
}

export type AddressBookCompany = {
  abCompanyId?: string;
  companyName: string;
  companyAbn: string;
  email: string;
  phone: string;
  addressL1: string;
  addressL2: string;
  addressCity: string;
  addressPostCode: string;
  addressState: string;
  userCompany: string;
}

export type AddressBookContact = {
  abContactId?: string;
  userCompany: string;
  abCompany?: string;
  firstName: string;
  lastName: string;
  phone: string;
  mobile: string;
  email: string;
  userId?: string;
}

