import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showSimpleMessage} from '../../utils/flashMessage';
import authService from '../services/auth.service';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

const initialState = {
  accessToken: null,
};

export const login = createAsyncThunk(
  CONSTANTS.API_URLS.LOGIN,
  async ({email, password}, thunk) => {
    try {
      const response = await authService.login(email, password);
      thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const signup = createAsyncThunk(
  CONSTANTS.API_URLS.SIGN_UP,
  async (data, thunk) => {
    try {
      const response = await authService.signup(data);
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const verifyOtp = createAsyncThunk(
  CONSTANTS.API_URLS.VERIFY_OTP,
  async ({email, otp}, thunk) => {
    try {
      const response = await authService.verifyOtp(email, otp);
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const forgotPassword = createAsyncThunk(
  CONSTANTS.API_URLS.FORGOT_PASSWORD,
  async ({email}, thunk) => {
    try {
      const response = await authService.forgotPassword(email);
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const resetPassword = createAsyncThunk(
  CONSTANTS.API_URLS.RESET_PASSWORD,
  async (data, thunk) => {
    try {
      const response = await authService.resetPassword(data);
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const logout = createAsyncThunk(
  CONSTANTS.API_URLS.LOGOUT,
  async ({}, thunk) => {
    try {
      // removeFcmTokenFromFirebase();
      const response = await authService.logout();
      showSimpleMessage('success', {
        message: response.message,
      });
      thunk.dispatch(authSlice.actions.removeAccessToken());
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const deleteAccount = createAsyncThunk(
  CONSTANTS.API_URLS.DEACTIVATE,
  async ({}, thunk) => {
    try {
      //   removeFcmTokenFromFirebase();
      const response = await authService.deactivateAccount();
      showSimpleMessage('success', {
        message: 'Your account has been deactivated successfully.',
      });
      thunk.dispatch(authSlice.actions.removeAccessToken());
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

const saveAccessTokenToStorage = accessToken => {
  AsyncStorage.setItem(
    CONSTANTS.CACHE_KEYS.ACCESS_TOKEN,
    JSON.stringify(accessToken),
  );
};

const removeAccessTokenFromStorage = () => {
  AsyncStorage.removeItem(CONSTANTS.CACHE_KEYS.ACCESS_TOKEN);
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      let accessToken = action.payload;
      state.accessToken = accessToken;
      // saveAccessTokenToStorage(accessToken);
    },
    removeAccessToken: (state, action) => {
      state.accessToken = null;
      // removeAccessTokenFromStorage();
    },
  },
});

export const {saveAccessToken, removeAccessToken} = authSlice.actions;
export default authSlice.reducer;
