import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import ownerSlice from './ownerSlice';
import adminSlice from './adminSlice';

const persistConfig = {
  key: 'root',
  storage,
};
const persistConfigOwner = {
  key: 'owner',
  storage,
};
const persistConfigAdmin = {
  key: 'admin',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedOwnerReducer = persistReducer(persistConfigOwner, ownerSlice);
const persistedAdminReducer = persistReducer(persistConfigAdmin, adminSlice);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    owner:persistedOwnerReducer,
    admin:persistedAdminReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
