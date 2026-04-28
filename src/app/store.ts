import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import productDetailReducer from "./slices/product-detail.slice";
import CartReducer from "./slices/cart.slice";
import ProductReducer from "./slices/product-list.slice";
import storage from "redux-persist/lib/storage";
import CategoryReducer from "./slices/categories.slice";
import LoginReducer from "./slices/login.slice";
import AddressReducer from "./slices/address.slice";
import UpdateAddressReducer from "./slices/update-address.slice";
import { saveState, loadState } from "./constant/persist-data";
import { persistReducer } from "redux-persist";
import OrderReducer from "./slices/order-slice";
import VerifyReducer from "./slices/verify-slice";
import SignupReducer from "./slices/auth.slice";
import ProductByCategoryReducer from "./slices/category-product.slice";
import ChangePasswordReducer from "./slices/change-pswd.slice";
import ProfileReducer from "./slices/profile.slice";
import UpdateProfileReducer from "./slices/update-profile.slice";
import  RequestPasswordReducer  from "./slices/request-password.slice";
import ResetPasswordReducer from './slices/rest-pswd.slice'
import SearchReducer  from './slices/search.slice'
import OrderListReducer from "./slices/orders.slice";
import OrderStatusCount from './slices/status-count.slice';
import RecentOrdersSlice from "./slices/recent-order-list.slice";
import RevenueSlice from './slices/revenue.slice'
import CreateProductSlice from './slices/new-product.slice'
import  UpdateProductSlice  from "./slices/update-product.slice";
const persistState = loadState();
const persistConfig = {
  key: "root",
  storage,
  debug: true,
  version: 1,
  whitelist: ["cart", "login"],
};

const reducers = combineReducers({
  product: productDetailReducer,
  cart: persistReducer(persistConfig, CartReducer),
  products: ProductReducer,
  category: CategoryReducer,
  user: persistReducer(persistConfig, LoginReducer),
  address: AddressReducer,
  updateAddress: UpdateAddressReducer,
  orders: OrderReducer,
  verifyPayment: VerifyReducer,
  signup: SignupReducer,
  productByCategory: ProductByCategoryReducer, 
  changePswd: ChangePasswordReducer,
  profile: ProfileReducer,
  updateProfile: UpdateProfileReducer,
  requestPassword:RequestPasswordReducer,
  resetPassword: ResetPasswordReducer,
  search :SearchReducer,
  OrderList: OrderListReducer,
  OrderStatusCount: OrderStatusCount,
  recentOrders: RecentOrdersSlice,
  revenueMetrics: RevenueSlice,
  newProduct: CreateProductSlice,
  updateProduct: UpdateProductSlice,

  // [productListData.reducerPath]: productListData.reducer,

});

// Define makeStore to create a new store instance
export const makeStore = (preloadedState = persistState) => {
  const store = configureStore({
    reducer: reducers,
    preloadedState,
   
  });

  // Setup listeners for RTK Query
  setupListeners(store.dispatch);
  return store;
};

// Create the main store instance
export const store = makeStore();

// Infer types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

// Throttle state persistence
const throttle = <T extends (...args: any[]) => void>(func: T, limit: number) => {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRun: number;
  return function (this: any, ...args: Parameters<T>) {
    if (!lastRun) {
      func.apply(this, args);
      lastRun = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRun >= limit) {
          func.apply(this, args);
          lastRun = Date.now();
        }
      }, limit - (Date.now() - lastRun));
    }
  };
};

store.subscribe(
  throttle(() => {
    saveState({
      cart: store.getState().cart,
      user: store.getState().user,
    });
  }, 1000)
);

