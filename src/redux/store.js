
import { configureStore } from '@reduxjs/toolkit';

// slices or reducers
import greeting from './slices/greeting';
import user from './slices/user';
import search from './slices/search';

export const store = configureStore({
    reducer: {
        greeting: greeting,
        user: user,
        search: search,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});