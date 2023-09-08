
export interface chartDataType {
  viewDate: string[];
  viewCount: string[];
  clickCount: string[];
  ctaCount: string[];
  loading?: boolean;
  collapsed?: boolean;
}

export interface curValue {
  Event_Name: string;
  DateWise: string;
  Interactions: string;
}

export interface seriesType {
  name: string;
  data: any;
}

export interface chartContainerDataType {
  viewsTotalCount: string;
  clicksTotalCount: string;
  ctaTotalCount: string;
  viewsStartDate: string;
  clicksStartDate: string;
  ctaStartDate: string;
  endDate: string;
}
export interface respDataType {
  success: boolean;
  count: any;
  data: any[];
  user: string;
  onBoard: any;
  weekDate?: any;
  endDate?: any;
  displayName: string | number;
}

export interface chartSelectType {
  setChartMode?: any;
  chartMode?: string;
  crntYear: number;
  userOnboardYear: number;
  yearCount: number;
  crntMonth: number;
  userOnboardMonth: number;
  monthCount: number;
  weekYear: number;
  weekMonth: number;
  weekDate: number;
  userOnboardDate: number;
  weekCount: number;
  prevButtonHandler: () => void;
  nextButtonHandler: () => void;
  displayName: number | string;
  loading: boolean;
}
export interface currentKeyType {
  currentKey: string;
}

export interface menuBarKeyType {
  key: string;
  keyPath: string[];
  domEvent: any;
}

export interface postMethodDataType {
    datePosition?: number | string;
    yearPosition?: number;
}