import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const login = (email, password) => {
  const data = {email, password};

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_VENDOR + CONSTANTS.API_URLS.LOGIN, data)
    .then(onSuccess)
    .catch(onFailure);
};

const signup = data => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE_VENDOR + CONSTANTS.API_URLS.SIGN_UP, data)
    .then(onSuccess)
    .catch(onFailure);
};

const verifyOtp = (email, otp) => {
  const data = {email, otp};

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      `${CONSTANTS.API_URLS.BASE_VENDOR}${CONSTANTS.API_URLS.VERIFY_OTP}`,
      data,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const forgotPassword = email => {
  const data = {email};

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      `${CONSTANTS.API_URLS.BASE_VENDOR}${CONSTANTS.API_URLS.FORGOT_PASSWORD}`,
      data,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const resetPassword = data => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      CONSTANTS.API_URLS.BASE_VENDOR + CONSTANTS.API_URLS.RESET_PASSWORD,
      data,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const logout = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_VENDOR + CONSTANTS.API_URLS.LOGOUT, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const deactivateAccount = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE_VENDOR + CONSTANTS.API_URLS.DELETE_ACCOUNT, {
      headers: {
        Authorization: store?.getState()?.auth?.accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const authService = {
  login,
  signup,
  logout,
  deactivateAccount,
  verifyOtp,
  forgotPassword,
  resetPassword,
};

export default authService;
