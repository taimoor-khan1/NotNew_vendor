import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const uploadProduct = data => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      CONSTANTS.API_URLS.BASE_URL + CONSTANTS.API_URLS.UPLOAD_PRODUCT,
      data,
      {
        headers: {
          Authorization: store?.getState()?.auth?.accessToken,
        },
      },
    )
    .then(onSuccess)
    .catch(onFailure);
};

const updateProduct = data => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      CONSTANTS.API_URLS.BASE_URL + CONSTANTS.API_URLS.UPDATE_PRODUCT,
      data,
      {
        headers: {
          Authorization: store?.getState()?.auth?.accessToken,
        },
      },
    )
    .then(onSuccess)
    .catch(onFailure);
};

const productService = {
  uploadProduct,
  updateProduct,
};

export default productService;
