import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice"
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authSlice);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  job: jobSlice,
  company: companySlice,
  applications: applicationSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;