import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import getTheme from './Theme';
import queryClient from './store/queryClient';
import store from './store';
import { publicRoutes, protectedRoutes } from './routes/routeConfig';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

// Wrap the app content with the MUI theme
const ThemedApp = () => {
  const { isDarkMode } = useTheme();
  const theme = getTheme(isDarkMode ? 'dark' : 'light');

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider 
        router={createBrowserRouter([
          ...publicRoutes,
          ...protectedRoutes
        ])} 
      />

      <ToastContainer
        position="bottom-right"
        transition={Slide}
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
        toastStyle={{
          backgroundColor: isDarkMode ? '#1E1E1E' : undefined,
          color: isDarkMode ? '#FFFFFF' : undefined,
        }}
        style={{
          zIndex: 9999,
        }}
      />
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <ThemedApp />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
