import {persistStore, persistReducer} from 'redux-persist';
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import loaderReducer from './slices/loader';
import authReducer from './slices/auth';
import profileReducer from './slices/profile';
import contentReducer from './slices/content';
import productReducer from './slices/product';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const appReducer = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  profile: profileReducer,
  content: contentReducer,
  product: productReducer,
});

const rootReducer = (state, action) => {
  // console.log('action: ', action);
  if (action.type === 'auth/removeAccessToken') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const persistor = persistStore(store);
