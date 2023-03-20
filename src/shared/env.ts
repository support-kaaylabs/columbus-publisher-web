const { protocol, hostname } = window.location;
let { port } = window.location ;

export const getAPIUrl = () => {
  const apiPath = '/api/v1/';
  if (hostname.includes('localhost')) {
    // port = 5000;
  }
  return `${protocol}//${hostname}:5000${apiPath}`;
};
