

export interface chartDataType {
  viewDate: string[];
  viewCount: string[];
  clickCount: string[];
  ctaCount: string[];
  loading?: boolean;
  collapsed?: boolean;
  setChartMode?: any;
  chartMode?: string;
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

export interface dashboardPageType {
  collapsed: boolean;
}

export interface respDataType {
  success: boolean;
  count: any;
  data: any[];
}