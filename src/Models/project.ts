import { Costcode } from './costcode'

type Coordinates = {
  coordinateId: string;
  longitude: number;
  latitude: number;
}

export interface ProjectInterface {
  projectId: string;
  siteAddress: string;
  contractPrice: string;
  budget: string;
  startDate: string;
  endDate: string;
  projectPrefix: string;
  company?: string;
  coordinates?: Coordinates;
  trackingId?: string | null;
  projectStatus: 'TN'|'AC'|'AR'|'TM'; // Options: 'AC' = 'Active'; 'AR' = 'Archive'; 'TN' = 'Tender'; 'TM' = 'Template'
  users: string[];
  costCodes?: Costcode[];
  ownerName: string;
  ownerAbn: string;
  ownerPhone: string;
  ownerEmail: string;
}

export interface NewProject {
  siteAddress: string;
  contractPrice: string;
  budget: string;
  startDate: string;
  endDate: string;
  projectPrefix: string;
  company: string;
  ownerName: string;
  ownerAbn: string;
  ownerPhone: string;
  ownerEmail: string;
  trackingId?: string | null;
  projectStatus: 'TN'|'AC'|'AR'|'TM'; // Options: 'AC' = 'Active'; 'AR' = 'Archive'; 'TN' = 'Tender'; 'TM' = 'Template'
  users: string[];
  template?: string,
}