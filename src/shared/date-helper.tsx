/* eslint-disable no-mixed-spaces-and-tabs */
import moment from 'moment';
import _ from 'lodash';

export const isValidDate = (date:any) => {
  const result = moment(date).isValid();
  return result;
};
export const momentDateFormat = (value:any, format:any) => {
  return moment(value).format(format);
};
  
export const formatDate = (input:any = {}) => {
  const { date = new Date(), fmt = 'YYYY-MM-DD HH:mm:ss' } = input;
  return isValidDate(date) ? moment.utc(date).format(fmt) : '';
};

export const subtractDates = (input:any) => {
  const { date = new Date(), count = 1, unit = 'month', fmt = 'YYYY-MM-DD HH:mm:ss' } = input;
  return moment.utc(date).subtract(count, unit).format(fmt);
};

const transformToOnlyDate = (val:any, onlyDate = false) => {
  if (onlyDate && !_.isEmpty(val) && Array.isArray(val)) {
	  return val.map((dateObj) => dateObj.format('YYYY-MM-DD'));
  }
  return val;
};

export const getCurrentWeek = (input: any) => {
  const { fmt, type, chart, onlyDate, dateAndTimeUTC = true } = input;
  let startOf:any = moment().startOf(type);
  let endOf:any = moment().endOf(type);
  let result;
  if (dateAndTimeUTC) {
	  startOf = moment().utc().startOf(type);
	  endOf = moment().utc().endOf(type);
  }
  if (chart) {
	  startOf = startOf.format(fmt);
	  endOf = endOf.format(fmt);
	  result = [startOf, endOf];
  } else {
	  result = fmt ? `${startOf.format(fmt)} - ${endOf.format(fmt)}` : transformToOnlyDate([startOf, endOf], onlyDate);
  }
  return result;
};

export const getPreviousWeek = (input: any) => {
  const {
	  unit, fmt, type, count = 1, chart, onlyDate, dateAndTimeUTC,
  } = input;
  let startOf:any = moment().subtract(count, unit).startOf(type);
  let endOf:any = moment().subtract(count, unit).endOf(type);
  let result;
  if (dateAndTimeUTC) {
	  startOf = moment().utc().subtract(count, unit).startOf(type);
	  endOf = moment().utc().subtract(count, unit).endOf(type);
  }
  if (chart) {
	  startOf = startOf.format(fmt);
	  endOf = endOf.format(fmt);
	  result = [startOf, endOf];
  } else {
	  result = fmt ? `${startOf.format(fmt)} - ${endOf.format(fmt)}` : transformToOnlyDate([startOf, endOf], onlyDate);
  }
  return result;
};
  