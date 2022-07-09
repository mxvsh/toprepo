import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GithubRepository } from 'lib/types';

export interface RepoState {
	selected_lang: string;
	selected_repo: GithubRepository | null;
}

const initialState: RepoState = {
	selected_lang: 'javascript',
	selected_repo: null,
};

export const repoSlice = createSlice({
	name: 'repos',
	initialState,
	reducers: {
		setSelectedLang: (state, action: PayloadAction<string>) => {
			state.selected_lang = action.payload;
		},
		setSelectedRepo: (state, action: PayloadAction<GithubRepository>) => {
			state.selected_repo = action.payload;
		},
	},
});

export const { setSelectedLang, setSelectedRepo } = repoSlice.actions;
export default repoSlice.reducer;
