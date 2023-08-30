
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
}
export interface respDataType {
  success: boolean;
  count: any;
  data: any[];
  user: string;
}

export interface chartSelectType {
  setChartMode?: any;
  chartMode?: string;
}
export interface currentKeyType {
  currentKey: string;
}

export interface menuBarKeyType {
  key: string;
  keyPath: string[];
  domEvent: any;
}