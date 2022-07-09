import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { RootState } from 'lib/app/store';
import { useGetTrendingQuery } from 'lib/app/services/repo';
import RepoList from 'lib/app/features/repo/RepoList';
import RepoInfo from 'lib/app/features/repo/RepoInfo';

const Index = () => {
	const { selected_lang, selected_repo } = useSelector(
		(state: RootState) => state.repo
	);
	const { data, isLoading } = useGetTrendingQuery(selected_lang);

	if (isLoading) {
		return <Box p={4}>Loading...</Box>;
	}

	return (
		<Flex gap={4}>
			<Box w='lg' h='100vh' overflow={'auto'} p={4}>
				<RepoList repos={data?.items || []} />
			</Box>
			<Box w='full' h='100vh' overflow={'auto'} p={4}>
				{selected_repo && <RepoInfo repo={selected_repo} />}
			</Box>
		</Flex>
	);
};

export default Index;
