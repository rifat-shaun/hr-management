
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';

import theme from './styles/theme';
import queryClient from './store/queryClient';
import store from './store';
import { publicRoutes } from './routes/routeConfig';
import { protectedRoutes } from './routes/routeConfig';

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CssBaseline />
          <RouterProvider router={createBrowserRouter([...publicRoutes, ...protectedRoutes])} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
