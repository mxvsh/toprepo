import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GithubRepository } from 'lib/types';

export const repoApi = createApi({
	reducerPath: 'repoApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
	endpoints: (builder) => ({
		getTrending: builder.query<
			{
				items: GithubRepository[];
			},
			string
		>({
			query: (lang) =>
				`/search/repositories?sort=stars&order=desc&q=language:${lang}`,
		}),
		getRepo: builder.mutation<
			GithubRepository,
			{
				owner: string;
				name: string;
			}
		>({
			query: ({ owner, name }) => `/repos/${owner}/${name}`,
		}),
		getRepoReadme: builder.query<
			string,
			{
				owner: string;
				name: string;
				default_branch: string;
			}
		>({
			query: ({ owner, name, default_branch }) => ({
				url: `https://raw.githubusercontent.com/${owner}/${name}/${default_branch}/README.md`,
				responseHandler: (response) => response.text(),
			}),
		}),
	}),
});

export const {
	useGetTrendingQuery,
	useGetRepoReadmeQuery,
	useGetRepoMutation,
} = repoApi;
