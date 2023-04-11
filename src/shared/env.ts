const { protocol, hostname } = window.location;

export const getAPIUrl = () => {
  const apiPath = '/api/v1/';
  let port;
  if(hostname.includes('localhost')){
    port =5000;
  }
  return `${protocol}//${hostname}:${port}${apiPath}`;
};