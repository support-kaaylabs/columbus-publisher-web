//import axios from 'axios';
import Http from './api';
import { getAPIUrl } from './env';

const http = new Http(getAPIUrl());

export const getJbReports = () => http.get('/get-jb-reports-list');

export const getUserProfile = () => http.get('user-profile');

export const searchModules = (id: string) => http.get(`search-modules?reportId=${id}`);

export const executeProgram = (data: any) => http.post('program-execution', data);

export const getAllReports = () => http.get('/reports');

export const getTenant = () => http.get('/tenant');

export const getDashboardData = (data: any) => http.get('get-dashboard-data', data);

export const getChartData = (data: any) => http.get('get-chart-data', data);

export const updateUserInfo = (userId: number, data: any) => http.put(`Users/${userId}`, data);

export const authenticate = (data: any) => http.post('authenticate-seller', data);

export const getProductDetail = (data: any) => http.get('get-autobid-seller-data-detail', data);