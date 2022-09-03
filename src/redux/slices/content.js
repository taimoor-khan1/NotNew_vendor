import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import contentService from '../services/content.service';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

const initialState = {
  categories: [],
  brands: [],
  content: null,
  orders: [],
};

export const getAllCategories = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CATEGORIES,
  async ({}, thunk) => {
    try {
      const response = await contentService.getAllCategories();
      thunk.dispatch(contentSlice.actions.saveCategories(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const getAllBrands = createAsyncThunk(
  CONSTANTS.API_URLS.GET_BRANDS,
  async ({}, thunk) => {
    try {
      const response = await contentService.getAllBrands();
      thunk.dispatch(contentSlice.actions.saveBrands(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const getContent = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CONTENT,
  async ({}, thunk) => {
    try {
      const response = await contentService.getContent();
      thunk.dispatch(contentSlice.actions.saveContent(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

export const getAllOrders = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ORDERS,
  async ({}, thunk) => {
    try {
      const response = await contentService.getAllOrders();
      thunk.dispatch(contentSlice.actions.saveOrders(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    saveCategories: (state, action) => {
      state.categories = action.payload;
    },
    saveBrands: (state, action) => {
      state.brands = action.payload;
    },
    saveContent: (state, action) => {
      state.content = action.payload;
    },
    saveOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const {saveCategories, saveBrands, saveContent} = contentSlice.actions;
export default contentSlice.reducer;
