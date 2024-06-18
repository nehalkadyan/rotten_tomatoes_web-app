import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contentReducer from "./content/contentSlice";
import userReducer from "./user/userSlice";
import articleReducer from "./article/articleSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine multiple reducers into a single rootReducer
const rootReducer = combineReducers({
  content: contentReducer,
  user: userReducer,
  article: articleReducer,
});

// Configuration for persisting the redux store
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Create a persisted reducer with the root reducer and persist configuration
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore serializable check for redux-persist
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

// Create a persistor to persist the Redux store
export const persistor = persistStore(store);
