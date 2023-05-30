import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import ownerSlice from './ownerSlice';

const persistConfig = {
  key: 'root',
  storage,
};
const persistConfigOwner = {
  key: 'owner',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedOwnerReducer = persistReducer(persistConfigOwner, ownerSlice);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    owner:persistedOwnerReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
