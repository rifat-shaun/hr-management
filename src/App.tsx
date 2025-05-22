import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import theme from './styles/theme';
import queryClient from './store/queryClient';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Container>
              <Routes>
                <Route path="/" element={<h1>Welcome to HR App</h1>} />
              </Routes>
            </Container>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
