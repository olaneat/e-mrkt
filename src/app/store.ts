import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineReducers, combineSlices, configureStore,  } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import productDetailReducer  from "./slices/product-detail.slice"
import  CartReducer  from "./slices/cart.slice"
import ProductReducer from "./slices/product-list.slice"
import storage from 'redux-persist/lib/storage'
import  CategoryReducer  from "./slices/categories.slice"
import  LoginReducer from "./slices/login.slice"
import AddressReducer from './slices/address.slice'
import UpdateAddressReducer from './slices/update-address.slice'
import { saveState, loadState } from "./constant/persist-data"
import { persistReducer} from 'redux-persist'; 
// import ProfileReducer from './slices/profile.slice'

  const persistState = loadState();
  const persistConfig = {
    key:'root',
    storage,
    debug: true,
    version:1
  }
  const reducers = combineReducers({
    product: productDetailReducer,
    cart:CartReducer,
    products:ProductReducer,
    category: CategoryReducer,
    login: LoginReducer,
    address:AddressReducer,
    updateAddress: UpdateAddressReducer
  })

  const persistedReducer:any = persistReducer(persistConfig, reducers)
// Infer the `RootState` type from the root reducer
// export type RootState = ReturnType<typeof rootReducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
// export const makeStore = (preloadedState?: Partial<RootState>) => {
//   const store = configureStore({
//     reducer: reducers,
//     // Adding the api middleware enables caching, invalidation, polling,
//     // and other useful features of `rtk-query`.
//     // middleware: getDefaultMiddleware => {
//     //   return getDefaultMiddleware().concat(quotesApiSlice.middleware)
//     // },
//     preloadedState,
//   })
//   // configure listeners using the provided defaults
//   // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
//   setupListeners(store.dispatch)
//   return store
// }

export const store = configureStore({
  // reducer:persistedReducer,
  reducer:reducers,
  preloadedState:persistState,
  // devTools: true,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   })
    
})
const throttle = <T extends(...args:any[])=>void>(func: T, limit:number)=>{
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRun:number;
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
}


store.subscribe(
  throttle(() => {
    saveState({
      cart: store.getState().cart,
    });
  }, 1000) // Save at most once per second
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// setupListeners(store.dispatch)
// export default store


// setupListeners(store.dispatch)
// export default store
// // Infer the type of `store`
// export type AppStore = typeof store
// // Infer the `AppDispatch` type from the store itself
// export type AppDispatch = AppStore["dispatch"]
// export type AppThunk<ThunkReturnType = void> = ThunkAction<
//   ThunkReturnType,
//   RootState,
//   unknown,
//   Action
// >
