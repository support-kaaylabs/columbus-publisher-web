import Http from './api';
import { getAPIUrl } from './env';
import { postMethodDataType } from '../shared/type';

const http = new Http(getAPIUrl());

export const getJbReports = () => http.get('/get-jb-reports-list');

export const imageUpload = (userId: number, object: any, file: any) =>
  http.handleMultipart(`userImage/${userId}`, object, file, 'PUT');

export const getUserProfile = () => http.get('user-profile');

export const searchModules = (id: string) => http.get(`search-modules?reportId=${id}`);

export const executeProgram = (data: any) => http.post('program-execution', data);

export const getAllReports = () => http.get('/reports');

export const getTenant = () => http.get('/tenant');

export const getDashboardData = (data: any) => http.post('get-dashboard-data', data);

export const getChartData = (data: any) => http.post('get-chart-data', data);

export const updateUserInfo = (userId: number, data: any) => http.put(`Users/${userId}`, data);

export const authenticate = (data: any) => http.post('authenticate-seller', data);

export const getImageLocate = () => http.get('user-profile');

export const getProduct = (data: any) => http.post('get-seller-products', data);

export const getProductDetail = (data: any) => http.post('get-seller-product-detail', data);

export const getAllCountries = () => http.get('get-all-country');

export const getAllStatesByCountryId = (data: any) => http.post('get-all-states', data);

export const getAllCitiesByStateId = (data: any) => http.post('get-all-cities', data);

export const email_phone_verify = (data: any) => http.get('verification', data);

export const sellerRegister = (data: any, file: any) => http.handleMultipart('seller-register', data, file,'POST');

export const forgotPassword = (data: any) => http.post('forgot-passwordd', data);

export const resetPassword = (data: any) => http.post('reset-password', data);

export const resetPasswordLinkVerification = (data: any) => http.post('resetpassword-linkverify', data);

export const getPublisherChartData = () => http.get('get-publisher-chart-data');

export const getPublisherChartYearlyData = () => http.get('get-publisher-chart-yearly-data');

export const getPublisherChartYearlyPrevData = (data: postMethodDataType) => http.post('get-publisher-chart-yearly-data-prev', data);

export const getPublisherChartMonthlyData = () => http.get('get-publisher-chart-monthly-data');

export const getPublisherChartMonthlyPrevData = (data: postMethodDataType) => http.post('get-publisher-chart-monthly-data-prev', data); 

export const getPublisherChartWeeklyData = () => http.get('get-publisher-chart-weekly-data');

export const getPublisherChartWeeklyPrevData = (data: postMethodDataType) => http.post('get-publisher-chart-weekly-data-prev', data);

export const getPublisherChartWeeklyNextData = (data: postMethodDataType) => http.post('get-publisher-chart-weekly-data-next', data);

export const getSellerDetails = () => http.get('get-seller-details');

export const updateSellerDetails = (userId: any, data: any) =>http.put(`update-seller-info/${userId}`, data);

export const storeImageUpload = (userId: number, object: any, file: any) =>
  http.handleMultipart(`Store-image-upload/${userId}`, object, file, 'PUT');

export const email_verification = ( data: any) => http.post('email-verification', data);

export const phone_verification = ( data: any) => http.post('phone-verification', data);

