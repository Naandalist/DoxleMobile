interface BasicProject {
  projectId: string;
  siteAddress: string;
  projectStatus: string;
}


export type Company = {
  companyId: string;
  name: string;
  phone: string;
  email: string;
  companyAbn: string;
  addressL1: string;
  addressL2: string;
  addressCity: string;
  addressPostCode: string;
  addressState: string;
  addressCountry: string;
  logo: string;
  projects?: BasicProject[]
  owner?: string;
}

export type NewCompany = {
  abn: string;
  name: string;
  phone: string;
  email: string;
  companyAbn: string;
  addressL1: string;
  addressL2: string;
  addressCity: string;
  addressPostCode: string;
  addressState: string;
  addressCountry: string;
  logo: string;
}