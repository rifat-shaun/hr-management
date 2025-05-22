import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import theme from './Theme';
import queryClient from './store/queryClient';
import store from './store';
import { publicRoutes, protectedRoutes } from './routes/routeConfig';

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={createBrowserRouter([...publicRoutes, ...protectedRoutes])} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
