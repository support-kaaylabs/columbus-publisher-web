import { notification } from 'antd';

export const defaultPagination = {
  current: 1,
  pageSize: 10,
  showSizeChanger: true,
  total: null,
};

export const errorNotification = (data: any) => {
  notification.error({
    message: 'Error',
    description: data,
    duration: 3,
  });
};

export const successNotification = (data: any) => {
  notification.success({
    message: 'Success',
    description: data,
    duration: 5,
  });
};

export const weekDays = [
  { key: 0, value: 'Monday' },
  { key: 1, value: 'Tuesday' },
  { key: 2, value: 'Wednesday' },
  { key: 3, value: 'Thursday' },
  { key: 4, value: 'Friday' },
  { key: 5, value: 'Saturday' },
  { key: 6, value: 'Sunday' },
];

export const dateArr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];

export const monthEndDate = {
  1: '31',
  2: '29',
  3: '31',
  4: '30',
  5: '31',
  6: '30',
  7: '31',
  8: '31',
  9: '30',
  10: '31',
  11: '30',
  12: '31',
};

export const monthsName = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};
