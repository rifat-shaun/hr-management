import { Box, Container, Paper, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      {/* Theme Toggle */}
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <ThemeToggle />
      </Box>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
          }}
        >
          {/* Logo or Company Name */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 1, color: (theme) => theme.palette.primary.main }}
          >
            HR Management
          </Typography>

          {/* Auth Card */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '100%',
              mt: 3,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            {title && (
              <Typography component="h2" variant="h5" sx={{ mb: 1 }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mb: 3 }}
              >
                {subtitle}
              </Typography>
            )}

            {children}
          </Paper>

          {/* Footer */}
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 4 }}
          >
            © {new Date().getFullYear()} HR Management. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}; 