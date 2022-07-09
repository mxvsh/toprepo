import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';
import { useGetRepoReadmeQuery } from 'lib/app/services/repo';
import { GithubRepository } from 'lib/types';
import MarkdownPreview from '@uiw/react-markdown-preview';

type Props = {
	repo: GithubRepository;
};
const RepoInfo: React.FC<Props> = ({ repo }) => {
	const { data, isLoading, isFetching } = useGetRepoReadmeQuery(
		{
			owner: repo.owner.login,
			name: repo.name,
			default_branch: repo.default_branch,
		},
		{ skip: !repo }
	);

	const transformUri = (href: string, isRaw: boolean = false) => {
		// it's a hash link
		if (href.startsWith('#')) return href;

		// replace root href with an acutal link
		if (href.startsWith('/')) {
			href = `${repo.html_url}${href}`;
		}

		// if it's a raw or blob
		if (href.startsWith('./') || !href.startsWith('http')) {
			href = `${repo.html_url}/${isRaw ? 'raw' : 'blob'}/${
				repo.default_branch
			}/${href}`;
		}

		return href;
	};

	if (isLoading || isFetching) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}

	return (
		<div>
			<MarkdownPreview
				source={data}
				linkTarget='_blank'
				transformLinkUri={(href) => {
					return transformUri(href);
				}}
				transformImageUri={(href) => {
					return transformUri(href, true);
				}}
			/>
		</div>
	);
};

export default RepoInfo;
