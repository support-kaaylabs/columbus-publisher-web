const { protocol, hostname } = window.location;

export const getAPIUrl = () => {
  const apiPath = '/api/v1/';
  
  return `${protocol}//${hostname}:5000${apiPath}`;
};
