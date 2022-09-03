import axios from 'axios';
import {store} from '../store';
import {CONSTANTS} from '../../constants';

const getAllCategories = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_URL + CONSTANTS.API_URLS.GET_CATEGORIES, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const getAllBrands = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_URL + CONSTANTS.API_URLS.GET_BRANDS, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const getContent = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_URL + CONSTANTS.API_URLS.GET_CONTENT, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const getAllOrders = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_URL + CONSTANTS.API_URLS.GET_ORDERS, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
      params: {
        vendorId: store?.getState()?.profile?.profile?._id,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const contentService = {
  getAllCategories,
  getAllBrands,
  getContent,
  getAllOrders,
};

export default contentService;
