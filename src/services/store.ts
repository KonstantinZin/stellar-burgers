import { configureStore, combineSlices } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import userOrdersReducer from './slices/userOrdersSlice';

const rootReducer = combineSlices({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer,
  userOrders: userOrdersReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
