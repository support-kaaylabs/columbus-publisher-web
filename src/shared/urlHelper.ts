import Http from './api';
import { getAPIUrl } from './env';

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

export const getAllStatesByCountryId = (data: any) => http.post('get-all-states',data);

export const getAllCitiesByStateId = (data: any) => http.post('get-all-cities',data);

export const email_phone_verify = (data: any) => http.get('verification', data);

export const sellerRegister = (data: any, file: any) => http.handleMultipart('seller-register', data, file,'POST');

export const forgotPassword = (data: any) => http.post('forgot-passwordd', data);

export const resetPassword = (data: any) => http.post('reset-password', data);

export const resetPasswordLinkVerification = (data: any) => http.post('resetpassword-linkVerify', data);
