import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';
import { useGetRepoReadmeQuery } from 'lib/app/services/repo';
import { GithubRepository } from 'lib/types';

type Props = {
	repo: GithubRepository;
};
const RepoInfo: React.FC<Props> = ({ repo }) => {
	const { data, isLoading } = useGetRepoReadmeQuery(
		{
			owner: repo.owner.login,
			name: repo.name,
			default_branch: repo.default_branch,
		},
		{ skip: !repo }
	);

	if (isLoading) {
		return (
			<Center>
				<Spinner />
			</Center>
		);
	}
	return <div></div>;
};

export default RepoInfo;
