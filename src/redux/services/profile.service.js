import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const getProfile = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_VENDOR + CONSTANTS.API_URLS.GET_PROFILE, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const updateProfile = data => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      CONSTANTS.API_URLS.BASE_VENDOR + CONSTANTS.API_URLS.UPDATE_PROFILE,
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

const profileService = {
  getProfile,
  updateProfile,
};

export default profileService;
