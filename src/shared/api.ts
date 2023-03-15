import axios from 'axios';

const apiPath = '/api';

export const getApiUrl : any =()=>{
  const {protocol, hostname} = window.location;
  let {port} : any = window.location;
  let apiUrl:string;
  if(hostname.includes('localhost')) {
    port=5000;
    apiUrl = `${protocol}//${hostname}:${apiPath}/v1`;
  } else {
    apiUrl = `${protocol}//${hostname}:${apiPath}/v1`;
  }
};

const URL = 'http://localhost:5000/api/v1';

//const URL = getApiUrl();

export const getAPI = async (pathName: string) => {
  const response = await axios.get(`${URL}${pathName}`, {
    headers: {
      'Content-Type': 'application/json',	
    },
  });
  return response;
};

export const postAPI = async (pathName: string, data: any) => {
  const response = await axios.post(`${URL}${pathName}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const updateAPI = async (pathName: string, data: any) => {
  const response = await axios.put(`${URL}${pathName}`, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response;
};

export const deleteAPI = async (pathName: string, data: any) => {
  const response = await axios.delete(`${URL}${pathName}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  });
  return response;
};
