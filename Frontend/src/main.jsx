import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { router } from './router/router';
import './assets/style/main.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store/store';
import { Provider } from 'react-redux';
import { AuthProvider } from './components/authProvider/authProvider';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    </Provider>,
);
