import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@fontsource/ubuntu/400.css';
import '@fontsource/roboto/700.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from 'lib/app/store';
import theme from 'theme';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</ReduxProvider>
	</React.StrictMode>
);
