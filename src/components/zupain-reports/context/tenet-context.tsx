import React, { useState, createContext, useEffect } from 'react';
import _, { isEmpty } from 'lodash';
import { notification } from 'antd';
import { getTenant } from '../../../shared/urlHelper';
import { getApiUrl } from '../../../shared/api';

export const TenantContext = createContext({});

export const TenantProvider = (properties:any) => {
  const [tenantDetails, setTenantDetails] = useState({});
  const [defaultImageData, setDefaultImageData] = useState({});
  const [tenantConfig, setTenantConfig] = useState({});

  const fetchData = async () => {
    const configDetails = await getApiUrl();
    if (isEmpty(configDetails))
      notification.error({
        message: 'Internal Server Error. Please Contact Support Team.',
      });
    setTenantConfig(configDetails);
    await getTenant()
      .then((response) => {
        const data = _.get(response, 'data', {});
        setTenantDetails(data);
        const imageData = _.get(response, 'defaultImageData', {});
        setDefaultImageData(imageData);
      })
      .catch(() => {
        notification.error({ message: 'Failed to get tenant details.' });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TenantContext.Provider
      value={[tenantDetails, defaultImageData, setTenantDetails, tenantConfig]}
    >
      {properties.children}
    </TenantContext.Provider>
  );
};
