export const MAX_SIZE = {
  WIDTH: 10,
  FONTSIZE: 40,
};

export const MEDIUM_SIZE = {
  WIDTH: 5,
  FONTSIZE: 20,
};

export const SMALL_SIZE = {
  WIDTH: 3,
  FONTSIZE: 10,
};

export const DARK_MODE = {
  BACKGROUNDCOLOR: '000000',
  FONTCOLOR: 'FFFFFF',
};

export const LIGHT_MODE = {
  BACKGROUNDCOLOR: '#E5E5E5',
  FONTCOLOR: '000000',
};

export const STATUS_SYMBOL = {
  // "D":"Draft",
  // "W":"Working",
  // "R": "Review",
  // "A": "Approved",
  // "N": "Not Applicable",
  // "I": "Issue",

  D: 'DRAFT',
  // "Q": "QUOTE",
  // "E": "ESTIMATE",
  W: 'WORKING',
  R: 'READY',

  // "O": "ORDERED",
  // "C": "COMPLETED",
  // "I": "INSPECTED",
  // "A": "APPROVED",
  P: 'PROBLEM',
  N: 'N/A',
};

export const STATUS_SYMBOL_WITH_LOCK = {
  ...STATUS_SYMBOL,
  // "L": "LOCKED"
};

export const STATUS_SYMBOL_COLOR = {
  D: '#9974fe',
  // "Q": "#855CF8",
  // "E": "#6EA5FC",
  W: '#ffba35',
  R: '#27BF36',
  // "O": "#FF7C04",
  // "C": "#B7FF5A",
  // "I": "#FF1B88",
  // "A": "#27BF36",
  P: '#FF2222',
  N: '#7A7783',
  L: '#B4AFC3',
};

export const DRAWER_LABELS = {
  0: 'Notice Board',
  1: 'Projects',
  2: 'Dockets',
  3: 'Estimator',

  // 1:"Mailroom",
  // 2:"Estimator",
  // 3:"Projects",
  // 4:"PriceSpace",
  // 5:"Reports",
  // 6:"Settings",
  // 7:"Contact"
};

export const DRAWER_FOOTER_LABELS = {
  0: 'AddressBook',
  1: 'Settings',
  2: 'Contact',
};

export const DRAWER_SUBLIST_BUILDER_LABELS = {
  0: 'Projects',
  1: 'Pricelist',
  2: 'Timesheet',
  3: 'Schedule',
  4: 'Accounting',
};

export const formatScheduleDate = (inputDate: string | null, params?: any) => {
  if (inputDate !== null) {
    if (inputDate.includes('-')) {
      var outDate = [
        inputDate.split('-')?.[2].substring(0, 2),
        inputDate.split('-')?.[1],
        inputDate.split('-')?.[0].substring(2, 4),
      ];
      return outDate.join('.');
    } else {
      return inputDate;
    }
  }
  return '00.00.00';
};

export const DEPOSIT_COSTCODES = {
  assetProtectionPermit: 'Asset Protection Permits',
  protectionWorks: 'Protection works',
  telstraIncluded: 'Telstra included',
  electricityPit: 'Electricity Pit',
  waterTapping: 'Water Tapping',
  demolition: 'Demolition',
  warrantyInsurance: 'Warranty Insurance',
  buildingPermit: 'Building Permit',
};

export const BASE_COSTCODES = {
  underpining: 'Underpining',
  basement: 'Basement',
  retaining_wall_sleeper: 'Retaining Wall Sleeper',
  retaining_wall_concrete: 'Retaining Wall Concrete',
  hydronic_heating: 'Hydronic Heating',
  underslab_insulation: 'Underslab Insulation',
  site_levels: 'Site Levels',
};

export const FRAME_COSTCODES = {
  steelTonnage: 'Steel Tonnage',
};

export const LOCKUP_COSTCODES = {
  groundFloorWindows: 'Ground Floor Windows',
  firstFloorWindows: 'First Floor Windows',
  groundFloorBigWindows: 'Ground Floor Big Windows',
  camera: 'Camera',
  alarm: 'Alarm',
  videoIntercom: 'Video Intercom',
  ducted_vacuum: 'Ducted Vacuum',
  fireplace: 'Fireplace',
  firstFloorBigWindows: 'First Floor Big Windows',
  doubleGlazing: 'Double Glazing',
  fasciaGutter: 'Fascia Gutter',
  skylight: 'Skylight',
  roofTiling: 'Roof Tiling',
};

export const FIXING_COSTCODES = {
  tilingFloor: 'Tiling Floor',
  tilingWall: 'Tiling Wall',
  numberOfBathrooms: 'Number Of Bathrooms',
  fullHeightTiling: 'Full Height Tiling',
};

export const FINAL_COSTCODES = {
  landscaping: 'Landscaping',
};

export const BUTTON_FONT_FAMILY: string = 'IBMPlexMono-Regular';

export const STATUS_COLOR_CODE = {
  D: '#855CF8',
  W: '#FFBA35',
  R: '#13A422',
  N: '#77757B',
  P: '#FF2222',
  DEFAULT: '#77757B',
};

export interface IStatusButton {
  value: 'D' | 'W' | 'R' | 'P' | 'N';
  text: string;
}
export const DOXLE_STATUS_VALUES: IStatusButton[] = [
  {value: 'D', text: 'DRAFT'},
  {value: 'W', text: 'WORKING'},
  {value: 'R', text: 'READY'},
  {value: 'P', text: 'PROBLEM'},
  {value: 'N', text: 'N/A'},
];

export const TITLE_FONT_FAMILY: string = 'NostromoRegular-Medium';
export const SUBTITLE_FONT_FAMILY: string = 'NostromoRegular-Light';
export const CONTENT_TITLE_FONT_FAMILY: string = 'IBMPlexMono-SemiBold';
export const NORMAL_CONTENT_FONT_FAMILY: string = 'IBMPlexSans-Regular';
export const TEXTINPUT_LABEL_FONT_FAMILY: string = 'IBMPlexMono-Light';
