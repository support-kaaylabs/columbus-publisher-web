import { appRegistry } from './registry';
import _ from 'lodash';
const fetchHandler = async (res) => {
  const history = appRegistry.getObject('history');
  const content = res.headers.get('content-disposition');
  if (content) return res;
  if (res.ok) {
    return res.json();
  }
  if (res.status === 401) {
    let data;
    try {
      data = await res.json();
    } catch {
      data = res;
    }
    if (data.error === 'Permission Denied') {
      sessionStorage.removeItem('href');
      sessionStorage.removeItem('referrer');
      return history.push('/unauthorized');
    }
  }
  return Promise.reject(res);
};

const checkSuccess = (res) => {
  const content = res.headers && res.headers.get('content-disposition');
  if (content) return res;
  if (res.success) {
    return res;
  }
  return Promise.reject(res);
};

const fetchErrorHandler = (res) => {
  return Promise.reject(res);
};

const getToken = () => window.localStorage.getItem('token');
const createHeaders = (url, isMultipart = false) => {
  const token = getToken();
  const headers = new Headers();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  headers.set('Pragma', 'no-cache');
  headers.set('Cache-Control', 'no-cache');
  headers.set('Accept', 'application/json');
  headers.set('isuseralias', 'false');
  headers.set('version', '2.2.93');
  if (isMultipart) {
    /* empty */
  } else {
    headers.set('Content-Type', 'application/json');
  }
  return new Headers(headers);
};

class Http {
  constructor(baseUrl) {
    this.defaultOptions = {
      headers: null,
      mode: 'cors',
      cache: 'default',
    };
    this.baseUrl = baseUrl || '';
  }

  createQueryString = (obj) => {
    if (!obj) {
      return '';
    }
    const esc = encodeURIComponent;
    return Object.keys(obj)
      .map((k) => `${esc(k)}=${esc(obj[k])}`)
      .join('&');
  };

  createOptions(url, options, isMultipart = null) {
    const headers = createHeaders(url, isMultipart);
    const mergedOptions = Object.assign({}, this.defaultOptions, options);
    mergedOptions.headers = headers;
    return mergedOptions;
  }

  get(url, queryParams, options = {}) {
    const esc = encodeURIComponent;
    let qs;
    let newUrl;
    if (queryParams) {
      qs = Object.keys(queryParams)
        .map((k) => `${esc(k)}=${esc(queryParams[k])}`)
        .join('&');
      newUrl = `${this.baseUrl}${url}/?${qs}`;
    } else {
      newUrl = `${this.baseUrl}${url}`;
    }
    const getOptions = { method: 'GET' };
    options = Object.assign({}, options, getOptions);
    const optionsWithHeaders = this.createOptions(url, options);
    return fetch(newUrl, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .catch((e) => fetchErrorHandler(e));
  }

  post(url, body, options = {}) {
    const postOptions = { method: 'POST', body: JSON.stringify(body) };
    options = Object.assign({}, options, postOptions);
    const optionsWithHeaders = this.createOptions(url, options);
    return fetch(`${this.baseUrl}${url}`, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .catch((e) => fetchErrorHandler(e));
  }

  patch(url, body, options = {}) {
    const patchOptions = { method: 'PATCH', body: JSON.stringify(body) };
    options = Object.assign({}, options, patchOptions);
    const optionsWithHeaders = this.createOptions(url, options);
    return fetch(`${this.baseUrl}${url}`, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .catch((e) => fetchErrorHandler(e));
  }

  put(url, body, options = {}) {
    const putOptions = { method: 'PUT', body: JSON.stringify(body) };
    options = Object.assign({}, options, putOptions);
    const optionsWithHeaders = this.createOptions(url, options);
    return fetch(`${this.baseUrl}${url}`, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .catch((e) => fetchErrorHandler(e));
  }

  del(url, options = {}) {
    const deleteOptions = { method: 'DELETE', body: JSON.stringify(options) };
    options = Object.assign({}, options, deleteOptions);
    const optionsWithHeaders = this.createOptions(url, options);
    return fetch(`${this.baseUrl}${url}`, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .catch((e) => fetchErrorHandler(e));
  }

  handleMultipart(url, obj, file, method, options = {}) {
    const formData = new FormData();
    if (obj) Object.keys(obj).forEach((key) => formData.append(key, obj[key]));
    file.map((obj) => {
      formData.append('file', obj || '');
      if (!_.get(options, 'removeProductID', false)) {
        let productId = obj && obj.name.substring(0, obj.name.indexOf('-'));
        formData.append('Product_ID', productId);
      }
      return obj;
    });
    const postOptions = { method, body: formData };
    options = Object.assign({}, options, postOptions);
    const optionsWithHeaders = this.createOptions(url, options, true);
    return fetch(`${this.baseUrl}${url}`, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .catch((e) => fetchErrorHandler(e));
  }

  download(method, url, body = null, options = {}) {
    let downloadUrl = `${this.baseUrl}${url}`;
    let baseOptions;
    if (['POST', 'PUT', 'PATCH'].indexOf(method) >= 0) {
      baseOptions = { method, body: JSON.stringify(body) };
    } else {
      baseOptions = { method };
      if (body) {
        const qs = this.createQueryString(body);
        downloadUrl = `${downloadUrl}/?${qs}`;
      }
    }
    options = Object.assign({}, options, baseOptions);
    let fileName;
    const optionsWithHeaders = this.createOptions(url, options);
    return fetch(downloadUrl, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .then((data) => {
        const contentHeader = data.headers.get('content-disposition');
        if (!contentHeader)
          throw new Error('Could not parse content header from download.');
        fileName = decodeURIComponent(
          contentHeader.match(/filename="(.+)"/)[1]
        );
        return data.blob();
      })
      .then((blob) => {
        const objectUrl = window.URL.createObjectURL(blob);
        const aTag = document.createElement('a');
        aTag.href = objectUrl;
        aTag.download = fileName;
        aTag.click();
        aTag.remove();
      })
      .catch((e) => fetchErrorHandler(e));
  }

  handleMultipartWithDownload(url, obj, file, method, options = {}) {
    const formData = new FormData();
    if (obj) Object.keys(obj).forEach((key) => formData.append(key, obj[key]));
    file.map((obj) => {
      formData.append('file', obj || '');
      if (!_.get(options, 'removeProductID', false)) {
        let productId = obj && obj.name.substring(0, obj.name.indexOf('-'));
        formData.append('Product_ID', productId);
      }
      return obj;
    });
    let fileName;
    const postOptions = { method, body: formData };
    options = Object.assign({}, options, postOptions);
    const optionsWithHeaders = this.createOptions(url, options, true);
    return fetch(`${this.baseUrl}${url}`, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .then((data) => {
        if (data.disableDownload) return data;
        const contentHeader = data.headers.get('content-disposition');
        if (!contentHeader)
          throw new Error('Could not parse content header from download.');
        fileName = decodeURIComponent(
          contentHeader.match(/filename="(.+)"/)[1]
        );
        return data.blob();
      })
      .then((data) => {
        if (data.disableDownload) return data;
        const objectUrl = window.URL.createObjectURL(data);
        const aTag = document.createElement('a');
        aTag.href = objectUrl;
        aTag.download = fileName;
        aTag.click();
        aTag.remove();
      })
      .catch((e) => fetchErrorHandler(e));
  }
}

export default Http;
