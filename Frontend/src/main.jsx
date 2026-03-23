import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { router } from './router/router';
import './assets/style/main.scss';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
