import { configureStore } from '@reduxjs/toolkit';

// slices
import repoReducer from './features/repo/repoSlice';

// services
import { repoApi } from './services/repo';

export const store = configureStore({
	reducer: {
		repo: repoReducer,
		[repoApi.reducerPath]: repoApi.reducer,
	},
	middleware: (defMid) => defMid().concat(...[repoApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
