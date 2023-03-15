//import axios from 'axios';
import { getAPI , postAPI} from './api';



export const getJbReports = () => getAPI('/get-jb-reports-list');

export const getUserProfile = () => getAPI('user-profile');

export const searchModules = (id:string) => getAPI(`search-modules?reportId=${id}`);

export const executeProgram = (data:any) => postAPI('program-execution', data);

export const getAllReports = () => getAPI('/reports');

export const getTenant = () => getAPI('/tenant');

export const getOneReports = (parameters:any) =>  getAPI(`${baseUrl}/reports/report-details`, parameters);