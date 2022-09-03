import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import productService from '../services/product.service';
import {CONSTANTS} from '../../constants';
import {getProfile} from './profile';
import utils from '../../utils';

const initialState = {
  profile: null,
};

export const uploadProduct = createAsyncThunk(
  CONSTANTS.API_URLS.UPLOAD_PRODUCT,
  async (data, thunk) => {
    try {
      const response = await productService.uploadProduct(data);
      thunk.dispatch(getProfile(''));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const updateProduct = createAsyncThunk(
  CONSTANTS.API_URLS.UPDATE_PRODUCT,
  async (data, thunk) => {
    try {
      const response = await productService.updateProduct(data);
      thunk.dispatch(getProfile(''));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;
export default productSlice.reducer;
