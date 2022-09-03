import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import profileService from '../services/profile.service';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

const initialState = {
  profile: null,
};

export const getProfile = createAsyncThunk(
  CONSTANTS.API_URLS.GET_PROFILE,
  async ({}, thunk) => {
    try {
      const response = await profileService.getProfile();
      thunk.dispatch(profileSlice.actions.saveProfile(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const updateProfile = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_PROFILE,
  async (data, thunk) => {
    try {
      const response = await profileService.updateProfile(data);
      thunk.dispatch(getProfile(''));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      let profile = action.payload;
      state.profile = profile;
    },
  },
});

export const {saveProfile} = profileSlice.actions;
export default profileSlice.reducer;
