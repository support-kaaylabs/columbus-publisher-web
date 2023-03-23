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

export const authenticate = (data: any) => http.get('/login/authenticateSeller', data);


// export const getOneReports = (parameters:any) =>  getAPI(`${baseUrl}/reports/report-details`, parameters);